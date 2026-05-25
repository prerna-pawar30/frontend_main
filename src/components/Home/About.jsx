/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import manufacturingImg from '../../assets/home/about1.jpeg'; 
import "../../pages/HomeNew.css"; 

const DigidentAbout = () => {
  return (
    // section stays full-width, overflow-visible handles the absolute decorative circles
    <section className="w-full relative overflow-visible z-10">
      
      {/* ── Rotating circles — bottom right background decoration ── */}
      <div
        style={{
          position: "absolute",
          bottom: "-360px",
          right: "-140px",
          width: "500px",
          height: "500px",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.9,
        }}
      >
        <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" width="500" height="500">
          <style>{`
            @keyframes spin1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes spin2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            @keyframes spin3 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .r1 { transform-origin: 210px 210px; animation: spin1 18s linear infinite; }
            .r2 { transform-origin: 210px 210px; animation: spin2 28s linear infinite; }
            .r3 { transform-origin: 210px 210px; animation: spin3 40s linear infinite; }
          `}</style>
          <circle cx="210" cy="210" r="62" fill="none" stroke="#e0d9d0" strokeWidth="1" strokeDasharray="4 8" opacity="0.5"/>
          <g className="r1">
            <circle cx="210" cy="210" r="100" fill="none" stroke="#d4c4b0" strokeWidth="1" strokeDasharray="6 10"/>
            <circle cx="210" cy="110" r="5" fill="#E68736" opacity="0.85"/>
            <circle cx="310" cy="210" r="3.5" fill="#888" opacity="0.5"/>
          </g>
          <g className="r2">
            <circle cx="210" cy="210" r="148" fill="none" stroke="#c8b89a" strokeWidth="1" strokeDasharray="8 14"/>
            <circle cx="358" cy="210" r="5.5" fill="#E68736" opacity="0.7"/>
          </g>
          <g className="r3">
            <circle cx="210" cy="210" r="195" fill="none" stroke="#bfae97" strokeWidth="1" strokeDasharray="10 18"/>
            <circle cx="210" cy="15" r="5" fill="#E68736" opacity="0.55"/>
          </g>
        </svg>
      </div>

      <div className="relative z-10 py-12 md:py-20">
        
        {/* Centered Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#1a2b3b] font-sans">
            Digident <span className="text-[#E68736]">India</span>
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs mt-2 font-sans">
            In-House Manufacturing
          </p>
        </motion.div>

        {/* Layout: Changed column tracking to let text occupy more space (md:w-[35%] vs md:w-[65%]) */}
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left Side: Small Image Container */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[29%] flex justify-center"
          >
            <div className="rounded-[1.25rem] md:rounded-[1.75rem] overflow-hidden w-full max-w-[420px] shadow-sm">
              <img 
                src={manufacturingImg} 
                alt="Robotic manufacturing arm" 
                className="w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[400px] object-cover" 
              />
            </div>
          </motion.div>

          {/* Right Side: Content Area (Expanded to 65%) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-[65%] flex flex-col justify-center py-2"
          >
            <h3 className="text-xl sm:text-2xl md:text-[38px] font-black text-[#1a2b3b] leading-[1.3] mb-5 font-sans tracking-tight">
              <span className="text-[#E68736]">Digident India</span> Has Indigenously Developed India's First Dental Product—Engineered, <span className="text-[#E68736]">Manufactured</span>, And Perfected By Experts.
            </h3>

            <div className="space-y-4 text-[#525b65] text-sm sm:text-base leading-relaxed font-sans">
              <p>Digident India has indigenously developed India's first dental product through advanced engineering and continuous <span className="text-[#E68736] font-semibold">in-house innovation</span>.</p>
              <p>From initial concept and design to final production, every product is precision-manufactured with uncompromising attention to detail.</p>
              <p>Our advanced manufacturing capabilities are supported by strict <span className="text-[#E68736] font-semibold">quality control</span> standards at every stage of development.</p>
              <p>Expert-led design, refined production processes, and technical excellence ensure consistent performance and reliability.</p>
              <p><span className="text-[#E68736] font-semibold">Clinical accuracy</span> and long-term durability define our approach to delivering world-class dental manufacturing solutions.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DigidentAbout;