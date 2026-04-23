/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import curaVexIcon from '../../assets/home/feature1.webp';
import manufacturingIcon from '../../assets/home/feature2.webp';
import zirConIcon from '../../assets/home/feature3.webp';
import "../../pages/HomeNew.css";

/* ─── Single Flip Card ─── */
const FlipCard = ({ feature, index }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer"
      style={{ perspective: '1200px', minHeight: '440px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Card wrapper – rotates on hover */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '440px',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >

        {/* ── FRONT FACE ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div
            className="w-full h-full rounded-[2rem] flex flex-col items-center justify-between p-8"
            style={{
              background: 'linear-gradient(160deg, #ffffff 0%, #fff8f2 100%)',
              border: '1.5px solid rgba(241,135,48,0.18)',
              boxShadow: '0 6px 40px rgba(241,135,48,0.08), 0 2px 12px rgba(0,0,0,0.05)',
              minHeight: '440px',
            }}
          >
            {/* Number + hover hint */}
            <div className="w-full flex justify-between items-center mb-2">
              <span
                className="text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ color: 'rgba(241,135,48,0.5)', fontFamily: "'DM Mono', monospace" }}
              >
                0{index + 1}
              </span>
              
            </div>

            {/* Floating icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex-1 flex items-center justify-center w-full"
              style={{ maxHeight: '220px' }}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 130, height: 130,
                    background: 'radial-gradient(circle, rgba(241,135,48,0.18) 0%, transparent 70%)',
                    filter: 'blur(16px)',
                  }}
                />
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="relative object-contain"
                  style={{
                    maxHeight: 160,
                    maxWidth: '100%',
                    filter: 'drop-shadow(0 8px 20px rgba(241,135,48,0.22))',
                  }}
                />
              </div>
            </motion.div>

            {/* Title block */}
            <div className="w-full mt-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[1px] w-8 rounded-full bg-gradient-to-r from-transparent to-[#f18730] opacity-40" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#f18730] opacity-60" />
                <div className="h-[1px] w-8 rounded-full bg-gradient-to-l from-transparent to-[#f18730] opacity-40" />
              </div>
              <h4
                className="font-bold text-[24px] mb-1"
                style={{ color: '#f18730', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.01em' }}
              >
                {feature.title}
              </h4>
              {feature.subtitle && (
                <p
                  className="text-[12px] uppercase tracking-[0.18em] font-semibold"
                  style={{ color: '#1a2b3b', fontFamily: "'DM Mono', monospace" }}
                >
                  {feature.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className="w-full h-full rounded-[2rem] flex flex-col justify-between p-8"
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #E68736 100%)',
              border: '1.5px solid rgba(241,135,48,0.35)',
              boxShadow: '0 0 50px rgba(241,135,48,0.20), 0 8px 40px rgba(0,0,0,0.25)',
              minHeight: '440px',
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #f18730, transparent)' }}
            />

            {/* Badge */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#f18730] animate-pulse" />
              <span
                className="text-[14px] uppercase tracking-[0.25em] font-bold"
                style={{ color: 'rgba(255, 129, 26, 0.7)', fontFamily: "'DM Mono', monospace" }}
              >
                0{index + 1} — Details
              </span>
            </div>

            {/* Watermark icon */}
            <div
              className="absolute bottom-0 right-0 pointer-events-none overflow-hidden rounded-br-[2rem]"
              style={{ opacity: 0.06 }}
            >
              <img src={feature.icon} alt="" style={{ width: 160, height: 160, objectFit: 'contain' }} />
            </div>

            {/* Description */}
            <div className="flex-1 flex flex-col justify-center py-4">
              <h4
                className="font-bold text-[26px] mb-3 leading-tight"
                style={{ color: '#fd821d', fontFamily: "'Syne', sans-serif" }}
              >
                {feature.title}
              </h4>
              {feature.subtitle && (
                <p
                  className="text-[14px] uppercase tracking-[0.1em] mb-4 font-bold"
                  style={{ color: 'rgba(0, 0, 0, 0.45)', fontFamily: "'DM Mono', monospace" }}
                >
                  {feature.subtitle}
                </p>
              )}
              <div
                className="w-12 h-[2px] rounded-full mb-5"
                style={{ background: 'linear-gradient(90deg, #fa770c, transparent)' }}
              />
              <p
                className="text-[15px] leading-[1.8] font-semibold"
                style={{ color: 'rgba(0, 0, 0, 0.75)', fontFamily: "'DM Sans', sans-serif" }}
              >
                {feature.description}
              </p>
            </div>

            {/* Bottom brand line */}
            <div className="flex items-center gap-2 mt-2">
              <div
                className="h-[2px] flex-1 rounded-full"
                style={{ background: 'linear-gradient(90deg, rgba(251, 120, 13, 0.5), transparent)' }}
              />
              <span
                className="text-[10px] uppercase tracking-widest"
                style={{ color: 'rgba(57, 26, 1, 0.5)', fontFamily: "'DM Mono', monospace" }}
              >
                Digident India
              </span>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

/* ─── Main Section ─── */
const FeaturesSection = () => {
  const features = [
    {
      title: "CuraVex™",
      subtitle: "Angulated Technology :",
      description:
        "Developed in-house, our Angulated Screw Technology enables precise control of screw angulation, improving prosthetic accuracy and ensuring consistent restorative performance.",
      icon: manufacturingIcon,
    },
    {
      title: "Precise Manufacturing",
      subtitle: "",
      description:
        "Backed by advanced manufacturing and strict quality controls, our precision-driven processes deliver reliable, repeatable, and clinically accurate dental solutions.",
      icon: curaVexIcon,
    },
    {
      title: "ZirCon™",
      subtitle: "Coating Enhances :",
      description:
        "ZirCon coating enhances surface integrity and durability, ensuring consistent performance and extended service life in clinical applications.",
      icon: zirConIcon,
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=DM+Mono:wght@500&display=swap');
      `}</style>

      <section className=" py-20 overflow-hidden relative">

        {/* Soft ambient bg tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(241,135,48,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="responsive-container relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            
            <h2
              className="text-[34px] md:text-[42px] font-bold text-[#1a2b3b] mb-4 leading-tight"
              style={{  letterSpacing: '-0.02em' }}
            >
              Designed,{' '}
              <span className="text-[#f18730]">Manufactured</span>, and Perfected{' '}
              <span className="text-[#f18730]">by Experts</span>
            </h2>

          </motion.div>

          {/* Flip Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {features.map((feature, index) => (
              <FlipCard key={index} feature={feature} index={index} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default FeaturesSection;