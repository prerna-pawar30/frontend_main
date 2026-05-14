/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../../api/ApiService";
import "../../pages/HomeNew.css";

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

const ToothWatermark = () => (
  <svg width="60" height="80" viewBox="0 0 64 80" fill="none" opacity="0.1" className="md:w-20 md:h-24">
    <path
      d="M32 4C22 4 14 10 12 20C10 28 12 34 14 40C16 48 15 56 16 64C16.5 68 18 72 22 72C26 72 27 68 28 64C29 60 30 56 32 56C34 56 35 60 36 64C37 68 38 72 42 72C46 72 47.5 68 48 64C49 56 48 48 50 40C52 34 54 28 52 20C50 10 42 4 32 4Z"
      fill="#E68736"
    />
  </svg>
);

const BrandCard = ({ brand, idx }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.03 }}
      className="relative cursor-pointer w-full h-[70px] sm:h-[80px] md:h-[90px]"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(!flipped)} // Better for touch devices
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full rounded-xl md:rounded-2xl bg-white flex items-center gap-2 md:gap-3 px-3 md:px-5 border border-gray-100">
            <div
              className="flex-shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-white text-[10px] md:text-[11px] font-bold"
              style={{ background: 'linear-gradient(135deg, #f6d1b2, #e06b10)' }}
            >
              ✓
            </div>
            <div className="flex items-baseline gap-[1px] min-w-0 overflow-hidden">
              <span className="text-xs sm:text-sm md:text-base font-bold truncate text-[#011632]">
                {brand.brandName}
              </span>
              <span className="text-[8px] md:text-[10px] font-bold flex-shrink-0">®</span>
            </div>
            <svg className="ml-auto flex-shrink-0 opacity-20 hidden xs:block" width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#E68736" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)' 
          }}
        >
          <a
            href={`${SHOP_BASE_URL}/all-products?brand=${brand._id}`}
            onClick={(e) => e.stopPropagation()}
            className="block w-full h-full rounded-xl md:rounded-2xl bg-white border-2 border-orange-200/50 shadow-lg overflow-hidden"
          >
            <div className="absolute bottom-0 right-1 pointer-events-none">
              <ToothWatermark />
            </div>
            <div className="w-full h-full flex items-center justify-between px-3 md:px-5 gap-2">
              <div className="min-w-0">
                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter md:tracking-widest text-gray-500">Explore</p>
                <p className="text-xs md:text-sm font-bold truncate text-black">{brand.brandName}</p>
              </div>
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1c2a3b] flex items-center justify-center border border-white/20">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Brands() {
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await apiService.getBrandLogos();
        setBrandData(res.data?.data?.brands || []);
      } catch (err) {
        setBrandData([]);
      }
    };
    fetchBrands();
  }, []);

  return (
    <section className="py-8 md:py-16 overflow-hidden relative">
      <div className="px-4 sm:px-6 lg:max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1a2b3b] leading-tight">
            Let's Begin with the <br className="xs:hidden" />
            <span className="text-[#E68736]">Brand You Use</span>
          </h2>
        </div>

        {/* Main Container */}
        <div
          className="rounded-[1.5rem] md:rounded-[2.5rem] p-4 sm:p-8 md:p-10 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            border: '1px solid rgba(230,135,54,0.2)',
          }}
        >
          {/* Dot Grid Pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(230,135,54,0.1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {brandData.map((brand, idx) => (
              <BrandCard key={brand.brandId || brand._id} brand={brand} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}