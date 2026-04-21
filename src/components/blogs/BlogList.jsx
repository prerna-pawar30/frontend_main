/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import apiService from '../../api/ApiService';
import { HiArrowNarrowRight } from 'react-icons/hi';

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/* ─────────────────────────────────────────────
   Skeleton Component (The "Ghost" Cards)
───────────────────────────────────────────── */
const BlogSkeleton = () => (
  <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3, 4, 5, 6].map((n) => (
      <div key={n} className="flex flex-col overflow-hidden rounded-xl border-2 border-gray-100 bg-white">
        <div className="h-60 w-full animate-pulse bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="mt-4 h-4 w-1/4 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      // We don't reset loading to true here to avoid "flickering" 
      // if you add search or filters later.
      const response = await apiService.getBlogs();
      const dataToSet = response.data?.data?.blogs || [];
      setBlogs(dataToSet);
    } catch (error) {
      console.error("Error loading blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalViews = blogs.reduce((sum, b) => sum + (b.stats?.views || 0), 0);

  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ── Hero Header (Renders Immediately) ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-12 px-8 py-10 shadow-xl"
        >
          {/* Decorative shapes */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full border-[20px] border-[#E68736] opacity-20" />
          <div className="pointer-events-none absolute bottom-[-20px] left-[42%] h-20 w-20 rounded-full bg-[#E68736] opacity-10" />

          <p className="mb-2 text-[14px] font-bold uppercase tracking-[0.1em] text-[#E68736]">
            Knowledge Base
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-white">
            Our <span className="text-[#E68736]">Insights</span>
          </h1>

          <p className="mt-2 text-[16px] text-gray-300">
            Perspectives from our team on design, growth &amp; innovation.
          </p>

          {/* Stats row */}
          <div className="mt-6 flex items-center gap-6">
            <div className="text-center">
              <p className="text-[20px] font-extrabold text-[#E68736]">
                {loading ? "..." : blogs.length}
              </p>
              <p className="text-[12px] uppercase font-bold text-gray-400">Articles</p>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="text-center">
              <p className="text-[20px] font-extrabold text-[#E68736]">
                {loading ? "..." : (totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews)}
              </p>
              <p className="text-[12px] uppercase font-bold text-gray-400">Readers</p>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="text-center">
              <p className="text-[20px] font-extrabold text-[#E68736]">
                {new Date().getFullYear()}
              </p>
              <p className="text-[12px] uppercase font-bold text-gray-400">Season</p>
            </div>
          </div>
        </motion.div>

        {/* ── Content Area ── */}
        {loading ? (
          <BlogSkeleton />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  className="group flex flex-col overflow-hidden rounded-xl border-2 border-orange-200 bg-white transition-shadow duration-300 hover:shadow-lg"
                >
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden border-b-2 border-orange-200 bg-gray-50">
                    <img
                      src={blog.bannerImage}
                      alt={blog.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#E68736]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E68736]" />
                        {blog.stats?.views || 0} Views
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-gray-400">
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h2 className="mb-2 text-[17px] font-extrabold leading-snug text-black transition-colors duration-300 group-hover:text-[#E68736]">
                      {blog.title}
                    </h2>

                    <p className="mb-6 line-clamp-2 text-[14px] leading-relaxed text-gray-500">
                      {blog.shortDescription}
                    </p>

                    {/* Footer */}
                    <div className="mt-auto border-t border-dashed border-orange-200 pt-4">
                      <Link
                        to={`/blog/${blog.blogId}`}
                        className="group/link inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-black"
                      >
                        <span className="relative">
                          Read Story
                          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#E68736] transition-all duration-300 group-hover/link:w-full" />
                        </span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="text-2xl text-[#E68736]"
                        >
                          <HiArrowNarrowRight />
                        </motion.span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-400 uppercase tracking-widest text-sm">No articles found.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogList;