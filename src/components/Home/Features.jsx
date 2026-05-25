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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer w-full"
      style={{ perspective: '1200px', minHeight: '440px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Card wrapper – rotates on hover */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '440px',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── FRONT FACE — Clear White Minimalistic ── */}
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
              background: 'linear-gradient(135deg, #f7faff 0%, #ffffff 50%, #ffffff 100%)',
              border: '2.5px solid rgba(230, 135, 54, 0.2)',
              minHeight: '440px',
              position: 'relative',
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-[15%] right-[15%] h-[1px] rounded-full pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(230,135,54,0.4), transparent)' }}
            />

            {/* Number */}
            <div className="w-full flex justify-between items-center mb-2">
              <span
                className="text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ color: 'rgba(230,135,54,0.7)' }}
              >
                0{index + 1}
              </span>
            </div>

            {/* Floating icon */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.2 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex-1 flex items-center justify-center w-full"
              style={{ maxHeight: '200px' }}
            >
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 130, height: 130,
                    background: 'radial-gradient(circle, rgba(230,135,54,0.15) 0%, transparent 70%)',
                    filter: 'blur(16px)',
                  }}
                />
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="relative object-contain max-h-[180px] w-auto mx-auto"
                  style={{
                    filter: 'drop-shadow(0 8px 20px rgba(230,135,54,0.25))',
                  }}
                />
              </div>
            </motion.div>

            {/* Title block */}
            <div className="w-full mt-4 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-[1px] w-6 rounded-full bg-gradient-to-r from-transparent to-[#E68736] opacity-40" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#E68736] opacity-60" />
                <div className="h-[1px] w-6 rounded-full bg-gradient-to-l from-transparent to-[#E68736] opacity-40" />
              </div>
              <h4
                className="font-bold text-[22px] md:text-[24px] mb-1 text-slate-900"
                style={{ letterSpacing: '-0.01em' }}
              >
                {feature.title}
              </h4>
              {feature.subtitle && (
                <p
                  className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-400"
                >
                  {feature.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── BACK FACE — Deep Premium Slate Blue ── */}
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
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #2d1a0a 100%)',
              border: '1.5px solid rgba(230,135,54,0.4)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
              minHeight: '440px',
              position: 'relative',
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #E68736, transparent)' }}
            />

            {/* Badge */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E68736] animate-pulse" />
              <span
                className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#E68736]"
              >
                0{index + 1} — Details
              </span>
            </div>

            {/* Watermark icon */}
            <div
              className="absolute bottom-4 right-4 pointer-events-none overflow-hidden rounded-br-[2rem]"
              style={{ opacity: 0.05 }}
            >
              <img src={feature.icon} alt="" style={{ width: 140, height: 140, objectFit: 'contain' }} />
            </div>

            {/* Description */}
            <div className="flex-1 flex flex-col justify-center py-2">
              <h4 className="font-bold text-[24px] mb-2 leading-tight text-[#E68736]">
                {feature.title}
              </h4>
              {feature.subtitle && (
                <p className="text-[12px] uppercase tracking-[0.1em] mb-3 font-bold text-slate-400">
                  {feature.subtitle}
                </p>
              )}
              <div
                className="w-10 h-[2px] rounded-full mb-4"
                style={{ background: 'linear-gradient(90deg, #E68736, transparent)' }}
              />
              <p className="text-[14px] md:text-[15px] leading-[1.7] font-medium text-slate-300">
                {feature.description}
              </p>
            </div>

            {/* Bottom brand line */}
            <div className="flex items-center gap-2 pt-2">
              <div
                className="h-[1px] flex-1 rounded-full"
                style={{ background: 'linear-gradient(90deg, rgba(230,135,54,0.4), transparent)' }}
              />
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
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
      subtitle: "Angulated Technology",
      description:
        "Developed in-house, our Angulated Screw Technology enables precise control of screw angulation, improving prosthetic accuracy and ensuring consistent restorative performance.",
      icon: manufacturingIcon,
    },
    {
      title: "Precise Manufacturing",
      subtitle: "Engineered Excellence",
      description:
        "Backed by advanced manufacturing and strict quality controls, our precision-driven processes deliver reliable, repeatable, and clinically accurate dental solutions.",
      icon: curaVexIcon,
    },
    {
      title: "ZirCon™",
      subtitle: "Advanced Surface Coating",
      description:
        "ZirCon coating enhances surface integrity and durability, ensuring consistent performance and extended service life in clinical applications.",
      icon: zirConIcon,
    },
  ];

  return (
    <section className="py-12 md:py-20 relative w-full">
      <div className="w-full text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <h2 className="text-[32px] md:text-[42px] font-black text-slate-900 leading-tight tracking-tight">
          Designed, <span className="text-[#E68736]">Manufactured</span>, and Perfected <span className="text-[#E68736]">by Experts</span>
        </h2>
      </div>

      {/* Grid structure fixed to handle responsive flow perfectly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
        {features.map((feature, index) => (
          <div key={index} className={`${index === 2 ? "sm:col-span-2 lg:col-span-1 sm:max-w-[50%] lg:max-w-full mx-auto w-full" : "w-full"}`}>
            <FlipCard feature={feature} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;