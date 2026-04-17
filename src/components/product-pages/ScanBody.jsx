/* eslint-disable no-unused-vars */
"use client";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi"; // Added Arrow icon
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Added for navigation

// Assets
import analogImg1 from "../../assets/products/scanbody1.webp";
import scanBodyCut from "../../assets/products/scanbody2.png";

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
  const scanBodyImages = [analogImg1];

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
          images={scanBodyImages}
          desktopDesc={
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="space-y-20 text-center max-w-7xl mx-auto"
            >
              {/* --- 1. MAIN DESCRIPTION SECTION --- */}
              <motion.section variants={fadeInUp} className="space-y-8">
                <div className="space-y-6">
                  <p className="text-[#0b2230] text-xl md:text-2xl leading-relaxed font-medium">
                    The <span className="text-[#E68736] font-bold">Scan Body from Digident India</span> is precision-engineered to accurately transfer implant position, orientation, and angulation into digital workflows with high fidelity.
                  </p>
                  <p className="text-[#0b2230] text-lg md:text-xl leading-relaxed opacity-90">
                    Designed for compatibility across multiple implant systems, it ensures seamless integration with both intraoral and laboratory scanners, enabling reliable data acquisition for CAD/CAM restorations.
                  </p>
                  <p className="text-[#0b2230] text-lg md:text-xl leading-relaxed opacity-90">
                    Its optimized geometry and surface characteristics are developed to enhance scan readability and minimize reflection artifacts, ensuring <span className="text-[#E68736] font-bold">superior dimensional accuracy</span>. Additionally, the integrated internal threading mechanism securely retains the fixation screw, preventing disengagement during clinical handling or intraoral scanning, thereby improving workflow reliability and consistency.
                  </p>
                </div>
              </motion.section>

              {/* --- 2. TECHNICAL DIAGRAM SECTION --- */}
                <motion.section 
                  variants={fadeInUp}
                  className="bg-white/40 backdrop-blur-md p-6 md:p-20 rounded-[30px] md:rounded-[50px] border border-[#E68736]/40 w-full flex flex-col items-center relative overflow-hidden"
                >
                  <h3 className="text-[#E68736] text-xl md:text-4xl font-black uppercase tracking-tight text-center mb-10 md:mb-20">
                    ScanBody <span className="text-[#0b2230]">Technical Specifications</span>
                  </h3>

                  {/* DIAGRAM CONTAINER: Adjusted height for mobile to maintain the "Desktop Layout" */}
                  <div className="relative w-full max-w-6xl h-[450px] sm:h-[550px] md:h-[700px] flex items-center justify-center">
                    
                    {/* CENTER IMAGE: Scaled for mobile screens */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="z-10 p-2"
                    >
                      <img 
                        src={scanBodyCut} 
                        alt="Scan Body Internal View" 
                        className="h-[300px] sm:h-[450px] md:h-[650px] object-contain drop-shadow-2xl" 
                      />
                    </motion.div>

                    {/* FEATURE 1: Autoclavable (Top Right) */}
                    <div className="absolute z-20 top-[22%] md:top-[25%] right-0 w-[35%] md:w-[45%] flex flex-col items-start">
                      <div className="flex items-center w-full">
                        <motion.div 
                          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E68736] shadow-[0_0_15px_#E68736] flex-shrink-0" 
                        />
                        <motion.div variants={lineAnimation} className="h-[1px] md:h-[2px] bg-[#E68736] shadow-[0_0_8px_rgba(230,135,54,0.5)]" />
                      </div>
                      <motion.div variants={fadeInUp} className="mt-2 md:mt-4 ml-auto pr-8 md:pr-4 text-right">
                        <p className="text-[#0b2230] text-[10px] sm:text-xs md:text-lg font-bold leading-tight">
                          Autoclavable design for safe <br/> reuse and durability
                        </p>
                        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
                      </motion.div>
                    </div>

                    {/* FEATURE 2: High-Precision (Bottom Left) */}
                    <div className="absolute z-20 top-[72%] md:top-[85%] left-0 w-[43%] md:w-[45%] flex flex-col items-end">
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
                          High-precision scan body for <br/> accurate data capture
                        </p>
                        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] mr-auto mt-1 md:mt-2" />
                      </motion.div>
                    </div>

                    {/* FEATURE 3: Anti-Screw-Drop (Center Right) */}
                    <div className="absolute z-20 top-[58%] md:top-[63%] right-0 w-[45%] flex flex-col items-start">
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
                          Anti-screw-drop technology <br/> for secure handling
                        </p>
                        <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
                      </motion.div>
                    </div>
                  </div>
                </motion.section>

              {/* --- 3. DETAILED FEATURES SECTION --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                {/* Autoclavable Detail */}
                <motion.section variants={fadeInUp} className="space-y-4 p-8 rounded-3xl bg-white/30 border border-[#E68736]/40">
                  <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                    Fully Autoclavable
                  </h3>
                  <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                    The scan body is fully autoclavable, allowing it to withstand repeated sterilization cycles without compromising its structural integrity, dimensional accuracy, or surface properties. 
                  </p>
                  <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                    Manufactured using high-quality, medical-grade materials, it ensures long-term durability and compliance with clinical hygiene standards, reducing operational costs while maintaining consistent performance across procedures.
                  </p>
                </motion.section>

                {/* Anti Screw Drop Detail */}
                <motion.section variants={fadeInUp} className="space-y-4 p-8 rounded-3xl bg-white/30 border border-[#E68736]/40">
                  <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                    Anti Screw Drop Technology
                  </h3>
                  <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                    Digident India’s Scan Body incorporates advanced technology through an integrated internal threading design that securely holds the fixation screw within the component.
                  </p>
                  <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                    By minimizing the risk of screw drops inside the patient’s mouth, this feature enhances clinical safety, improves handling efficiency, and reduces procedural interruptions—resulting in a smoother workflow.
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
          <img src={heroImage} alt="Scan Body" className="w-full h-full object-contain" />
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