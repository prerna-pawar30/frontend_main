/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import apiService from '../../../api/ApiService'; // Adjust path
import { HiArrowNarrowRight } from 'react-icons/hi';

const BlogSection = ({ limit = 3 }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiService.getBlogs();
        
        // Target the correct data path: response.data.data.blogs
        // Added fallback for response.data.blogs just in case
        const allBlogs = response.data?.data?.blogs || response.data?.blogs || [];
        
        // Only take the number of blogs specified by 'limit'
        setBlogs(allBlogs.slice(0, limit));
      } catch (error) {
        console.error("Error loading blogs:", error);
        setBlogs([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(limit)].map((_, n) => (
          <div key={n} className="h-80 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {blogs.map((blog) => {
        // Fallback for image and description if field names vary
        const blogImg = blog.bannerImage || blog.featuredImage || "https://via.placeholder.com/600x400";
        const blogDesc = blog.shortDescription || blog.description || "";

        return (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group flex flex-col overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative h-52 overflow-hidden bg-gray-100">
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
              
              <h3 className="mb-2 text-lg font-bold leading-tight text-slate-900 group-hover:text-[#E68736] transition-colors">
                {blog.title}
              </h3>
              
              <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                {blogDesc}
              </p>

              <Link
                to={`/blog/${blog.blogId}`}
                className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900"
              >
                Read More 
                <HiArrowNarrowRight className="text-[#E68736] text-lg" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BlogSection;