/* eslint-disable no-unused-vars */
"use client";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Assets
import screwMain from "../../assets/products/screw1.png";
import screwTechCutout from "../../assets/products/screw2.png";

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

export default function Products() {
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
          HERO SECTION — two-column: left text | right rotating image
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
              Next-Gen Implant Fastening
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-[#E68736] text-5xl md:text-4xl font-black uppercase tracking-tight leading-none"
            >
              Next-Gen{" "}
              <span className="text-[#0b2230]">Captive</span>
              <br />
              <span className="text-[#0b2230]">Screw</span>
            </motion.h1>

            <motion.div variants={fadeInUp} className="space-y-3">
              <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                The{" "}
                <span className="text-[#E68736] font-bold">
                  Next-Gen Captive Screw
                </span>{" "}
                is an advanced fastening solution engineered to redefine
                precision and efficiency in implant workflows.
              </p>
              <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                Its innovative screw-top architecture eliminates the need for a
                conventional screwdriver and removes the traditional screw
                access hole entirely, significantly{" "}
                <span className="text-[#E68736] font-bold">
                  enhancing both aesthetics and functionality
                </span>
                .
              </p>
              <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                Designed to work seamlessly with all major dental
                materials—including metal, zirconia, PEEK, and temporary
                materials—it ensures total versatility across a wide range of
                clinical and laboratory applications.
              </p>
            </motion.div>

            {/* Quick spec pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              {[
                "No Screwdriver Needed",
                "No Screw Access Hole",
                "Metal / Zirconia / PEEK",
                "PVD Coated Option",
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

          {/* RIGHT: Image with orbit rings — image is static, rings animate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex items-center justify-center h-[420px] md:h-[500px]"
          >
            {/* Decorative background circle */}
            <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full bg-[#E68736]/5 border border-[#E68736]/10" />

            {/* Orbit ring 1 — clockwise, dashed */}
            <motion.div
              className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-[#E68736]/25"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
            >
              {/* Dot on ring */}
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#E68736] shadow-[0_0_12px_#E68736]/60 flex items-center justify-center">
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

            {/* Inner ring — static */}
            <div className="absolute w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full border border-[#E68736]/15" />

            {/* ---- MAIN PRODUCT IMAGE — static ---- */}
            <div className="relative z-10">
              <img
                src={screwMain}
                alt="Next-Gen Captive Screw"
                className="w-[200px] h-[200px] md:w-[360px] md:h-[360px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Floating feature chips — these do NOT rotate */}
            <div className="absolute top-[10%] right-0 z-20">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="bg-white border border-[#E68736]/30 rounded-xl px-3 py-2 shadow-md text-right"
              >
                <p className="text-[#0b2230] text-[11px] font-bold leading-tight">
                  No Screwdriver Needed
                </p>
                <div className="h-0.5 w-10 bg-[#E68736] ml-auto mt-1" />
                <span className="flex items-center justify-end gap-1 mt-0.5">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 rounded-full bg-[#E68736]"
                  />
                </span>
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
                  Metal · Zirconia · PEEK
                </p>
                <div className="h-0.5 w-10 bg-[#E68736] mt-1" />
                <span className="flex items-center gap-1 mt-0.5">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="w-2 h-2 rounded-full bg-[#E68736]"
                  />
                </span>
              </motion.div>
            </div>

            <div className="absolute bottom-[8%] right-[2%] z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="bg-white border border-[#E68736]/30 rounded-xl px-3 py-2 shadow-md text-right"
              >
                <p className="text-[#0b2230] text-[11px] font-bold leading-tight">
                  No Screw Access Hole
                </p>
                <div className="h-0.5 w-10 bg-[#E68736] ml-auto mt-1" />
                <span className="flex items-center justify-end gap-1 mt-0.5">
                  <motion.span
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    className="w-2 h-2 rounded-full bg-[#E68736]"
                  />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          TECHNICAL DIAGRAM SECTION
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
            {/* Subtle background decoration */}
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#E68736]/5 pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#0b2230]/3 pointer-events-none" />

            <h3 className="text-[#E68736] text-2xl md:text-4xl font-black uppercase tracking-tight mb-10 text-center relative z-10">
              Screw{" "}
              <span className="text-[#0b2230]">Technical Specifications</span>
            </h3>

            <div className="relative w-full max-w-6xl h-[450px] md:h-[600px] flex items-center justify-center">

              {/* CENTER IMAGE — static, scale-in on scroll */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="z-10 p-2"
              >
                <img
                  src={screwTechCutout}
                  alt="Captive Screw Technical Detail"
                  className="h-[280px] md:h-[450px] object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* FEATURE 1: No Driver Needed (Top Right) */}
              <div className="absolute z-20 top-[32%] md:top-[35%] right-0 w-[40%] md:w-[45%] flex flex-col items-start">
                <div className="flex items-center w-full">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E68736] shadow-[0_0_15px_#E68736] flex-shrink-0"
                  />
                  <motion.div
                    variants={lineAnimation}
                    className="h-[1px] md:h-[2px] bg-[#E68736] shadow-[0_0_8px_rgba(230,135,54,0.5)]"
                  />
                </div>
                <motion.div
                  variants={fadeInUp}
                  className="mt-2 md:mt-4 ml-auto pr-2 md:pr-4 text-right"
                >
                  <p className="text-[#0b2230] text-[10px] sm:text-xs md:text-lg font-bold leading-tight">
                    Innovative design eliminates{" "}
                    <br className="hidden md:block" /> the need for a
                    screwdriver
                  </p>
                  <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
                </motion.div>
              </div>

              {/* FEATURE 2: Universal Compatibility (Center Left) */}
              <div className="absolute z-20 top-[45%] md:top-[45%] left-0 w-[25%] md:w-[35%] flex flex-col items-end">
                <div className="flex items-center w-full justify-end">
                  <motion.div
                    variants={lineAnimation}
                    className="h-[1px] md:h-[2px] bg-[#E68736] shadow-[0_0_8px_rgba(230,135,54,0.5)]"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E68736] shadow-[0_0_15px_#E68736] flex-shrink-0"
                  />
                </div>
                <motion.div
                  variants={fadeInUp}
                  className="mt-2 md:mt-4 mr-auto pl-2 md:pl-4 text-left"
                >
                  <p className="text-[#0b2230] text-[10px] sm:text-xs md:text-lg font-bold leading-tight">
                    Compatible with Metal,{" "}
                    <br className="hidden md:block" /> Zirconia, PEEK &
                    Temporaries
                  </p>
                  <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] mr-auto mt-1 md:mt-2" />
                </motion.div>
              </div>

              {/* FEATURE 3: Aesthetics (Bottom Right) */}
              <div className="absolute z-20 top-[70%] md:top-[63%] right-0 w-[48%] md:w-[45%] flex flex-col items-start">
                <div className="flex items-center w-full">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                    className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E68736] shadow-[0_0_15px_#E68736] flex-shrink-0"
                  />
                  <motion.div
                    variants={lineAnimation}
                    className="h-[1px] md:h-[2px] bg-[#E68736] shadow-[0_0_8px_rgba(230,135,54,0.5)]"
                  />
                </div>
                <motion.div
                  variants={fadeInUp}
                  className="mt-2 md:mt-4 ml-auto pr-2 md:pr-4 text-right"
                >
                  <p className="text-[#0b2230] text-[10px] sm:text-xs md:text-lg font-bold leading-tight">
                    No screw access hole{" "}
                    <br className="hidden md:block" /> for superior aesthetic
                    results
                  </p>
                  <div className="h-[2px] md:h-1 w-12 md:w-20 bg-[#E68736] ml-auto mt-1 md:mt-2" />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* ============================================================
              DETAILED FEATURES SECTION
          ============================================================ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">

            {/* Premium Finishes */}
            <motion.section
              variants={fadeInUp}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(230,135,54,0.12)" }}
              className="space-y-4 p-8 rounded-3xl bg-white border border-[#E68736]/20 shadow-sm transition-shadow duration-300"
            >
              {/* Icon accent */}
              <div className="w-10 h-10 rounded-xl bg-[#E68736]/10 flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E68736" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
              </div>
              <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                Premium Finishes
              </h3>
              <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                Available in Standard and PVD-coated finishes to provide secure
                fixation and exceptional wear resistance.
              </p>
              <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                The specialized PVD coating reduces friction and enhances the
                longevity of the connection, ensuring that clinical results
                remain consistent even under high-load conditions.
              </p>
            </motion.section>

            {/* Streamlined Workflow */}
            <motion.section
              variants={fadeInUp}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(230,135,54,0.12)" }}
              className="space-y-4 p-8 rounded-3xl bg-white border border-[#E68736]/20 shadow-sm transition-shadow duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E68736]/10 flex items-center justify-center mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E68736" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 className="text-[#E68736] text-2xl font-black uppercase tracking-widest">
                Streamlined Workflow
              </h3>
              <p className="text-[#0b2230] text-lg leading-relaxed font-medium">
                Simplifies both laboratory and clinical procedures by removing
                traditional mechanical constraints.
              </p>
              <p className="text-[#0b2230] text-base leading-relaxed opacity-80">
                Technicians and clinicians benefit from a faster, more
                predictable assembly process, leading to improved efficiency
                and overall patient treatment outcomes.
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