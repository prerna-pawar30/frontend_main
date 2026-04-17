/* eslint-disable no-unused-vars */
"use client";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Assets
import analogImg1 from "../../assets/products/labanalog.webp";
import analogTechView from "../../assets/products/labanalog1.png"; // Assuming this is your technical cutout asset

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

const lineAnimation = {
  hidden: { width: 0, opacity: 0 },
  visible: { 
    width: "100%", 
    opacity: 1, 
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.4 } 
  }
};

export default function Products() {
  const navigate = useNavigate(); // Initialize navigation
  const productImages = [analogImg1];

  return (
    <div className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col items-center py-16">

 {/* --- BACK BUTTON --- */}
            <div className="w-full max-w-6xl px-6 mb-8 flex justify-start">
              <motion.button
                onClick={() => navigate(-1)} // Goes back to the previous page
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-[#E68736] font-bold hover:text-[#0b2230] transition-colors"
              >
                <FiArrowLeft size={24} />
                <span>Back to Products</span>
              </motion.button>
            </div>

      <div className="relative w-full max-w-6xl px-6 flex flex-col items-center">
        <ProductCard
          images={productImages}
          desktopDesc={
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="space-y-20 text-center max-w-5xl mx-auto"
            >
              {/* --- 1. MAIN DESCRIPTION SECTION --- */}
              <motion.section variants={fadeInUp} className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-[#E68736] text-4xl md:text-5xl font-black uppercase tracking-tighter">
                    Lab Analog <span className="text-[#0b2230]">System</span>
                  </h2>
                  <p className="text-[#0b2230] text-xl md:text-2xl leading-relaxed font-medium">
                    The <span className="text-[#E68736] font-bold">Lab Analog from Digident India</span> is precision-engineered to accurately replicate the position of dental implants within laboratory models.
                  </p>
                  <p className="text-[#0b2230] text-lg md:text-xl leading-relaxed opacity-90">
                    Designed for compatibility across multiple implant systems, it ensures a secure fit and consistent alignment throughout the dental laboratory workflow, enabling highly reliable prosthetic fabrication.
                  </p>
                  <p className="text-[#0b2230] text-lg md:text-xl leading-relaxed opacity-90">
                    Manufactured from high-grade materials with tight machining tolerances, this analog offers <span className="text-[#E68736] font-bold">excellent dimensional accuracy</span>. It supports precise fabrication of crowns, bridges, and full-arch restorations, helping technicians achieve predictable and high-quality clinical outcomes.
                  </p>
                </div>
              </motion.section>

              {/* --- 2. TECHNICAL DIAGRAM SECTION --- */}
             <motion.section 
  variants={fadeInUp}
  className="bg-white/40 backdrop-blur-md p-4 md:p-20 rounded-[30px] md:rounded-[50px] border border-[#E68736]/40 w-full flex flex-col items-center relative overflow-hidden"
>
  <h3 className="text-[#E68736] text-xl md:text-4xl font-black uppercase tracking-tight text-center mb-10 md:mb-20">
    Lab Analog <span className="text-[#0b2230]">Technical Specifications</span>
  </h3>

  {/* MAIN DIAGRAM AREA - Maintains aspect ratio on mobile */}
  <div className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center">
    
    {/* CENTER IMAGE */}
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      className="z-10 p-2"
    >
      <img 
        src={analogTechView} 
        alt="Lab Analog Internal View" 
        className="h-[300px] md:h-[450px] object-contain drop-shadow-2xl" 
      />
    </motion.div>

    {/* --- FEATURE 1: TOP RIGHT --- */}
    <div className="absolute z-20 top-[25%] right-0 w-[48%] md:w-[48%] flex flex-col items-start">
      <div className="flex items-center w-full">
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E68736] shadow-[0_0_15px_#E68736] flex-shrink-0" 
        />
        <motion.div variants={lineAnimation} className="h-[1px] md:h-[2px] bg-[#E68736] shadow-[0_0_8px_rgba(230,135,54,0.5)]" />
      </div>
      <motion.div variants={fadeInUp} className="mt-2 md:mt-4 ml-auto pr-2 md:pr-4 text-right">
        <p className="text-[#0b2230] text-[10px] sm:text-xs md:text-lg font-bold leading-tight">
          Accurate implant position <br/> replication in lab models
        </p>
        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
      </motion.div>
    </div>

    {/* --- FEATURE 2: CENTER LEFT --- */}
    <div className="absolute z-20 top-[35%] left-0 w-[44%] md:w-[42%] flex flex-col items-end">
      <div className="flex items-center w-full justify-end">
        <motion.div variants={lineAnimation} className="h-[1px] md:h-[2px] bg-[#E68736] shadow-[0_0_8px_rgba(230,135,54,0.5)]" />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E68736] shadow-[0_0_15px_#E68736] flex-shrink-0" 
        />
      </div>
      <motion.div variants={fadeInUp} className="mt-2 md:mt-4 mr-auto pl-2 md:pl-4 text-left">
        <p className="text-[#0b2230] text-[10px] sm:text-xs md:text-lg font-bold leading-tight">
          Compatible with multiple <br/> implant system platforms
        </p>
        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] mr-auto mt-1 md:mt-2" />
      </motion.div>
    </div>

    {/* --- FEATURE 3: BOTTOM RIGHT --- */}
    <div className="absolute z-20 top-[55%] right-0 w-[37%] md:w-[45%] flex flex-col items-start">
      <div className="flex items-center w-full">
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E68736] shadow-[0_0_15px_#E68736] flex-shrink-0" 
        />
        <motion.div variants={lineAnimation} className="h-[1px] md:h-[2px] bg-[#E68736] shadow-[0_0_8px_rgba(230,135,54,0.5)]" />
      </div>
      <motion.div variants={fadeInUp} className="mt-2 md:mt-4 ml-auto pr-2 md:pr-4 text-right">
        <p className="text-[#0b2230] text-[10px] sm:text-xs md:text-lg font-bold leading-tight">
          High dimensional accuracy <br/> with durable medical build
        </p>
        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
      </motion.div>
    </div>

  </div>
</motion.section>

              {/* --- 3. DETAILED FEATURES SECTION --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                {/* Versatility Detail */}
                <motion.section variants={fadeInUp} className="space-y-4 p-8 rounded-3xl bg-white/30 border border-[#E68736]/20">
                  <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                    Cross-Platform Versatility
                  </h3>
                  <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                    Our lab analogs are designed to be an essential component for dental labs seeking versatility and cross-platform compatibility.
                  </p>
                  <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                    Tight machining tolerances ensure that every analog provides a consistent, secure fit, reducing the margin for error during complex prosthetic assemblies.
                  </p>
                </motion.section>

                {/* Accuracy Detail */}
                <motion.section variants={fadeInUp} className="space-y-4 p-8 rounded-3xl bg-white/30 border border-[#E68736]/20">
                  <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                    Predictable Outcomes
                  </h3>
                  <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                    Supports precise fabrication of crowns, bridges, and full-arch restorations with total reliability.
                  </p>
                  <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                    The durable construction allows for repeated laboratory use without loss of accuracy, ensuring high-quality outcomes for every patient restoration.
                  </p>
                </motion.section>
              </div>

            </motion.div>
          }
        />
      </div>
    </div>
  );
}

function ProductCard({ images, desktopDesc }) {
  const heroImage = images[0];

  return (
    <div className="w-full flex flex-col items-center gap-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <div className="w-[300px] h-[300px] md:w-[650px] md:h-[500px] flex items-center justify-center p-10 transition-transform duration-500 hover:scale-[1.05]">
          <img src={heroImage} alt="Lab Analog" className="w-full h-full object-contain" />
        </div>
      </motion.div>

      <div className="z-10 flex flex-col items-center gap-14 w-full">
        <div className="w-full">{desktopDesc}</div>

        <motion.a 
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           href={`${SHOP_BASE_URL}/all-products`}
           className="group bg-[#E68736] text-white px-6 py-3 rounded-2xl font-bold text-xl shadow-xl hover:bg-[#d4762c] flex items-center gap-4 mb-20"
          >
           <FiShoppingCart size={24} />
           <span>Shop Now</span>
        </motion.a>
      </div>
    </div>
  );
}