/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import apiService from '../../../api/ApiService'; // Adjust path
import { HiArrowNarrowRight } from 'react-icons/hi';

const BlogSection = ({ limit = 4 }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiService.getBlogs();
        
        const allBlogs = response.data?.data?.blogs || response.data?.blogs || [];
        
        setBlogs(allBlogs.slice(0, limit));
      } catch (error) {
        console.error("Error loading blogs:", error);
        setBlogs([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [limit]);

  // Responsive skeleton grid matching the main layout
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(limit)].map((_, n) => (
            <div key={n} className="h-96 animate-pulse rounded-xl bg-gray-100 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // --- HIDE LOGIC ---
  if (blogs.length < 4) {
    return null;
  }

  return (
    // Max-width container keeps cards from spreading infinitely on massive monitors
    <div className=" px-4 sm:px-6 lg:px-8 py-8">
      {/* 
        Responsive Breakpoints Breakdown:
        - grid-cols-1: Single column on mobile (0px - 639px)
        - sm:grid-cols-2: Two columns on tablets (640px - 1023px)
        - lg:grid-cols-4: Four columns on large screens (1024px+)
      */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.map((blog) => {
          const blogImg = blog.bannerImage || blog.featuredImage || "https://via.placeholder.com/600x400";
          const blogDesc = blog.shortDescription || blog.description || "";

          return (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group flex flex-col overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm transition-all hover:shadow-md w-full"
            >
              {/* Image aspect-ratio handling keeps it looking good on every screen width */}
              <div className="relative aspect-video sm:h-48 md:h-52 overflow-hidden bg-gray-100">
                <img
                  src={blogImg}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#E68736]">
                  {blog.publishedAt 
                    ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'Recent'}
                </span>
                
                <h3 className="mb-2 text-base md:text-lg font-bold leading-tight text-slate-900 group-hover:text-[#E68736] transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="mb-4 line-clamp-2 text-xs md:text-sm text-gray-500">
                  {blogDesc}
                </p>

                <Link
                  to={`/blog/${blog.blogId}`}
                  className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-[#E68736] transition-colors"
                >
                  Read More 
                  <HiArrowNarrowRight className="text-[#E68736] text-lg transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogSection;