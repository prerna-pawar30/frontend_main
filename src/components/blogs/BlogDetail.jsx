/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Swal from 'sweetalert2';
import apiService from '../../api/ApiService';

const fadeUp   = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const fadeLeft = { hidden: { opacity: 0, x: 36 }, show: { opacity: 1, x: 0, transition: { duration: 0.6,  ease: [0.22, 1, 0.36, 1] } } };
const stagger  = { show: { transition: { staggerChildren: 0.1 } } };

const AVATAR_COLORS = ['#E68736','#2563EB','#059669','#7C3AED','#DC2626','#D97706'];

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
    e.preventDefault();
    setSubmit(true);
    try {
      await apiService.postBlogComment(id, comment);
      Swal.fire({ title: 'Posted!', text: 'Your comment is live.', icon: 'success', confirmButtonColor: '#E68736' });
      setComment({ name: '', company: '', city: '', review: '' });
      const res = await apiService.getBlogDetails(id);
      setBlog(res.data?.data);
    } catch {
      Swal.fire({ title: 'Error', text: 'Failed to post comment.', icon: 'error' });
    } finally { setSubmit(false); }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes ping { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.5);opacity:0} }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ position: 'relative', width: 48, height: 48 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #E6873630', animation: 'ping 1.2s ease-out infinite' }} />
          <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#E68736', animation: 'spin 0.8s linear infinite' }} />
        </div>
        <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAAAAA', fontFamily: 'sans-serif' }}>Loading article</p>
      </div>
    </div>
  );

  if (!blog) return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#999', fontFamily: 'sans-serif' }}>Article not found.</p>
    </div>
  );

  const publishDate = new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const comments    = blog.comments || blog.reviews || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@300;400;500;600;700&display=swap');

        :root {
          --accent:       #E68736;
          --accent-hover: #D4751F;
          --accent-light: #FFF4EA;
          --accent-mid:   #F5A55A;
          --bg:           #FAFAF8;
          --white:        #FFFFFF;
          --text:         #0E0E0C;
          --text-2:       #3A3A36;
          --text-3:       #888880;
          --border:       #E6E4DE;
          --border-soft:  #F0EDE8;
        }

        *, *::before, *::after { box-sizing: border-box; }
        body { background: var(--bg); margin: 0; }

        .f-display { font-family: 'Playfair Display', Georgia, serif; }
        .f-body    { font-family: 'Outfit', system-ui, sans-serif; }

        /* Progress */
        .progress { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 3px; background: var(--accent); transform-origin: left; }

        /* Hero */
        .hero {
          background: linear-gradient(110deg,   #E68736 0%, #F5A55A 45%, #fcdeb1 100%);
          position: relative; overflow: hidden;
          border-radius: 20px;
          margin: 80px 24px 0;
        }
        /* big decorative circles like the image */
        .hero-dots {
          position: absolute; top: -60px; right: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          border: 48px solid rgba(255,255,255,0.13);
          pointer-events: none;
        }
        .hero-bar {
          position: absolute; bottom: -80px; right: 160px;
          width: 200px; height: 200px; border-radius: 50%;
          border: 36px solid rgba(255,255,255,0.10);
          pointer-events: none;
        }

        /* Back btn — on orange hero */
        .back-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: none; border: none; cursor: pointer; padding: 0;
          font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
          color: rgba(255,255,255,0.85); transition: color 0.2s; text-decoration: none;
        }
        .back-btn:hover { color: #fff; }
        .back-icon {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, background 0.2s;
        }
        .back-btn:hover .back-icon { border-color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.25); }

        /* Badge — on orange hero */
        .badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 14px; border-radius: 999px; font-size: 11px;
          font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(255,255,255,0.25); color: #fff;
          border: 1px solid rgba(255,255,255,0.35);
        }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; }

        /* Meta — on orange hero */
        .meta-divider { width: 1px; height: 18px; background: rgba(255,255,255,0.3); flex-shrink: 0; }
        .meta-chip { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: rgba(255,255,255,0.85); font-family: 'Outfit', sans-serif; }

        /* Featured image */
        .feat-img { width: 100%; object-fit: cover; max-height: 460px; border-radius: 18px; display: block; box-shadow: 0 10px 40px rgba(0,0,0,0.09); }

        /* Article prose */
        .prose { font-family: 'Outfit', sans-serif; font-size: 1.0625rem; line-height: 1.85; color: var(--text-2); }
        .prose h1,.prose h2,.prose h3,.prose h4 { font-family: 'Playfair Display', serif; color: var(--text); font-weight: 700; margin-top: 2em; margin-bottom: 0.65em; line-height: 1.25; }
        .prose h2 { font-size: 1.65rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--border-soft); }
        .prose h3 { font-size: 1.25rem; }
        .prose p  { margin-bottom: 1.35em; }
        .prose a  { color: var(--accent); text-underline-offset: 3px; }
        .prose strong { color: var(--text); font-weight: 600; }
        .prose ul,.prose ol { padding-left: 1.5em; margin-bottom: 1.35em; }
        .prose li { margin-bottom: 0.4em; }
        .prose blockquote { border-left: 3px solid var(--accent); padding: 1rem 1.5rem; background: var(--accent-light); border-radius: 0 12px 12px 0; font-style: italic; color: #7A5030; margin: 1.8em 0; }
        .prose code { background: #FFF4EA; color: #C05E10; padding: 2px 7px; border-radius: 5px; font-size: 0.875em; }
        .prose pre { background: #1C1C1A; border-radius: 14px; padding: 1.5rem; overflow-x: auto; margin: 1.8em 0; }
        .prose pre code { background: none; color: #A8D8C0; padding: 0; font-size: 0.875rem; }
        .prose img { border-radius: 14px; width: 100%; margin: 1.8em 0; box-shadow: 0 8px 30px rgba(0,0,0,0.09); }
        .prose table { width: 100%; border-collapse: collapse; margin: 1.8em 0; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); }
        .prose th { background: var(--accent-light); color: var(--accent); text-align: left; padding: 0.75rem 1rem; font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
        .prose td { border-top: 1px solid var(--border-soft); padding: 0.75rem 1rem; color: var(--text-2); }
        .prose tr:hover td { background: #FDFBF8; }
        .prose hr { border: none; border-top: 1px solid var(--border); margin: 2.5em 0; }

        /* Tags */
        .tag { display: inline-flex; align-items: center; padding: 5px 14px; border-radius: 999px; background: var(--white); border: 1.5px solid var(--border); font-size: 12px; font-weight: 500; color: var(--text-3); letter-spacing: 0.02em; transition: all 0.2s; cursor: pointer; font-family: 'Outfit', sans-serif; }
        .tag:hover { background: var(--accent-light); color: var(--accent); border-color: #E6873650; }

        /* Share */
        .share-btn { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid var(--border); background: var(--white); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-3); transition: all 0.2s; }
        .share-btn:hover { border-color: var(--accent); background: var(--accent-light); color: var(--accent); }

        /* Comment card */
        .comment-card { background: var(--white); border: 1px solid var(--border-soft); border-radius: 14px; padding: 18px 20px; transition: border-color 0.2s, box-shadow 0.2s; }
        .comment-card:hover { border-color: #E6873640; box-shadow: 0 4px 16px rgba(230,135,54,0.06); }

        /* Sidebar card */
        .sidebar-card { background: var(--white); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
        .card-accent-bar { height: 3px; background: linear-gradient(to right, var(--accent), var(--accent-mid), #FDE68A); }

        /* Form fields */
        .field { width: 100%; background: var(--bg); border: 1.5px solid var(--border); border-radius: 12px; padding: 13px 16px; color: var(--text); font-family: 'Outfit', sans-serif; font-size: 14px; outline: none; transition: border-color 0.2s, box-shadow 0.2s, background 0.2s; }
        .field::placeholder { color: #C0BEB8; }
        .field:focus { border-color: var(--accent); box-shadow: 0 0 0 3px #E6873318; background: var(--white); }

        /* Submit btn */
        .submit-btn { width: 100%; border: none; border-radius: 12px; padding: 15px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; background: var(--accent); color: white; transition: background 0.2s, transform 0.15s, box-shadow 0.2s; box-shadow: 0 4px 18px #E6873730; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .submit-btn:hover:not(:disabled) { background: var(--accent-hover); box-shadow: 0 6px 24px #E6873745; transform: translateY(-1px); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { background: #D0CFCA; box-shadow: none; cursor: not-allowed; }

        /* Info row */
        .info-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border-soft); }
        .info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .info-icon { width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0; background: var(--accent-light); display: flex; align-items: center; justify-content: center; }

        /* Divider */
        .divider { display: flex; align-items: center; gap: 12px; }
        .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg) } }
        .spinner { width: 17px; height: 17px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.35); border-top-color: white; animation: spin 0.7s linear infinite; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: #D4D2CC; border-radius: 4px; }

        /* Responsive */
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr !important; }
          .content-grid > *:last-child { position: static !important; }
        }
        @media (max-width: 640px) {
          .hero { margin: 70px 12px 0; border-radius: 14px; }
          .hero-inner { padding: 32px 24px 32px !important; }
          .grid-inner { padding: 32px 20px 60px !important; }
          .feat-wrap  { padding: 24px 20px 0 !important; }
        }
      `}</style>

      {/* Progress bar */}
      <motion.div className="progress f-body" style={{ scaleX }} />

      <div className="f-body" style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* ══════════════════════ HERO ══════════════════════ */}
        <motion.section className="hero" initial="hidden" animate="show" variants={stagger}>
          <div className="hero-dots" />
          <div className="hero-bar" />

          <div className="hero-inner" style={{ maxWidth: 1240, margin: '0 auto', padding: '44px 40px 44px' }}>

            {/* Back */}
            <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
              <button className="back-btn" onClick={() => window.history.back()}>
                <span className="back-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </span>
                Back to Blogs
              </button>
            </motion.div>

            {/* Category badge */}
            {blog.category && (
              <motion.div variants={fadeUp} style={{ marginBottom: 18 }}>
                <span className="badge"><span className="badge-dot" />{blog.category}</span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="f-display"
              style={{ fontSize: 'clamp(1.9rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1.1, maxWidth: 820, margin: '0 0 20px', letterSpacing: '-0.02em' }}
            >
              {blog.title}
            </motion.h1>

            {/* Short description */}
            {(blog.shortDescription || blog.description) && (
              <motion.p variants={fadeUp} style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.8)', maxWidth: 640, lineHeight: 1.7, margin: '0 0 32px' }}>
                {blog.shortDescription || blog.description}
              </motion.p>
            )}

            {/* Meta */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, border: '2px solid rgba(255,255,255,0.5)' }}>
                  {(blog.author || 'D').charAt(0)}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: '#fff' }}>{blog.author || 'Digident Team'}</p>
                  <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{publishDate}</p>
                </div>
              </div>

              <span className="meta-divider" />
              <span className="meta-chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
                {blog.views || 0} views
              </span>

              {comments.length > 0 && (
                <><span className="meta-divider" />
                <span className="meta-chip">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  {comments.length} comments
                </span></>
              )}

              {blog.readTime && (
                <><span className="meta-divider" />
                <span className="meta-chip">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {blog.readTime} min read
                </span></>
              )}
            </motion.div>

          </div>
        </motion.section>

        {/* Featured image */}
        {(blog.bannerImage || blog.featuredImage) && (
          <motion.div
            className="feat-wrap"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 24px 0' }}
          >
            <img src={blog.bannerImage || blog.featuredImage} alt={blog.title} className="feat-img" />
          </motion.div>
        )}

        {/* ══════════════════════ CONTENT GRID ══════════════════════ */}
        <div className="grid-inner" style={{ maxWidth: 1240, margin: '0 auto', padding: '52px 32px 96px' }}>
          <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '52px', alignItems: 'start' }}>

            {/* ── Left: Article body ── */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={stagger}>

              <motion.div variants={fadeUp}>
                <div className="prose">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {blog.contentMarkdown || blog.content}
                  </ReactMarkdown>
                </div>
              </motion.div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <motion.div variants={fadeUp} style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 12, fontWeight: 700 }}>Topics</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {blog.tags.map((tag, i) => <span key={i} className="tag">#{tag}</span>)}
                  </div>
                </motion.div>
              )}

              {/* Share */}
              <motion.div variants={fadeUp} style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', fontWeight: 700 }}>Share</span>
                {[
                  { label: 'Twitter',  d: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                  { label: 'LinkedIn', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                ].map(s => (
                  <button key={s.label} className="share-btn" title={`Share on ${s.label}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={s.d} /></svg>
                  </button>
                ))}
              </motion.div>

              {/* Comments list */}
              {comments.length > 0 && (
                <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} style={{ marginTop: 56 }}>
                  <motion.div variants={fadeUp} className="divider" style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                      {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                    </span>
                  </motion.div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {comments.map((c, i) => (
                      <motion.div key={i} variants={fadeUp} className="comment-card">
                        <div style={{ display: 'flex', gap: 14 }}>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: AVATAR_COLORS[i % AVATAR_COLORS.length], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>
                            {(c.name || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                              <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{c.name || 'Anonymous'}</span>
                              {c.company && <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 10px', borderRadius: 999, background: 'var(--accent-light)', color: 'var(--accent)' }}>{c.company}</span>}
                              {c.city && <span style={{ fontSize: 12, color: 'var(--text-3)' }}>· {c.city}</span>}
                            </div>
                            <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text-2)', margin: 0 }}>{c.review || c.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* ── Right: Sidebar ── */}
            <motion.div initial="hidden" animate="show" variants={fadeLeft} style={{ position: 'sticky', top: 96 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Comment form */}
                <div className="sidebar-card">
                  <div className="card-accent-bar" />
                  <div style={{ padding: '28px 28px 32px' }}>
                    <h3 className="f-display" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', margin: '0 0 6px' }}>
                      Join the discussion
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--text-3)', margin: '0 0 24px' }}>
                      Share your thoughts on this article.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <input type="text" placeholder="Full Name *" required className="field"
                        value={comment.name} onChange={e => setComment({ ...comment, name: e.target.value })} />

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <input type="text" placeholder="Company" className="field"
                          value={comment.company} onChange={e => setComment({ ...comment, company: e.target.value })} />
                        <input type="text" placeholder="City" className="field"
                          value={comment.city} onChange={e => setComment({ ...comment, city: e.target.value })} />
                      </div>

                      <textarea rows={5} placeholder="Your thoughts… *" required className="field"
                        style={{ resize: 'none' }}
                        value={comment.review} onChange={e => setComment({ ...comment, review: e.target.value })} />

                      <button type="submit" disabled={submitting} className="submit-btn">
                        <AnimatePresence mode="wait">
                          {submitting ? (
                            <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span className="spinner" /> Sending…
                            </motion.span>
                          ) : (
                            <motion.span key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              Post Comment
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                              </svg>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Article details */}
                <div className="sidebar-card">
                  <div style={{ padding: '22px 24px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', margin: '0 0 6px' }}>
                      Article Details
                    </p>
                    {[
                      { label: 'Published', value: publishDate, icon: 'M8 2v3M16 2v3M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
                      { label: 'Category',  value: blog.category || 'General', icon: 'M4 6h16M4 12h8m-8 6h16' },
                      { label: 'Views',     value: `${blog.views || 0} readers`, icon: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
                    ].map(item => (
                      <div key={item.label} className="info-row">
                        <div className="info-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8"><path d={item.icon}/></svg>
                        </div>
                        <div>
                          <p style={{ margin: '0 0 1px', fontSize: 11, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>{item.label}</p>
                          <p style={{ margin: 0, fontSize: 14, color: 'var(--text)', fontWeight: 600 }}>{item.value}</p>
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
