/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, Eye, Clock, Tag } from 'lucide-react'; // Optional: for cleaner icons
import Swal from 'sweetalert2';
import apiService from '../../api/ApiService';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({ name: '', company: '', city: '', review: '' });
  const [submitting, setSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const loadData = async () => {
      try {
        await apiService.incrementBlogView(id);
        const res = await apiService.getBlogDetails(id);
        setBlog(res.data?.data || null);
      } catch (err) {
        console.error("Error fetching blog details", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
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

  const fadeInLeft = {
    hide: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const fadeInRight = {
    hide: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const scaleUp = {
    hide: { opacity: 0, scale: 0.8, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange-100 border-t-[#E68736]"></div>
    </div>
  );

  if (!blog) return <div className="py-20 text-center">Article not found.</div>;

  return (
    <div className="bg-[#FAFAFA] min-h-screen overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#E68736] z-50 origin-left" style={{ scaleX }} />

      {/* Modern Split Header */}
      <section className="relative flex flex-col lg:flex-row h-auto lg:min-h-[70vh] bg-white border-b border-gray-100">
        <div className="flex-1 p-8 lg:p-20 flex flex-col justify-center">
          <motion.div initial="hide" animate="show" variants={fadeInLeft}>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-block px-3 py-1 bg-orange-50 text-[#E68736] text-[10px] font-bold uppercase tracking-widest rounded-full">
                Dental Tech
              </span>
              {blog.featured && (
                <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-5xl font-black text-black leading-tight">
              {blog.title}
            </h1>
            
            {/* Short Description from Response */}
            <p className="mt-4 text-gray-500 text-lg italic max-w-xl">
              {blog.shortDescription}
            </p>

            {/* Stats Bar (Views, Reading Time, Date) */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-xs font-bold text-gray-400 uppercase tracking-tighter">
              <div className="flex items-center gap-2">
                <span className="text-[#E68736]">●</span> {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E68736]">●</span> {blog.readingTime} Min Read
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E68736]">●</span> {blog.stats?.views || 0} Views
              </div>
            </div>

            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "100px" }} 
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-[#E68736] mt-6" 
            />
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-50 p-6 lg:p-12">
          <motion.div 
            initial="hide"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInRight}
            className="relative w-full max-w-md aspect-square overflow-hidden rounded-2xl shadow-2xl"
          >
            <img src={blog.bannerImage} className="h-full w-full object-cover" alt={blog.title} />
          </motion.div>
        </div>
      </section>

      {/* Grid Content Layout */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Article Column */}
          <div className="lg:col-span-7">
            <article className="prose prose-orange max-w-none">
              {blog.content?.map((block, index) => {
                const isEven = index % 2 === 0;
                switch (block.type) {
                  case 'heading':
                    return (
                      <motion.h2 
                        key={block.blockId}
                        initial="hide"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.8 }}
                        variants={fadeInLeft}
                        className="text-2xl font-bold mb-6 mt-12 text-black"
                      >
                        {block.text}
                      </motion.h2>
                    );
                  case 'paragraph':
                    return (
                      <motion.p 
                        key={block.blockId}
                        initial="hide"
                        whileInView="show"
                        viewport={{ once: false, amount: 0.8 }}
                        variants={isEven ? fadeInRight : fadeInLeft}
                        className="text-gray-600 text-base leading-relaxed mb-8"
                      >
                        {block.text}
                      </motion.p>
                    );
                  case 'list':
                    return (
                      <div key={block.blockId} className="grid grid-cols-1 gap-3 my-10">
                        {block.listItems?.map((item, idx) => (
                          <motion.div 
                            key={idx}
                            initial="hide"
                            whileInView="show"
                            viewport={{ once: false }}
                            variants={scaleUp}
                            className="flex gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                          >
                            <span className="text-[#E68736] font-bold">0{idx + 1}</span>
                            <span className="text-gray-700 text-sm">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    );
case 'image':
  return (
    <div key={block.blockId} className="flex justify-center my-12">
      <motion.div
        initial="hide"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        variants={scaleUp}
        className="flex flex-col items-center"
      >
        <div className="h-[400px] w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
          <img 
            src={block.image} 
            /* Changed object-cover to object-contain */
            className="h-full w-full object-contain p-2" 
            alt="blog content" 
          />
        </div>
        
        {block.text && (
          <p className="text-center text-xs text-gray-400 mt-4 italic max-w-[300px]">
            {block.text}
          </p>
        )}
      </motion.div>
    </div>
  );
                  default: return null;
                }
              })}
            </article>

            {/* Tags Section (If data.tags has items) */}
            {blog.tags?.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-500 text-xs font-bold rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Interaction Box Column */}
          <div className="lg:col-span-5">
            <motion.div 
              initial="hide"
              whileInView="show"
              variants={fadeInRight}
              className="sticky top-20"
            >
              <div className="bg-black p-8 lg:p-10 rounded-[2rem] shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Join the discussion</h3>
                <p className="text-gray-400 text-xs mb-8">Share your professional perspective.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" required className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#E68736] outline-none" value={comment.name} onChange={(e) => setComment({...comment, name: e.target.value})} />
                    <input type="text" placeholder="City" className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#E68736] outline-none" value={comment.city} onChange={(e) => setComment({...comment, city: e.target.value})} />
                  </div>
                  <input type="text" placeholder="Company" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#E68736] outline-none" value={comment.company} onChange={(e) => setComment({...comment, company: e.target.value})} />
                  <textarea rows="4" placeholder="Your review..." required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-[#E68736] outline-none" value={comment.review} onChange={(e) => setComment({...comment, review: e.target.value})}></textarea>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#E68736] py-4 rounded-full text-xs font-black uppercase tracking-widest text-white transition-all shadow-lg shadow-orange-600/20"
                  >
                    {submitting ? "Submitting..." : "Post Review"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Full Width Review Section */}
      <div className="bg-white py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <motion.h3 
                initial="hide" whileInView="show" variants={fadeInLeft}
                className="text-2xl font-bold"
              >
                Community Feedback
              </motion.h3>
              <p className="text-gray-400 text-sm mt-2">{blog.stats?.commentsCount || 0} professionals have shared their thoughts</p>
            </div>
          </div>
          
          {blog.comments?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {blog.comments.map((c, i) => (
                <motion.div 
                  key={c.commentId || i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#FAFAFA] p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <p className="text-gray-600 text-sm italic mb-8">"{c.review}"</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-orange-100 flex items-center justify-center font-bold text-[#E68736]">
                      {c.name?.[0] || "?"}
                    </div>
                    <div className="overflow-hidden">
                      <h5 className="text-sm font-bold truncate">{c.name}</h5>
                      <p className="text-[10px] text-gray-400 uppercase tracking-tighter truncate">
                        {c.company} • {c.city}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-[#FAFAFA] rounded-2xl p-12 text-center border-2 border-dashed border-gray-100">
               <p className="text-gray-400 font-medium">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;