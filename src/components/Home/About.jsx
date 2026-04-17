/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import manufacturingImg from '../../assets/home/about1.jpeg'; 
 import bgGraphic from '../../assets/home/background1.webp'; 
import "../../pages/HomeNew.css"; // Ensure your CSS is imported

const DigidentAbout = () => {
  return (
    // Removed px-6, md:px-12, lg:px-6
    <section className="bg-white py-6 overflow-hidden relative w-full">
      
      {/* Background Image: Left Side Down */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }} 
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 w-64 h-64 -z-10 pointer-events-none"
      >
        <img 
          src={bgGraphic} 
          alt="" 
          className="w-full h-full object-contain object-bottom-left" 
        />
      </motion.div>
      <div className="responsive-container relative z-10">
        
        {/* Centered Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[36px] font-bold text-[#1a2b3b] font-sans">
            Digident <span className="text-[#f18730]">India</span>
          </h2>
          <p className="text-gray-400 font-medium uppercase tracking-[0.2em] text-[12px] mt-2 font-sans">
            In-House Manufacturing
          </p>
        </motion.div>

        {/* Layout: Image and Content */}
        <div className="flex flex-col md:flex-row items-stretch gap-12 lg:gap-20">
          
          {/* Left Side: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex"
          >
            <div className="rounded-[2.5rem] overflow-hidden w-full shadow-lg">
              <img 
                src={manufacturingImg} 
                alt="Robotic manufacturing arm" 
                className="w-full h-[500px] object-cover" 
              />
            </div>
          </motion.div>

          {/* Right Side: Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col justify-center py-4"
          >
            <h3 className="text-[26px] font-bold text-[#1a2b3b] leading-[1.3] mb-5 font-sans">
              <span className="text-[#f18730]">Digident India</span> Has Indigenously Developed India’s First Dental Product—Engineered, <span className="text-[#f18730]">Manufactured</span>, And Perfected By Experts.
            </h3>

            <div className="space-y-4 text-[#525b65] text-[15px] leading-relaxed font-sans">
              <p>Digident India has indigenously developed India’s first dental product through advanced engineering and continuous <span className="text-[#f18730] font-semibold">in-house innovation</span>.</p>
              <p>From initial concept and design to final production, every product is precision-manufactured with uncompromising attention to detail.</p>
              <p>Our advanced manufacturing capabilities are supported by strict <span className="text-[#f18730] font-semibold">quality control</span> standards at every stage of development.</p>
              <p>Expert-led design, refined production processes, and technical excellence ensure consistent performance and reliability.</p>
              <p><span className="text-[#f18730] font-semibold">Clinical accuracy</span> and long-term durability define our approach to delivering world-class dental manufacturing solutions.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DigidentAbout;