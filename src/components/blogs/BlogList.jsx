// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import apiService from '../../api/ApiService';

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);
//       const response = await apiService.getBlogs();
//       const dataToSet = response.data?.data?.blogs || [];
//       setBlogs(dataToSet);
//     } catch (error) {
//       console.error("Error loading blogs:", error);
//       setBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5, ease: "easeOut" }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex h-96 items-center justify-center bg-white">
//         <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-100 border-t-[#E68736]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white px-4 py-16 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
        
//         {/* Header Section */}
//         <motion.header 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="mb-12 text-center"
//         >
//           <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E68736]">
//             Knowledge Base
//           </span>
//           <h1 className="mt-3 text-4xl font-light tracking-tight text-black">
//             Our <span className="font-bold text-[#E68736]">Insights</span>
//           </h1>
//           <div className="mx-auto mt-4 h-1 w-12 bg-[#E68736]"></div>
//         </motion.header>

//         {/* Grid Section - Adjusted to 4 columns on desktop and smaller gap */}
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
//         >
//           {blogs.length > 0 ? (
//             blogs.map((blog) => (
//               <motion.div
//                 key={blog._id}
//                 variants={cardVariants}
//                 whileHover={{ y: -8 }}
//                 className="group flex flex-col overflow-hidden rounded-xl border border-orange-100 bg-white transition-shadow hover:shadow-lg"
//               >
//                 {/* Image Section - Height reduced to h-44 */}
//                 <div className="relative h-44 w-full overflow-hidden">
//                   <motion.img 
//                     src={blog.bannerImage} 
//                     alt={blog.title}
//                     className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5"></div>
//                 </div>

//                 {/* Content Section - Reduced padding to p-5 */}
//                 <div className="flex flex-1 flex-col p-5">
//                   <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
//                     <span className="flex items-center gap-1.5">
//                       <span className="h-1 w-1 rounded-full bg-[#E68736]"></span>
//                       {blog.stats?.views || 0} Views
//                     </span>
//                     <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
//                   </div>
                  
//                   {/* Title - Reduced to text-lg and tighter line height */}
//                   <h2 className="mb-2 text-lg font-bold leading-tight text-black transition-colors duration-300 group-hover:text-[#E68736]">
//                     {blog.title}
//                   </h2>
                  
//                   {/* Description - Reduced to text-xs and line-clamp-2 */}
//                   <p className="mb-5 text-xs leading-relaxed text-gray-500 line-clamp-2">
//                     {blog.shortDescription}
//                   </p>

//                   <div className="mt-auto pt-4 border-t border-gray-50 border-dashed">
//                     <Link 
//                       to={`/blog/${blog.blogId}`}
//                       className="group/link inline-flex items-center text-[10px] font-black uppercase tracking-widest text-black"
//                     >
//                       <span className="relative">
//                         Read Story
//                         <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#E68736] transition-all duration-300 group-hover/link:w-full"></span>
//                       </span>
//                       <motion.span 
//                         animate={{ x: [0, 4, 0] }}
//                         transition={{ repeat: Infinity, duration: 1.5 }}
//                         className="ml-2 text-[#E68736]"
//                       >
//                         →
//                       </motion.span>
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))
//           ) : (
//             <div className="col-span-full py-20 text-center text-xs uppercase tracking-widest text-gray-400">
//               No articles found.
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default BlogList;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import apiService from '../../api/ApiService';
import { HiArrowNarrowRight } from 'react-icons/hi';

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
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const totalViews = blogs.reduce((sum, b) => sum + (b.stats?.views || 0), 0);

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

        {/* ── Hero Header (Black) ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-12 px-8 py-10"
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full border-[20px] border-[#E68736] opacity-20" />
          <div className="pointer-events-none absolute bottom-[-20px] left-[42%] h-20 w-20 rounded-full bg-[#E68736] opacity-10" />

          {/* Eyebrow */}
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E68736]">
            Knowledge Base
          </p>

          {/* Title */}
          <h1 className="text-4xl font-extrabold leading-tight text-white">
            Our <span className="text-[#E68736]">Insights</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Perspectives from our team on design, growth &amp; innovation.
          </p>

          {/* Stats row */}
          <div className="mt-6 flex items-center gap-6">
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#E68736]">{blogs.length}</p>
              <p className="text-[9px] uppercase tracking-widest text-gray-500">Articles</p>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#E68736]">
                {totalViews >= 1000
                  ? `${(totalViews / 1000).toFixed(1)}k`
                  : totalViews}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-gray-500">Readers</p>
            </div>
            <div className="h-8 w-px bg-gray-700" />
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#E68736]">
                {new Date().getFullYear()}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-gray-500">Season</p>
            </div>
          </div>
        </motion.div>

        {/* ── Blog Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
        >
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <motion.div
                key={blog._id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group flex flex-col overflow-hidden rounded-xl border-2 border-orange-200 bg-white transition-shadow duration-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative h-70 w-full overflow-hidden border-b-2 border-orange-200">
                  <motion.img
                    src={blog.bannerImage}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  {/* Meta row */}
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#E68736]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E68736]" />
                      {blog.stats?.views || 0} Views
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400">
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-2 text-sm font-extrabold leading-snug text-black transition-colors duration-300 group-hover:text-[#E68736]">
                    {blog.title}
                  </h2>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-[11px] leading-relaxed text-gray-500">
                    {blog.shortDescription}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto border-t border-dashed border-orange-200 pt-3">
                    <Link
                      to={`/blog/${blog.blogId}`}
                      className="group/link inline-flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest text-black"
                    >
                      <span className="relative">
                        Read Story
                        <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#E68736] transition-all duration-300 group-hover/link:w-full" />
                      </span>
                     <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        // Added text-xl for size and leading-none for alignment
                        className="text-[#E68736] text-2xl leading-none" 
                      >
                      <HiArrowNarrowRight></HiArrowNarrowRight>
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
