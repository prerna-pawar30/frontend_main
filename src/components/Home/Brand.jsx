/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../../api/ApiService";
import "../../pages/HomeNew.css";

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

/* ─── Tooth SVG watermark for back face ─── */
const ToothWatermark = () => (
  <svg width="80" height="100" viewBox="0 0 64 80" fill="none" opacity="0.15">
    <path
      d="M32 4C22 4 14 10 12 20C10 28 12 34 14 40C16 48 15 56 16 64C16.5 68 18 72 22 72C26 72 27 68 28 64C29 60 30 56 32 56C34 56 35 60 36 64C37 68 38 72 42 72C46 72 47.5 68 48 64C49 56 48 48 50 40C52 34 54 28 52 20C50 10 42 4 32 4Z"
      fill="#E68736"
    />
  </svg>
);

/* ─── Single Brand Flip Card ─── */
const BrandCard = ({ brand, idx }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer"
      style={{ perspective: '1000px', minHeight: '90px', height: '90px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >

        {/* ── FRONT: Brand Name ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div
            className="w-full h-full rounded-2xl flex items-center gap-3 px-4 sm:px-5"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)',
              // border: '1.5px solid rgba(230,135,54,0.15)',
              // boxShadow: '0 2px 16px rgba(230,135,54,0.07), 0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            {/* Checkmark badge */}
            <div
              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-sm"
              style={{ background: 'linear-gradient(135deg, #f6d1b2, #e06b10)' }}
            >
              ✓
            </div>

            {/* Brand name */}
            <div className="flex items-baseline gap-[2px] overflow-hidden min-w-0">
              <span
                className="text-sm sm:text-base font-bold truncate"
                style={{ color: '#011632' }}
              >
                {brand.brandName}
              </span>
              <span
                className="text-[10px] font-bold flex-shrink-0"
                style={{ color: '#000000', fontFamily: "'DM Sans', sans-serif" }}
              >
                ®
              </span>
            </div>

            {/* Subtle right arrow hint */}
            <svg
              className="ml-auto flex-shrink-0 opacity-30"
              width="14" height="14" viewBox="0 0 24 24" fill="none"
            >
              <path d="M9 18l6-6-6-6" stroke="#E68736" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── BACK: solid bright orange — clearly visible on dark container ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <a
            href={`${SHOP_BASE_URL}/all-products?brand=${brand._id}`}
            onClick={(e) => e.stopPropagation()}
            className="block w-full h-full rounded-2xl overflow-hidden no-underline"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 55%, #ffffff 100%)',
              border: '2px solid rgba(255,255,255,0.2)',
              boxShadow: '0 0 28px rgba(230,135,54,0.7), 0 4px 20px rgba(0,0,0,0.35)',
              position: 'relative',
            }}
          >
            {/* Top shine */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)' }}
            />

            {/* Watermark */}
            <div className="absolute bottom-0 right-2 pointer-events-none">
              <ToothWatermark />
            </div>

            {/* Content */}
            <div className="w-full h-full flex items-center justify-between px-4 sm:px-5 gap-2">
              <div className="min-w-0">
                <p
                  className="text-[11px] mb-0.5 font-bold uppercase tracking-widest"
                  style={{ color: 'rgba(0, 0, 0, 0.75)', fontFamily: "'DM Mono', monospace" }}
                >
                  Explore
                </p>
                <p className="text-[15px] font-bold truncate leading-tight" style={{ color: '#000000' }}>
                  {brand.brandName}
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px' }}>®</span>
                </p>
              </div>

              {/* Arrow button */}
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: '#1c2a3b',
                  border: '1.5px solid rgba(255,255,255,0.45)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>
        </div>

      </motion.div>
    </motion.div>
  );
};

/* ─── Main Brands Section ─── */
export default function Brands() {
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await apiService.getBrandLogos();
        setBrandData(res.data?.data?.brands || []);
      } catch (err) {
        console.error("Failed to load brands", err);
        setBrandData([]);
      }
    };
    fetchBrands();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=DM+Mono:wght@500&display=swap');
      `}</style>

      <section className="py-13 overflow-hidden relative">

        {/* Ambient top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          
        />

        <div className="responsive-container relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-[#1a2b3b]"
              style={{ letterSpacing: '-0.02em' }}
            >
              Let's Begin with the{" "}
              <span className="text-[#E68736]">Brand You Use</span>
            </h2>
          </motion.div>

          {/* Cards container — dark slate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-[2.5rem] p-6 sm:p-10 relative"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
              border: '1.5px solid rgba(230,135,54,0.2)',
              // boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Subtle inner dot pattern */}
            <div
              className="absolute inset-0 rounded-[2.5rem] pointer-events-none overflow-hidden"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(230,135,54,0.06) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Orange top accent line */}
            <div
              className="absolute top-0 left-[10%] right-[10%] h-[1px] rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(230,135,54,0.5), transparent)' }}
            />

            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {brandData.map((brand, idx) => (
                <BrandCard
                  key={brand.brandId || brand._id}
                  brand={brand}
                  idx={idx}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}