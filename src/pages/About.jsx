/* eslint-disable no-unused-vars */
// About.jsx — Option 2: Parallax Depth Animation
// Sections 1 & 2 are UNTOUCHED (original code preserved exactly)
// Sections 3 & 4 get parallax + 3D depth animations

import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";

import about1 from "../assets/aboutus/aboutus.webp";
import about2 from "../assets/aboutus/aboutus 1.webp";
import about3 from "../assets/aboutus/aboutus4.webp";
import icon1 from "../assets/aboutus/aboutus1.webp";
import icon2 from "../assets/aboutus/aboutus2.webp";
import icon3 from "../assets/aboutus/aboutus3.webp";

const inView = { once: true, amount: 0.2 };

/* ── Parallax image that moves slower than scroll ── */
const ParallaxImg = ({ src, alt, className, speed = 0.1 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 80}px`, `${speed * 80}px`]);
  return (
    <div ref={ref} className="overflow-hidden rounded-[1rem] w-full h-full">
      <motion.img style={{ y }} src={src} alt={alt} className={`scale-110 ${className}`} />
    </div>
  );
};

/* ── Float in with 3D tilt perspective ── */
const Float3D = ({ children, delay = 0, from = "bottom", className = "" }) => {
  const variants = {
    bottom: { hidden: { opacity: 0, y: 70, rotateX: 10, scale: 0.95 }, visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 } },
    left:   { hidden: { opacity: 0, x: -70, rotateY: -10 },            visible: { opacity: 1, x: 0,  rotateY: 0  } },
    right:  { hidden: { opacity: 0, x: 70,  rotateY: 10  },            visible: { opacity: 1, x: 0,  rotateY: 0  } },
    scale:  { hidden: { opacity: 0, scale: 0.82, rotateX: 8 },         visible: { opacity: 1, scale: 1, rotateX: 0 } },
  };
  return (
    <motion.div
      variants={variants[from]}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Counting Stats Card — counts up from 0 when scrolled into view ── */
const StatCard = ({ val, label, delay = 0 }) => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const numericVal = parseInt(val.replace(/\D/g, ""), 10);
  const suffix = val.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isVisible) return;
    const controls = animate(0, numericVal, {
      duration: 2,
      delay,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(Math.floor(v).toString() + suffix);
      },
    });
    return controls.stop;
  }, [isVisible, numericVal, suffix, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.06, rotateY: 4 }}
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
      className="bg-white p-5 rounded-[1rem] flex flex-col items-center justify-center border border-[#E68736] cursor-default shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <span className="text-xl md:text-2xl font-black text-[#072434]">{display}</span>
      <span className="text-[9px] md:text-[10px] uppercase font-bold text-gray-400 mt-1">{label}</span>
    </motion.div>
  );
};

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <div className="bg-white font-sans text-[#1a2b3b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">

        {/* PAGE TITLE */}
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-12"
          data-aos="fade-down"
        >
          About Us
        </h2>

        {/* ================= SECTION 1 : HERO — UNTOUCHED ================= */}
        <section
          className="relative rounded-2xl py-14 md:py-24 px-6 md:px-20 text-white mb-20 md:mb-20 flex items-center overflow-hidden"
          data-aos="fade-up"
        >
          <div className="relative z-10 max-w-xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
              Empowering the Future <br /> of Dentistry
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed opacity-90">
              As dentistry embraces the digital era, DigiDent India stands at the forefront of innovation.
              We redefine implant accessory manufacturing through digital scanning, CAD/CAM precision,
              and 3D printing technology.
            </p>
          </div>
          <div className="absolute inset-0">
            <img
              src={about1}
              alt="Digital Dentistry Hero"
              className="w-full h-full object-cover object-right"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </section>

        {/* ================= SECTION 2 : IDENTITY — UNTOUCHED ================= */}
        <section className="relative z-20 mb-24 md:mb-32">
          <div
            className="flex flex-col md:flex-row rounded-[1rem]"
            style={{ background: 'linear-gradient(160deg, #f9f0ea, #E68736 100%)' }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="w-full md:w-[45%] flex justify-center md:p-0">
              <div className="md:-mt-36">
                <img
                  src={about2}
                  alt="Innovation"
                  className="
                    rounded-[1rem]
                    w-56 h-64
                    sm:w-64 sm:h-72
                    md:w-102 md:h-[420px]
                    object-cover
                    border-[4px] border-[#E68736]
                    shadow-xl
                  "
                />
              </div>
            </div>
            <div className="w-full md:w-[65%] p-8 md:p-16 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#072434] mb-6 leading-snug">
                <span className="text-[#E68736]">At DigiDent India,</span>{" "}
                innovation isn't optional — it's our identity.
              </h3>
              <div className="space-y-4 text-gray-700 text-sm md:text-base font-medium">
                <p>
                  Digital manufacturing defines the new gold standard in implant dentistry —
                  delivering precision, repeatability, and speed.
                </p>
                <p>
                  Our mission is to make advanced implant accessories accessible through automation,
                  premium materials, and uncompromising engineering.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3 : TEAM — PARALLAX + 3D ================= */}
        <section className="grid md:grid-cols-2 gap-16 mb-20">

          {/* Left: text floats in from left */}
          <Float3D from="left">
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
            >
              <motion.p
                variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.6 }}
                className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-2"
              >
                OUR TEAM
              </motion.p>

              <motion.h2
                variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-4xl font-bold text-[#072434] mb-6"
              >
                Empowering Innovation{" "}
                <span className="text-[#E68736]">Through People</span>
              </motion.h2>

              {/* Icons with 3D hover */}
              <div className="flex flex-wrap gap-10 mb-6 justify-center sm:justify-start">
                {[icon1, icon2, icon3].map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40, rotateX: 18, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -10, scale: 1.08, rotateY: 8, rotateX: -4 }}
                    style={{ transformStyle: "preserve-3d", perspective: 600 }}
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={img} alt=""
                      className="w-full h-full object-contain border-2 border-[#E68736] rounded-xl shadow-md"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="text-gray-500 text-sm sm:text-base"
              >
                Every DigiDent component begins with a dedicated team — engineers,
                designers, and innovators setting new benchmarks.
              </motion.p>
            </motion.div>
          </Float3D>

          {/* Right: parallax image floats in from right */}
          <Float3D from="right" delay={0.12} className="flex justify-center md:justify-end">
            <div className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[550px]">
              <motion.div
                whileHover={{ scale: 1.03, rotateY: -4 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d", perspective: 800 }}
                className="rounded-[1rem] overflow-hidden border-[4px] border-[#E68736] shadow-xl"
              >
                <ParallaxImg
                  src={about3}
                  alt="Our Team"
                  className="w-full aspect-[600/450] object-cover"
                  speed={0.08}
                />
              </motion.div>
            </div>
          </Float3D>
        </section>

        {/* ================= SECTION 4 : STATS + CTA — 3D DEPTH ================= */}
        <Float3D from="bottom" delay={0.05}>
          <section
            className="rounded-[1rem] p-6 md:p-12 flex flex-col lg:flex-row gap-12 items-center"
            style={{ background: 'linear-gradient(160deg, #F7E6DC, #E68736 100%)' }}
          >
            {/* Stats grid */}
            <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {[
                { val: "2010", label: "Founding Year" },
                { val: "2000", label: "Happy Customers" },
                { val: "190",  label: "Company Work" },
                { val: "750",  label: "Projects Completed" },
                { val: "21",   label: "Team Members" },
                { val: "02",   label: "Offices" },
              ].map((s, i) => (
                <StatCard key={i} val={s.val} label={s.label} delay={i * 0.08} />
              ))}
            </div>

            {/* CTA floats in from right */}
            <Float3D from="right" delay={0.25} className="lg:w-1/2">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ delay: 0.3 }}
                className="font-bold text-[#072434] mb-3"
              >
                Why Choose <span className="text-[#E68736]">DigiDent?</span>
              </motion.p>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl md:text-3xl font-bold text-[#072434] mb-8"
              >
                Trusted by <span className="text-[#072434]">Experts</span>, Proven by{" "}
                <span className="text-[#072434]">Results</span>
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, scale: 0.93, rotateX: 8 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={inView}
                transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: "preserve-3d", perspective: 700 }}
                className="bg-white p-5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between border-2 border-[#E68736]"
              >
                <div className="text-center sm:text-left">
                  <p className="font-bold text-sm">Have Any Questions?</p>
                  <p className="text-[11px] text-gray-400">Don't hesitate to contact us</p>
                </div>
                <a href="/contact" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.07, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full sm:w-auto text-[#072434] px-8 py-3 rounded-[1rem] text-xs font-bold transition"
                    style={{ background: 'linear-gradient(160deg, #F7E6DC, #f6811b 100%)' }}
                  >
                    Contact Us
                  </motion.button>
                </a>
              </motion.div>
            </Float3D>
          </section>
        </Float3D>

      </div>
    </div>
  );
}