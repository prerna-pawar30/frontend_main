// export default BlogDetail;
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Swal from 'sweetalert2';
import apiService from '../../api/ApiService';

/* ─────────────────────────────────────────────
   Helper: group flat content blocks into smart
   layout segments so images sit beside text
───────────────────────────────────────────── */
const groupBlocks = (blocks = []) => {
  const segments = [];
  let i = 0;
  while (i < blocks.length) {
    const cur = blocks[i];
    if (cur.type === 'heading') {
      segments.push({ layout: 'heading', blocks: [cur] });
      i++;
      continue;
    }
    if (cur.type === 'image') {
      const next = blocks[i + 1];
      if (next && (next.type === 'paragraph' || next.type === 'list')) {
        segments.push({ layout: 'image-text', blocks: [cur, next] });
        i += 2;
      } else {
        segments.push({ layout: 'image-full', blocks: [cur] });
        i++;
      }
      continue;
    }
    if (cur.type === 'paragraph') {
      const next = blocks[i + 1];
      if (next && next.type === 'image') {
        segments.push({ layout: 'text-image', blocks: [cur, next] });
        i += 2;
      } else {
        segments.push({ layout: 'paragraph', blocks: [cur] });
        i++;
      }
      continue;
    }
    if (cur.type === 'list') {
      segments.push({ layout: 'list', blocks: [cur] });
      i++;
      continue;
    }
    i++;
  }
  return segments;
};

/* ─────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────── */
const vFadeUp    = { hide: { opacity: 0, y: 22 },      show: { opacity: 1, y: 0,     transition: { duration: 0.55, ease: 'easeOut' } } };
const vFadeLeft  = { hide: { opacity: 0, x: -28 },     show: { opacity: 1, x: 0,     transition: { duration: 0.55, ease: 'easeOut' } } };
const vFadeRight = { hide: { opacity: 0, x: 28 },      show: { opacity: 1, x: 0,     transition: { duration: 0.55, ease: 'easeOut' } } };
const vScale     = { hide: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5,  ease: 'easeOut' } } };
const vItem      = (i) => ({ hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: 'easeOut' } } });

/* ─────────────────────────────────────────────
   Sub-renderers
───────────────────────────────────────────── */
const RHeading = ({ block }) => (
  <motion.h2
    key={block.blockId}
    initial="hide" whileInView="show" viewport={{ once: true, amount: 0.7 }}
    variants={vFadeLeft}
    className="mb-1 mt-6 text-lg font-extrabold leading-snug text-black first:mt-0"
  >
    {block.text}
  </motion.h2>
);

const RParagraph = ({ block, variants = vFadeUp }) => (
  <motion.p
    key={block.blockId}
    initial="hide" whileInView="show" viewport={{ once: true, amount: 0.5 }}
    variants={variants}
    className="text-sm leading-relaxed text-gray-500"
  >
    {block.text}
  </motion.p>
);

const RImage = ({ block, variants = vScale, className = '' }) => (
  <motion.div
    key={block.blockId}
    initial="hide" whileInView="show" viewport={{ once: true, amount: 0.3 }}
    variants={variants}
    className={`overflow-hidden rounded-xl border-b-2 border-[#E68736] bg-[#fdf5ec] ${className}`}
  >
    <img
      src={block.image}
      alt={block.text || 'blog image'}
      className="h-full w-full object-contain p-2"
    />
    {block.text && (
      <p className="px-3 pb-2 text-center text-[10px] italic text-gray-400">{block.text}</p>
    )}
  </motion.div>
);

const RList = ({ block }) => {
  const items = block.listItems || [];
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial="hide" whileInView="show" viewport={{ once: true }}
          variants={vItem(idx)}
          className="flex gap-3 rounded-lg border border-orange-100 bg-white p-3"
        >
          <span className="mt-0.5 shrink-0 text-xs font-extrabold text-[#E68736]">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="text-xs leading-relaxed text-gray-600">{item}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Segment renderer
───────────────────────────────────────────── */
const RSegment = ({ seg }) => {
  const { layout, blocks } = seg;

  if (layout === 'heading')    return <RHeading block={blocks[0]} />;
  if (layout === 'paragraph')  return <RParagraph block={blocks[0]} />;
  if (layout === 'list')       return <RList block={blocks[0]} />;

  if (layout === 'image-full') {
    return <RImage block={blocks[0]} className="h-52 w-full" />;
  }

  if (layout === 'image-text') {
    const [imgBlock, textBlock] = blocks;
    return (
      <div className="grid grid-cols-2 gap-4 items-start">
        <RImage block={imgBlock} className="h-44" variants={vFadeLeft} />
        <div>
          {textBlock.type === 'paragraph'
            ? <RParagraph block={textBlock} variants={vFadeRight} />
            : <RList block={textBlock} />}
        </div>
      </div>
    );
  }

  if (layout === 'text-image') {
    const [textBlock, imgBlock] = blocks;
    return (
      <div className="grid grid-cols-2 gap-4 items-start">
        <RParagraph block={textBlock} variants={vFadeLeft} />
        <RImage block={imgBlock} className="h-44" variants={vFadeRight} />
      </div>
    );
  }

  return null;
};

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({ name: '', company: '', city: '', review: '' });
  const [submitting, setSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

useEffect(() => {
  let isMounted = true;
  
  const loadData = async () => {
    // Increment view in background (don't await it here)
    apiService.incrementBlogView(id).catch(e => console.error(e));

    try {
      const res = await apiService.getBlogDetails(id);
      if (isMounted) {
        setBlog(res.data?.data || null);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted) setLoading(false);
    }
  };

  loadData();
  return () => { isMounted = false; };
}, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.postBlogComment(id, comment);
      Swal.fire({ title: 'Thank You!', text: 'Review posted successfully.', icon: 'success', confirmButtonColor: '#E68736' });
      setComment({ name: '', company: '', city: '', review: '' });
      const res = await apiService.getBlogDetails(id);
      setBlog(res.data?.data);
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'Something went wrong.', icon: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

if (loading && !blog) {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
       {/* Use a simpler, lighter loader or a skeleton here */}
       <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
    </div>
  );
}

  if (!blog) return <div className="py-20 text-center text-gray-400">Article not found.</div>;

  const segments = groupBlocks(blog.content);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white py-20">
    <div className="mx-auto max-w-7xl">
      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-[#E68736]"
        style={{ scaleX }}
      />

      {/* ── BLACK HERO ── */}
      <motion.section
        initial="hide" animate="show" variants={vFadeUp}
        className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-12 px-8 py-10"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border-[22px] border-[#E68736] opacity-10" />
        <div className="pointer-events-none absolute bottom-[-20px] left-[42%] h-24 w-24 rounded-full bg-[#E68736] opacity-[0.08]" />

        <div className="mx-auto max-w-7xl">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="group mb-6 flex items-center gap-2 text-[#E68736] transition-colors hover:text-white"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform group-hover:-translate-x-1" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </button>

          <p className="mb-2 text-[28px] font-bold  text-[#E68736]">
            Knowledge Base · Article
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#E68736] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white">
              Dental Tech
            </span>
            {blog.featured && (
              <span className="rounded-full border border-white/20 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white">
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
            {/* Left */}
            <div className="flex-1">
              <h1 className="text-3xl font-black leading-tight text-white lg:text-4xl">{blog.title}</h1>
              <p className="mt-3 max-w-xl text-sm italic text-gray-400">{blog.shortDescription}</p>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                {[
                  {
                    val: blog.stats?.views >= 1000
                      ? `${(blog.stats.views / 1000).toFixed(1)}k`
                      : blog.stats?.views || 0,
                    lbl: 'Views',
                  },
                  { val: blog.readingTime, lbl: 'Min Read' },
                  {
                    val: new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    lbl: 'Published',
                  },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="h-7 w-px bg-gray-700" />}
                    <div className="text-center">
                      <p className="text-lg font-extrabold text-[#E68736]">{s.val}</p>
                      <p className="text-[9px] uppercase tracking-widest text-gray-500">{s.lbl}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <motion.div
                initial={{ width: 0 }} animate={{ width: '72px' }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="mt-5 h-[3px] bg-[#E68736]"
              />
            </div>

            {/* Right: banner */}
            <motion.div
              initial="hide" animate="show" variants={vFadeRight}
              className="w-full overflow-hidden rounded-2xl lg:max-w-sm"
            >
              <img src={blog.bannerImage} alt={blog.title} className="h-60 w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── CONTENT + SIDEBAR ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* ── Article content ── */}
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-5 bg-[#E68736]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68736]">
                Article Content
              </span>
            </div>

            {/* Smart compact content grid — gap-4 keeps blocks tight */}
            <div className="flex flex-col gap-4">
              {segments.map((seg, idx) => (
                <RSegment key={idx} seg={seg} />
              ))}
            </div>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2 border-t border-dashed border-orange-100 pt-5">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Sticky comment box ── */}
          <div className="lg:col-span-5">
            <motion.div
              initial="hide" whileInView="show" variants={vFadeRight}
              className="sticky top-20"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-7 shadow-2xl">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border-[14px] border-[#E68736] opacity-10" />

                <h3 className="mb-1 text-base font-extrabold text-white">Join the discussion</h3>
                <p className="mb-5 text-xs text-gray-500">Share your professional perspective.</p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text" placeholder="Name" required value={comment.name}
                      onChange={(e) => setComment({ ...comment, name: e.target.value })}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#E68736]"
                    />
                    <input
                      type="text" placeholder="City" value={comment.city}
                      onChange={(e) => setComment({ ...comment, city: e.target.value })}
                      className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#E68736]"
                    />
                  </div>
                  <input
                    type="text" placeholder="Company" value={comment.company}
                    onChange={(e) => setComment({ ...comment, company: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#E68736]"
                  />
                  <textarea
                    rows={4} placeholder="Your review..." required value={comment.review}
                    onChange={(e) => setComment({ ...comment, review: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#E68736]"
                  />
                  <motion.button
                    type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="w-full rounded-full bg-[#E68736] py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-600/20"
                  >
                    {submitting ? 'Submitting...' : 'Post Review →'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* ── COMMUNITY REVIEWS ── */}
      <div className="border-t border-orange-100 bg-[#FAFAFA] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-7 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <span className="h-[2px] w-5 bg-[#E68736]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68736]">Reviews</span>
              </div>
              <motion.h3
                initial="hide" whileInView="show" variants={vFadeLeft}
                className="text-xl font-extrabold text-black"
              >
                Community Feedback
              </motion.h3>
            </div>
            <p className="text-xs text-gray-400">
              {blog.stats?.commentsCount || 0} professionals shared their thoughts
            </p>
          </div>

          {blog.comments?.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {blog.comments.map((c, i) => (
                <motion.div
                  key={c.commentId || i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="flex flex-col justify-between rounded-2xl border border-orange-100 bg-white p-5"
                >
                  <div className="mb-2 text-xl font-black leading-none text-[#E68736]">"</div>
                  <p className="mb-4 text-xs italic leading-relaxed text-gray-500">{c.review}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fdf0e0] text-sm font-extrabold text-[#E68736]">
                      {c.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate text-xs font-bold text-black">{c.name}</p>
                      <p className="truncate text-[9px] uppercase tracking-wider text-gray-400">
                        {c.company} · {c.city}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-orange-100 p-12 text-center">
              <p className="text-sm font-medium text-gray-400">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default BlogDetail;