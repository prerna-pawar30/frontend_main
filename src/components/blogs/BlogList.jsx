/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import apiService from '../../api/ApiService';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-100 border-t-[#E68736]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E68736]">
            Knowledge Base
          </span>
          <h1 className="mt-3 text-4xl font-light tracking-tight text-black">
            Our <span className="font-bold text-[#E68736]">Insights</span>
          </h1>
          <div className="mx-auto mt-4 h-1 w-12 bg-[#E68736]"></div>
        </motion.header>

        {/* Grid Section - Adjusted to 4 columns on desktop and smaller gap */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group flex flex-col overflow-hidden rounded-xl border border-orange-100 bg-white transition-shadow hover:shadow-lg"
              >
                {/* Image Section - Height reduced to h-44 */}
                <div className="relative h-44 w-full overflow-hidden">
                  <motion.img 
                    src={blog.bannerImage} 
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5"></div>
                </div>

                {/* Content Section - Reduced padding to p-5 */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-[#E68736]"></span>
                      {blog.stats?.views || 0} Views
                    </span>
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Title - Reduced to text-lg and tighter line height */}
                  <h2 className="mb-2 text-lg font-bold leading-tight text-black transition-colors duration-300 group-hover:text-[#E68736]">
                    {blog.title}
                  </h2>
                  
                  {/* Description - Reduced to text-xs and line-clamp-2 */}
                  <p className="mb-5 text-xs leading-relaxed text-gray-500 line-clamp-2">
                    {blog.shortDescription}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 border-dashed">
                    <Link 
                      to={`/blog/${blog.blogId}`}
                      className="group/link inline-flex items-center text-[10px] font-black uppercase tracking-widest text-black"
                    >
                      <span className="relative">
                        Read Story
                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#E68736] transition-all duration-300 group-hover/link:w-full"></span>
                      </span>
                      <motion.span 
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-2 text-[#E68736]"
                      >
                        →
                      </motion.span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-xs uppercase tracking-widest text-gray-400">
              No articles found.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogList;