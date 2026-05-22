/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Swal from 'sweetalert2';
import apiService from '../../api/ApiService';

const fadeUp   = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const fadeLeft = { hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger  = { show: { transition: { staggerChildren: 0.08 } } };
const AVATAR_COLORS = ['#E68736', '#2563EB', '#059669', '#7C3AED', '#DC2626', '#D97706'];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@300;400;500;600;700&display=swap');
  :root {
    --accent: #E68736;
    --accent-hover: #D4751F;
    --accent-light: #FFF4EA;
    --accent-mid: #F5A55A;
    --bg: #FAFAF8;
    --white: #FFFFFF;
    --text: #0E0E0C;
    --text-2: #3A3A36;
    --text-3: #888880;
    --border: #E6E4DE;
    --border-soft: #F0EDE8;
  }
  body { background: var(--bg); margin: 0; }
  .f-display { font-family: 'Playfair Display', Georgia, serif; }
  .f-body { font-family: 'Outfit', system-ui, sans-serif; }
  .progress { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 3px; background: var(--accent); transform-origin: left; }
  
  /* Hero Sizing Overrides */
  .hero { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%); position: relative; overflow: hidden; }
  .hero-dots { position: absolute; top: -60px; right: -60px; width: 320px; height: 320px; border-radius: 50%; border: 48px solid rgba(255,255,255,0.05); pointer-events: none; }
  .hero-bar { position: absolute; bottom: -80px; right: 160px; width: 200px; height: 200px; border-radius: 50%; border: 36px solid rgba(255,255,255,0.04); pointer-events: none; }
  .hero::before { content: ''; position: absolute; bottom: -40px; left: -40px; width: 260px; height: 260px; border-radius: 50%; background: radial-gradient(circle, rgba(230,135,54,0.18) 0%, transparent 70%); pointer-events: none; }
  
  .back-btn { display: inline-flex; align-items: center; gap: 10px; background: none; border: none; cursor: pointer; padding: 0; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.65); transition: color 0.2s; }
  .back-btn:hover { color: #fff; }
  .back-btn:hover .back-icon { border-color: var(--accent); background: rgba(230,135,54,0.15); }
  .back-icon { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; transition: border-color 0.2s, background 0.2s; }
  
  .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 14px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(230,135,54,0.15); color: var(--accent); border: 1px solid rgba(230,135,54,0.3); }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
  .meta-divider { width: 1px; height: 18px; background: rgba(255,255,255,0.15); flex-shrink: 0; }
  .meta-chip { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,0.6); font-family: 'Outfit', sans-serif; }
  
  .feat-img { width: 100%; object-fit: cover; max-height: 480px; border-radius: 16px; display: block; box-shadow: 0 10px 40px rgba(0,0,0,0.06); }
  
  /* Prose Typography & Content Blocks */
  .prose { font-family: 'Outfit', sans-serif; font-size: 1.05rem; line-height: 1.8; color: var(--text-2); word-wrap: break-word; word-break: break-word; }
  .prose h1, .prose h2, .prose h3, .prose h4 { font-family: 'Playfair Display', serif; color: var(--text); font-weight: 700; margin-top: 1.8em; margin-bottom: 0.6em; line-height: 1.3; }
  .prose h1 { font-size: 1.85rem; }
  .prose h2 { font-size: 1.55rem; padding-bottom: 0.4rem; border-bottom: 2px solid var(--border-soft); }
  .prose h3 { font-size: 1.25rem; }
  .prose p { margin-bottom: 1.4em; text-align: justify; }
  .prose a { color: var(--accent); text-underline-offset: 3px; word-break: break-all; }
  .prose strong { color: var(--text); font-weight: 600; }
  .prose ul, .prose ol { padding-left: 1.3em; margin-bottom: 1.4em; }
  .prose li { margin-bottom: 0.5em; }
  .prose blockquote { border-left: 4px solid var(--accent); padding: 0.8rem 1.2rem; background: var(--accent-light); border-radius: 0 12px 12px 0; font-style: italic; color: #7A5030; margin: 1.6em 0; }
  .prose code { background: #FFF4EA; color: #C05E10; padding: 2px 6px; border-radius: 5px; font-size: 0.875em; word-break: break-all; }
  .prose pre { background: #1C1C1A; border-radius: 12px; padding: 1.2rem; overflow-x: auto; margin: 1.6em 0; }
  .prose pre code { background: none; color: #A8D8C0; padding: 0; font-size: 0.85rem; }
  .prose img { border-radius: 12px; width: 100%; max-width: 100%; height: auto; margin: 1.6em 0; box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
  
  /* Tables handling for global viewport rules */
  .table-container { width: 100%; overflow-x: auto; margin: 1.8em 0; border: 1px solid var(--border); border-radius: 12px; -webkit-overflow-scrolling: touch; }
  .prose table { width: 100%; border-collapse: collapse; margin: 0; border: none; min-width: 500px; }
  .prose th { background: var(--accent-light); color: var(--accent); text-align: left; padding: 0.75rem 1rem; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
  .prose td { border-top: 1px solid var(--border-soft); padding: 0.75rem 1rem; color: var(--text-2); font-size: 0.92rem; }
  .prose tr:hover td { background: #FDFBF8; }
  .prose hr { border: none; border-top: 1px solid var(--border); margin: 2.2em 0; }
  
  .tag { display: inline-flex; align-items: center; padding: 6px 14px; border-radius: 999px; background: var(--white); border: 1.5px solid var(--border); font-size: 13px; font-weight: 500; color: var(--text-3); transition: all 0.2s; cursor: pointer; font-family: 'Outfit', sans-serif; }
  .tag:hover { background: var(--accent-light); color: var(--accent); border-color: #E6873650; }
  
  .share-btn { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid var(--border); background: var(--white); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-3); transition: all 0.2s; }
  .share-btn:hover { border-color: var(--accent); background: var(--accent-light); color: var(--accent); }
  
  .comment-card { background: var(--white); border: 1px solid var(--border-soft); border-radius: 14px; padding: 16px sm:padding: 20px; transition: border-color 0.2s, box-shadow 0.2s; }
  .comment-card:hover { border-color: #E6873640; box-shadow: 0 4px 16px rgba(230,135,54,0.05); }
  
  .sidebar-card { background: var(--white); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
  .card-accent-bar { height: 3px; background: linear-gradient(to right, var(--accent), var(--accent-mid), #FDE68A); }
  
  .field { width: 100%; background: var(--bg); border: 1.5px solid var(--border); border-radius: 12px; padding: 12px 14px; color: var(--text); font-family: 'Outfit', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; }
  .field::placeholder { color: #C0BEB8; }
  .field:focus { border-color: var(--accent); box-shadow: 0 0 0 3px #E6873318; background: var(--white); }
  
  .submit-btn { width: 100%; border: none; border-radius: 12px; padding: 14px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; background: var(--accent); color: white; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 18px #E6873730; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
  .submit-btn:hover:not(:disabled) { background: var(--accent-hover); box-shadow: 0 6px 24px #E6873745; transform: translateY(-1px); }
  .submit-btn:active:not(:disabled) { transform: translateY(0); }
  .submit-btn:disabled { background: #D0CFCA; box-shadow: none; cursor: not-allowed; }
  
  .info-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-soft); }
  .info-row:last-child { border-bottom: none; padding-bottom: 0; }
  .info-icon { width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0; background: var(--accent-light); display: flex; align-items: center; justify-content: center; }
  .divider { display: flex; align-items: center; gap: 12px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  
  @keyframes spin { to { transform: rotate(360deg) } }
  .spinner { width: 17px; height: 17px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.35); border-top-color: white; animation: spin 0.7s linear infinite; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #D4D2CC; border-radius: 4px; }
`;

const MetaChip = ({ d, children }) => (
  <span className="meta-chip">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={d} /></svg>
    <span className="truncate">{children}</span>
  </span>
);

const SHARE_ICONS = [
  { label: 'Twitter',  d: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
  { label: 'LinkedIn', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
];

const LoadingScreen = () => (
  <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifycontent: 'center', padding: 20 }}>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes ping{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.5);opacity:0}}`}</style>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', width: 44, height: 44 }}>
        <div style={{ position: 'absolute', inset: 0, border_radius: '50%', border: '2px solid #E6873630', animation: 'ping 1.2s ease-out infinite' }} />
        <div style={{ position: 'absolute', inset: 6, border_radius: '50%', border: '2px solid transparent', borderTopColor: '#E68736', animation: 'spin 0.8s linear infinite' }} />
      </div>
      <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAAAAA', fontFamily: 'sans-serif', margin: 0, textAlign: 'center' }}>Loading article</p>
    </div>
  </div>
);

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({ name: '', company: '', city: '', review: '' });
  const [submitting, setSubmit] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        apiService.incrementBlogView(id).catch(() => {});
        const res = await apiService.getBlogDetails(id);
        if (alive) { setBlog(res.data?.data || null); setLoading(false); }
      } catch { if (alive) setLoading(false); }
    })();
    return () => { alive = false; };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmit(true);
    try {
      await apiService.postBlogComment(id, comment);
      Swal.fire({ title: 'Posted!', text: 'Your comment is live.', icon: 'success', confirmButtonColor: '#E68736' });
      setComment({ name: '', company: '', city: '', review: '' });
      const res = await apiService.getBlogDetails(id);
      setBlog(res.data?.data);
    } catch { Swal.fire({ title: 'Error', text: 'Failed to post comment.', icon: 'error' }); }
    finally { setSubmit(false); }
  };

  if (loading) return <LoadingScreen />;
  if (!blog) return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifycontent: 'center', padding: 24 }}>
      <p style={{ color: '#999', fontFamily: 'sans-serif' }}>Article not found.</p>
    </div>
  );

  const publishDate = new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const comments    = blog.comments || blog.reviews || [];

  const articleDetails = [
    { label: 'Published', value: publishDate,                  icon: 'M8 2v3M16 2v3M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
    { label: 'Category',  value: blog.category || 'General',   icon: 'M4 6h16M4 12h8m-8 6h16' },
    { label: 'Views',     value: `${blog.views || 0} readers`, icon: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
  ];

  return (
    <>
      <style>{CSS}</style>
      <motion.div className="progress f-body" style={{ scaleX }} />

      <div className="f-body w-full overflow-x-hidden bg-[var(--bg)] min-h-screen">

        {/* HERO */}
        <motion.section 
          className="hero mt-16 sm:mt-24 mx-3 sm:mx-6 max-w-7xl lg:mx-auto rounded-xl sm:rounded-2xl" 
          initial="hidden" 
          animate="show" 
          variants={stagger}
        >
          <div className="hero-dots hidden md:block" />
          <div className="hero-bar hidden md:block" />
          
          <div className="w-full px-4 py-8 sm:p-10 lg:p-14 max-w-5xl">
            <motion.div variants={fadeUp} className="mb-5 sm:mb-7">
              <button className="back-btn" onClick={() => window.history.back()}>
                <span className="back-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6"/></svg>
                </span>
                Back to Blogs
              </button>
            </motion.div>

            {blog.category && (
              <motion.div variants={fadeUp} className="mb-4">
                <span className="badge"><span className="badge-dot" />{blog.category}</span>
              </motion.div>
            )}

            <motion.h1 
              variants={fadeUp} 
              className="f-display text-white tracking-tight leading-[1.15] font-black mb-4 break-words"
              style={{ fontSize: 'clamp(1.65rem, 4.5vw, 3rem)', maxWidth: 880 }}
            >
              {blog.title}
            </motion.h1>

            {(blog.shortDescription || blog.description) && (
              <motion.p 
                variants={fadeUp} 
                className="text-slate-300 leading-relaxed font-medium mb-6 sm:mb-8 text-sm sm:text-base"
                style={{ maxWidth: 680 }}
              >
                {blog.shortDescription || blog.description}
              </motion.p>
            )}

            {/* Meta tags flex bar */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 sm:gap-4 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-orange-500/20 text-[#E68736] flex items-center justify-center font-bold text-sm border border-orange-500/30 flex-shrink-0">
                  {(blog.author || 'D').charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="margin-0 font-semibold text-[13px] text-white leading-tight truncate">{blog.author || 'Digident Team'}</p>
                  <p className="margin-0 text-[11px] text-slate-400 mt-0.5">{publishDate}</p>
                </div>
              </div>
              
              <span className="meta-divider" />
              <MetaChip d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z">{blog.views || 0} views</MetaChip>
              
              {comments.length > 0 && (
                <>
                  <span className="meta-divider" />
                  <MetaChip d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">{comments.length} comments</MetaChip>
                </>
              )}
              
              {blog.readTime && (
                <>
                  <span className="meta-divider" />
                  <MetaChip d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M12 6v6l4 2">{blog.readTime} min read</MetaChip>
                </>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Image Frame */}
        {(blog.bannerImage || blog.featuredImage) && (
          <motion.div 
            className="w-full px-3 sm:px-6 max-w-7xl mx-auto pt-6"
            initial={{ opacity: 0, y: 14 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={blog.bannerImage || blog.featuredImage} alt={blog.title} className="feat-img" />
          </motion.div>
        )}

        {/* MAIN BODY LAYOUT GRID */}
        <div className="w-full px-3 sm:px-6 max-w-7xl mx-auto py-8 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-14 items-start w-full">

            {/* Left Column: Article content block */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-20px' }} variants={stagger} className="min-w-0 w-full">
              <motion.div variants={fadeUp}>
                <div className="prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {blog.contentMarkdown || blog.content}
                  </ReactMarkdown>
                </div>
              </motion.div>

              {/* Tag System */}
              {blog.tags?.length > 0 && (
                <motion.div variants={fadeUp} className="mt-10 pt-6 border-t border-slate-200">
                  <p className="text-[11px] tracking-wider uppercase text-[var(--text-3)] mb-4 font-bold">Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                      <span key={i} className="tag text-xs sm:text-sm font-semibold px-3 py-1.5">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Share Bar */}
              <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
                <span className="text-[11px] tracking-wider uppercase text-[var(--text-3)] font-bold">Share</span>
                {SHARE_ICONS.map(s => (
                  <button key={s.label} className="share-btn" title={`Share on ${s.label}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={s.d} /></svg>
                  </button>
                ))}
              </motion.div>

              {/* Comments Stream Layout */}
              {comments.length > 0 && (
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mt-12 sm:mt-16">
                  <motion.div variants={fadeUp} className="divider mb-6">
                    <span className="text-xs font-semibold text-[var(--text-3)] whitespace-nowrap px-1">
                      {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                    </span>
                  </motion.div>
                  
                  <div className="flex flex-col gap-3.5">
                    {comments.map((c, i) => (
                      <motion.div key={i} variants={fadeUp} className="comment-card">
                        <div className="flex gap-3.5">
                          <div className="w-9 h-9 rounded-full flex-shrink-0 bg-slate-100 font-bold text-sm flex items-center justify-center text-white"
                               style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                            {(c.name || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
                              <span className="font-semibold text-[14px] text-[var(--text)] truncate max-w-[180px]">{c.name || 'Anonymous'}</span>
                              {c.company && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-light)] color-[var(--accent)] truncate max-w-[140px]">{c.company}</span>}
                              {c.city && <span className="text-xs text-[var(--text-3)] whitespace-nowrap">· {c.city}</span>}
                            </div>
                            <p className="text-[13.5px] leading-relaxed text-[var(--text-2)] margin-0 break-words">{c.review || c.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Right Column: Sticky Sidebar elements */}
            <motion.div 
              initial="hidden" 
              animate="show" 
              variants={fadeLeft} 
              className="w-full lg:sticky lg:top-24 mt-4 lg:mt-0"
            >
              <div className="flex flex-col gap-6 w-full">

                {/* Form component card */}
                <div className="sidebar-card w-full">
                  <div className="card-accent-bar" />
                  <div className="p-5 sm:p-7">
                    <h3 className="f-display text-xl sm:text-2xl font-bold text-[var(--text)] mb-1">Join the discussion</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-3)] mb-5">Share your thoughts on this article.</p>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 w-full">
                      <input type="text" placeholder="Full Name *" required className="field"
                        value={comment.name} onChange={e => setComment({ ...comment, name: e.target.value })} />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3.5">
                        <input type="text" placeholder="Company" className="field"
                          value={comment.company} onChange={e => setComment({ ...comment, company: e.target.value })} />
                        <input type="text" placeholder="City" className="field"
                          value={comment.city} onChange={e => setComment({ ...comment, city: e.target.value })} />
                      </div>
                      
                      <textarea rows={4} placeholder="Your thoughts… *" required className="field" style={{ resize: 'none' }}
                        value={comment.review} onChange={e => setComment({ ...comment, review: e.target.value })} />
                      
                      <button type="submit" disabled={submitting} className="submit-btn mt-1">
                        <AnimatePresence mode="wait">
                          {submitting ? (
                            <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                              <span className="spinner"/>Sending…
                            </motion.span>
                          ) : (
                            <motion.span key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                              Post Comment
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Technical Meta Details Card */}
                <div className="sidebar-card w-full">
                  <div className="p-5 sm:p-6">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-3)] mb-3">Article Details</p>
                    {articleDetails.map(item => (
                      <div key={item.label} className="info-row">
                        <div className="info-icon">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d={item.icon}/></svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="margin-0 text-[10px] text-[var(--text-3)] uppercase tracking-wider font-semibold">{item.label}</p>
                          <p className="margin-0 text-[13.5px] text-[var(--text)] font-semibold truncate mt-0.5">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;