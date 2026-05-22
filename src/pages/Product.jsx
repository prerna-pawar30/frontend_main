/* eslint-disable no-unused-vars */
"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scanBody1 from "../assets/products/labanalog.webp";
import scanBody2 from "../assets/products/scanbody1.webp";
import aboutmentImg from "../assets/products/aboutment.webp";
import screwImg from "../assets/products/screw.webp";

const products = [
  {
    title: "Scan Body",
    badge: "Scanning",
    image: scanBody2,
    link: "/product/scanbody",
    mobileDesc: "Engineered with integrated internal threading to securely retain fixation screws, ensuring precision during intraoral scanning.",
    desktopDesc: "The scan body is engineered with an integrated internal threading mechanism that securely retains the fixation screw, eliminating the risk of screw disengagement during clinical handling or intraoral scanning procedures.",
  },
  {
    title: "Lab Analog",
    badge: "Laboratory",
    image: scanBody1,
    link: "/product/lab-analog",
    mobileDesc: "Incorporates the TrueAlign™ Concept for exact 90° orthogonal alignment between side and bottom screw interfaces.",
    desktopDesc: "The Lab Analog incorporates the proprietary TrueAlign™ Concept, a precision-engineered feature designed to ensure exact positional alignment between the lab analog body, side screw, and bottom screw interface.",
  },
  {
    title: "Abutment",
    badge: "Prosthetics",
    image: aboutmentImg,
    link: "/product/abutment",
    mobileDesc: "Precision-engineered for exact vertical height control, preventing food lodgement and ensuring proper seating.",
    desktopDesc: "The CuraVex™ Abutment System is precision-engineered to deliver exact vertical height control, preventing food lodgement and ensuring proper prosthetic seating.",
  },
  {
    title: "Screw",
    badge: "Fastening",
    image: screwImg,
    link: "/product/screw",
    mobileDesc: "Advanced captive screw architecture that eliminates the need for conventional screwdrivers and access holes.",
    desktopDesc: "The Next-Gen Captive Screw is an advanced fastening solution engineered to redefine precision. Its innovative screw-top architecture eliminates the need for a conventional screwdriver.",
  },
];

function getPos(idx, current, total) {
  return ((idx - current) % total + total) % total;
}

export default function Products() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [exitIdx, setExitIdx] = useState(null);
  const n = products.length;

  const slideNext = () => {
    if (animating) return;
    setAnimating(true);
    setExitIdx(current);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % n);
      setExitIdx(null);
      setTimeout(() => setAnimating(false), 650);
    }, 400);
  };

  const slidePrev = () => {
    if (animating) return;
    setAnimating(true);
    setCurrent((c) => (c - 1 + n) % n);
    setTimeout(() => setAnimating(false), 650);
  };

  const goTo = (target) => {
    if (animating || target === current) return;
    const forward = ((target - current + n) % n) <= n / 2;
    forward ? slideNext() : slidePrev();
    setTimeout(() => setCurrent(target), 410);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-4 py-10 sm:px-8 sm:py-14 font-normal">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[400px] sm:h-[400px] sm:w-[600px] rounded-full bg-[radial-gradient(circle,rgba(230,135,54,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-14 -left-14 h-[250px] w-[400px] sm:h-[300px] sm:w-[600px] rounded-full bg-[radial-gradient(circle,rgba(230,135,54,0.08)_0%,transparent_70%)]" />

      {/* Header */}
      <div className="mb-6 sm:mb-9 text-center">
        <h1 className="text-[clamp(26px,6vw,36px)] font-black leading-none text-[#072434]">
          Our <span className="text-[#E68736]">Products</span>
        </h1>
        <p className="mt-2 text-[12px] sm:text-[14px] font-normal tracking-[0.1em] text-[#a08060]">
          Precision-Engineered Dental Solutions
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 sm:mb-9 flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {products.map((p, i) => (
          <button
            key={i}
            className={`cursor-pointer rounded-[20px] border-[1.5px] border-[#E68736] px-3.5 py-1.5 sm:px-[22px] sm:py-[7px] text-[11px] sm:text-[12px] uppercase tracking-[0.06em] transition-all duration-200 ${
              i === current
                ? "bg-[#E68736] text-white shadow-[0_4px_12px_rgba(230,135,54,0.3)] font-semibold"
                : "bg-white text-[#E68736] font-normal hover:bg-[rgba(230,135,54,0.08)]"
            }`}
            onClick={() => goTo(i)}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Card Container Framework */}
      <div className="relative mx-auto h-[520px] w-full max-w-[980px] [perspective:1400px] sm:h-[480px] md:h-[580px]">
        {products.map((p, i) => {
          const pos = getPos(i, current, n);
          const isExiting = exitIdx === i;

          // 3D Animation Stack Engine (Triggers from 'sm' breakpoint up)
          let transformClass = "";
          let zIndex = "";
          let opacity = "opacity-100";

          if (isExiting) {
            transformClass = "sm:-translate-x-[130%] sm:-translate-y-10 sm:-rotate-y-[25deg] sm:-rotate-z-[8deg] sm:scale-[0.85]";
            zIndex = "z-20";
            opacity = "opacity-0";
          } else {
            if (pos === 0) {
              transformClass = "sm:translate-z-0 sm:translate-y-0 sm:scale-100";
              zIndex = "z-10";
              opacity = "opacity-100";
            } else if (pos === 1) {
              transformClass = "sm:-translate-z-[70px] sm:translate-y-5 sm:scale-[0.96]";
              zIndex = "z-[9]";
              opacity = "opacity-0 sm:opacity-100"; // Hidden completely on mobile view
            } else if (pos === 2) {
              transformClass = "sm:-translate-z-[140px] sm:translate-y-10 sm:scale-[0.92]";
              zIndex = "z-[8]";
              opacity = "opacity-0 sm:opacity-80";
            } else {
              transformClass = "sm:-translate-z-[210px] sm:translate-y-[60px] sm:scale-[0.88]";
              zIndex = "z-[7]";
              opacity = "opacity-0 sm:opacity-[0.55]";
            }
          }

          return (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#0f172a_100%)] p-5 sm:p-6 transition-all duration-[650ms] [transform-origin:center_center] [will-change:transform] md:px-[30px] md:pb-[18px] md:pt-[26px] ${
                pos === 0 ? "pointer-events-auto" : "pointer-events-none"
              } ${transformClass} ${zIndex} ${opacity}`}
            >
              {/* Card Meta Content Group */}
              <div>
                <div className="mb-2.5 inline-flex w-fit items-center gap-1.5 rounded-[20px] border border-[#E68736]/40 bg-white/5 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-[11px] font-normal uppercase tracking-widest text-[#E68736]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E68736]" />
                  {p.badge}
                </div>

                <div className="mb-2 text-[26px] font-black uppercase tracking-tight text-white leading-none sm:text-[32px] md:text-[clamp(36px,5.5vw,58px)]">
                  {p.title}
                </div>

                <p className="max-w-[890px] text-[13px] sm:text-base font-normal leading-relaxed text-slate-300/85 md:text-lg md:leading-[1.7]">
                  <span className="sm:hidden">{p.mobileDesc}</span>
                  <span className="hidden sm:block">{p.desktopDesc}</span>
                </p>
              </div>

              {/* Product Visual Centerpiece */}
              <div className="relative flex flex-1 items-center justify-center sm:items-end sm:justify-end group my-2 sm:my-0 min-h-[140px]">
                <span className="absolute bottom-0 left-0 select-none font-['Barlow_Condensed'] text-[70px] sm:text-[110px] font-black leading-none text-white/5">
                  0{i + 1}
                </span>
                <img
                  src={p.image}
                  alt={p.title}
                  className="max-h-[160px] sm:max-h-[260px] md:max-h-[260px] lg:max-h-[300px] w-auto object-contain transition-transform duration-400 [filter:drop-shadow(0_10px_20px_rgba(230,135,54,0.2))] sm:[filter:drop-shadow(0_14px_32px_rgba(230,135,54,0.3))] group-hover:-translate-y-2 group-hover:scale-105"
                />
              </div>

              {/* Card Footer Actions */}
              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3.5 sm:pt-[18px]">
                <button
                  className="cursor-pointer rounded-lg bg-[#E68736] px-4 py-2 sm:px-6 sm:py-2.5 font-['DM_Sans'] text-xs sm:text-sm font-normal text-white transition-all hover:bg-[#f59e3f] hover:scale-105 active:scale-95"
                  onClick={() => navigate(p.link)}
                >
                  View More →
                </button>
                <span className="text-[11px] sm:text-[13px] font-normal text-slate-400/70">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-4">
        <button
          className="flex h-[44px] w-[44px] sm:h-[52px] sm:w-[52px] cursor-pointer items-center justify-center rounded-full border-2 border-[#E68736] bg-white text-[18px] sm:text-[22px] font-bold text-[#E68736] shadow-[0_4px_12px_rgba(230,135,54,0.2)] transition-all hover:bg-[#E68736] hover:text-white hover:scale-110 active:scale-95"
          onClick={slidePrev}
        >
          ←
        </button>
        <button
          className="flex h-[44px] w-[44px] sm:h-[52px] sm:w-[52px] cursor-pointer items-center justify-center rounded-full border-2 border-[#E68736] bg-white text-[18px] sm:text-[22px] font-bold text-[#E68736] shadow-[0_4px_12px_rgba(230,135,54,0.2)] transition-all hover:bg-[#E68736] hover:text-white hover:scale-110 active:scale-95"
          onClick={slideNext}
        >
          →
        </button>
      </div>
    </div>
  );
}