/* eslint-disable no-unused-vars */
"use client";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Assets - Update these paths as needed
import abutmentMain from "../../assets/products/aboutment.webp";
import abutmentTech from "../../assets/products/aboutment2.png";

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
  const productImages = [abutmentMain];

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
                    CuraVex™ <span className="text-[#0b2230]">Abutment System</span>
                  </h2>
                  <p className="text-[#0b2230] text-xl md:text-2xl leading-relaxed font-medium">
                    The <span className="text-[#E68736] font-bold">CuraVex™ Abutment System</span> sets a new benchmark in precision, offering micro-level customization for optimal tissue adaptation and superior clinical outcomes.
                  </p>
                  <p className="text-[#0b2230] text-lg md:text-xl leading-relaxed opacity-90">
                    Designed for unmatched accuracy, it provides precise height control to ensure proper prosthetic seating and balanced load distribution, significantly enhancing patient comfort and long-term restoration health.
                  </p>
                </div>
              </motion.section>

              {/* --- 2. TECHNICAL DIAGRAM SECTION --- */}
                <motion.section 
                  variants={fadeInUp}
                  className="bg-white/40 backdrop-blur-md p-6 md:p-20 rounded-[30px] md:rounded-[50px] border border-[#E68736]/40 w-full flex flex-col items-center relative overflow-hidden"
                >
                  <h3 className="text-[#E68736] text-2xl md:text-4xl font-black uppercase tracking-tight mb-10 text-center">
                    Abutment <span className="text-[#0b2230]">Technical Specifications</span>
                  </h3>

                  {/* DIAGRAM CONTAINER: Height adjusted to give space for absolute elements on mobile */}
                  <div className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center">
                    
                    {/* CENTER IMAGE */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="z-10 p-2"
                    >
                      <img 
                        src={abutmentTech} 
                        alt="CuraVex Abutment Technical View" 
                        className="h-[320px] md:h-[450px] object-contain drop-shadow-2xl" 
                      />
                    </motion.div>

                    {/* FEATURE 1: Micro-Level Height (Top Right) */}
                    <div className="absolute z-20 top-[35%] md:top-[40%] right-0 w-[28%] md:w-[35%] flex flex-col items-start">
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
                          Micro-Level Customization <br/> (250 µm – 3000 µm)
                        </p>
                        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
                      </motion.div>
                    </div>

                    {/* FEATURE 2: 55 Degree Markings (Center Left) */}
                    <div className="absolute z-20 top-[45%] md:top-[50%] left-0 w-[45%] md:w-[35%] flex flex-col items-end">
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
                          55° Angle Markings <br/> for Precise Cutting
                        </p>
                        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] mr-auto mt-1 md:mt-2" />
                      </motion.div>
                    </div>

                    {/* FEATURE 3: Adjustable Ti-Base (Bottom Right) */}
                    <div className="absolute z-20 top-[66%] md:top-[65%] right-0 w-[50%] md:w-[50%] flex flex-col items-start">
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
                          Adjustable Ti-base <br/> (6.5 mm to 3.5 mm)
                        </p>
                        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
                      </motion.div>
                    </div>
                  </div>
                </motion.section>

              {/* --- 3. DETAILED FEATURES SECTION --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                {/* Customization Detail */}
                <motion.section variants={fadeInUp} className="space-y-4 p-8 rounded-3xl bg-white/30 border border-[#E68736]/20">
                  <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                    Tissue Adaptation
                  </h3>
                  <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                    The system offers height variations from 250 µm to 3000 µm, enabling clinicians to achieve an exact tissue fit that prevents food lodgement.
                  </p>
                  <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                    This flexibility ensures optimal emergence profiles and hygienic restorations, effectively managing challenging implant positions while maintaining superior aesthetics.
                  </p>
                </motion.section>

                {/* Ti-Base Detail */}
                <motion.section variants={fadeInUp} className="space-y-4 p-8 rounded-3xl bg-white/30 border border-[#E68736]/20">
                  <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                    Advanced Tooling
                  </h3>
                  <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                    Equipped with a specialized Ti-base adjustment tool, allowing for seamless modification of abutment height from 6.5 mm down to 3.5 mm.
                  </p>
                  <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                    Integrated 55° markings provide a visual guide for precise customization, ensuring accuracy during the adjustment process for stable prosthetic seating.
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
          <img src={heroImage} alt="CuraVex Abutment" className="w-full h-full object-contain" />
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