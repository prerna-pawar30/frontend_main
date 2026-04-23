/* eslint-disable no-unused-vars */
"use client";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Assets
import scanBodyMain from "../../assets/products/scanbody1.webp";
import scanBodyTech from "../../assets/products/scanbody2.png";

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const lineAnimation = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "100%",
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut", delay: 0.4 },
  },
};

export default function ScanBody() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-16 overflow-x-hidden">

      {/* --- BACK BUTTON --- */}
      <div className="w-full max-w-6xl px-6 mb-8 flex justify-start">
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-[#E68736] font-bold hover:text-[#0b2230] transition-colors"
        >
          <FiArrowLeft size={24} />
          <span>Back to Products</span>
        </motion.button>
      </div>

      {/* ============================================================
          HERO SECTION
      ============================================================ */}
      <div className="w-full max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[520px] mb-20">

          {/* LEFT: Title + description */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 w-fit bg-[#E68736]/10 border border-[#E68736]/30 text-[#E68736] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E68736] inline-block" />
              Digital Impression System
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-[#E68736] text-5xl md:text-4xl font-black uppercase tracking-tight leading-none"
            >
              <span className="text-[#E68736]">Scan Body</span>
              <br />
              <span className="text-[#0b2230]">Technology</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="space-y-3">
              <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                The{" "}
                <span className="text-[#E68736] font-bold">
                  DigiDent India Scan Body
                </span>{" "}
                is precision-engineered to accurately transfer implant positions 
                into digital workflows with high fidelity.
              </p>
              <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                Designed for seamless integration with intraoral and laboratory scanners, 
                our system optimizes geometry and surface characteristics to eliminate 
                reflection artifacts and ensure micro-level dimensional accuracy.
              </p>
            </motion.div>

            {/* Quick spec pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              {[
                "High Scan Fidelity",
                "Anti-Reflection Surface",
                "Autoclavable Ti-Grade",
                "Anti-Screw-Drop Tech",
                "Universal Compatibility",
              ].map((s) => (
                <span
                  key={s}
                  className="text-xs font-semibold text-[#E68736] bg-[#E68736]/10 border border-[#E68736]/20 px-3 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`${SHOP_BASE_URL}/all-products`}
                className="inline-flex items-center gap-3 bg-[#E68736] text-white px-7 py-3.5 rounded-2xl font-bold text-base shadow-lg hover:bg-[#d4762c] transition-colors"
              >
                <FiShoppingCart size={20} />
                Shop Now
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Static image with orbit rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex items-center justify-center h-[420px] md:h-[500px]"
          >
            {/* Decorative background circle */}
            <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-[#E68736]/5 border border-[#E68736]/10" />

            {/* Orbit ring 1 — clockwise */}
            <motion.div
              className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-[#E68736]/25"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
            >
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#E68736] shadow-[0_0_12px_rgba(230,135,54,0.6)] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            </motion.div>

            {/* Orbit ring 2 — counter-clockwise */}
            <motion.div
              className="absolute w-[260px] h-[260px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-[#0b2230]/15"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
            >
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1.5 w-3 h-3 rounded-full bg-[#0b2230]/30" />
            </motion.div>

            {/* MAIN PRODUCT IMAGE */}
            <div className="relative z-10">
              <img
                src={scanBodyMain}
                alt="Scan Body Product"
                className="w-[200px] h-[200px] md:w-[360px] md:h-[360px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating feature chips */}
            <div className="absolute top-[10%] right-0 z-20">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="bg-white border border-[#E68736]/30 rounded-xl px-3 py-2 shadow-md text-right"
              >
                <p className="text-[#0b2230] text-[11px] font-bold leading-tight">
                  High Fidelity Capture
                </p>
                <div className="h-0.5 w-10 bg-[#E68736] ml-auto mt-1" />
              </motion.div>
            </div>

            <div className="absolute bottom-[18%] left-0 z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="bg-white border border-[#E68736]/30 rounded-xl px-3 py-2 shadow-md"
              >
                <p className="text-[#0b2230] text-[11px] font-bold leading-tight">
                  Anti-Screw-Drop
                </p>
                <div className="h-0.5 w-10 bg-[#E68736] mt-1" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          TECHNICAL DIAGRAM + FEATURES
      ============================================================ */}
      <div className="w-full max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="space-y-20"
        >
          <motion.section
            variants={fadeInUp}
            className="bg-white/70 backdrop-blur-md p-6 md:p-20 rounded-[30px] md:rounded-[50px] border border-[#E68736]/40 w-full flex flex-col items-center relative overflow-hidden shadow-sm"
          >
            <h3 className="text-[#E68736] text-2xl md:text-4xl font-black uppercase tracking-tight mb-10 text-center relative z-10">
              Scan Body{" "}
              <span className="text-[#0b2230]">Technical Specifications</span>
            </h3>

            <div className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center">
              {/* CENTER IMAGE */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="z-10 p-2"
              >
                <img
                  src={scanBodyTech}
                  alt="Scan Body Technical View"
                  className="h-[320px] md:h-[450px] object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* SPEC 1: Autoclavable */}
              <div className="absolute z-20 top-[35%] md:top-[40%] right-0 w-[28%] md:w-[45%] flex flex-col items-start">
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
                    Medical Grade Ti-Grade 5 <br /> Fully Autoclavable
                  </p>
                  <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
                </motion.div>
              </div>

              {/* SPEC 2: Anti-Reflection */}
              <div className="absolute z-20 top-[45%] md:top-[50%] left-0 w-[45%] md:w-[43%] flex flex-col items-end">
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
                    Optimized Matte Surface <br /> Anti-Reflection Coating
                  </p>
                  <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] mr-auto mt-1 md:mt-2" />
                </motion.div>
              </div>

              {/* SPEC 3: Screw Tech */}
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
                    Integrated Threading <br /> Anti-Screw-Drop Technology
                  </p>
                  <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* DETAILED FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <motion.section
              variants={fadeInUp}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(230,135,54,0.12)" }}
              className="space-y-4 p-8 rounded-3xl bg-white border border-[#E68736]/20 shadow-sm transition-shadow duration-300"
            >
              <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                Safe Handle System
              </h3>
              <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                The integrated internal threading mechanism securely retains the fixation screw during clinical handling.
              </p>
              <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                This significantly improves handling efficiency and patient safety by preventing accidental disengagement of the screw during intraoral scanning and placement.
              </p>
            </motion.section>

            <motion.section
              variants={fadeInUp}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(230,135,54,0.12)" }}
              className="space-y-4 p-8 rounded-3xl bg-white border border-[#E68736]/20 shadow-sm transition-shadow duration-300"
            >
              <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                Digital Fidelity
              </h3>
              <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                Engineered for maximum scan readability across all leading CAD/CAM software and laboratory scanners.
              </p>
              <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                The sharp edges and precise geometry ensure the software identifies the exact implant orientation, reducing the margin of error in final restorative outcomes.
              </p>
            </motion.section>
          </div>

          {/* Bottom Shop CTA */}
          <div className="flex justify-center pb-10">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`${SHOP_BASE_URL}/all-products`}
              className="group bg-[#E68736] text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl hover:bg-[#d4762c] flex items-center gap-4 transition-colors"
            >
              <FiShoppingCart size={24} />
              <span>Shop Now</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}