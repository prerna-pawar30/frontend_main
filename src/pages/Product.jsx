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
    <div className="relative min-h-screen overflow-hidden bg-white px-8 py-14  font-normal">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(230,135,54,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-14 -left-14 h-[300px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(230,135,54,0.08)_0%,transparent_70%)]" />

      {/* Header */}
      <div className="mb-9 text-center">
        <h1 className="text-[clamp(28px,7vw,30px)] font-black leading-none text-[#072434]">
          Our <span className="text-[#E68736]">Products</span>
        </h1>
        <p className="mt-2 text-[14px] font-normal  tracking-[0.1em] text-[#a08060]">
          Precision-Engineered Dental Solutions
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-9 flex flex-wrap justify-center gap-2">
        {products.map((p, i) => (
          <button
            key={i}
            className={`cursor-pointer rounded-[20px] border-[1.5px] border-[#E68736] px-[22px] py-[7px] text-[12px] uppercase tracking-[0.06em] transition-all duration-200 ${
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

      {/* Card Stack */}
      <div className="relative mx-auto h-[430px] w-full max-w-[980px] [perspective:1400px] md:h-[580px]">
        {products.map((p, i) => {
          const pos = getPos(i, current, n);
          const isExiting = exitIdx === i;

          // POSITIONAL STYLING
          let transformClass = "";
          let zIndex = "";
          let opacity = "opacity-100";

          if (isExiting) {
            transformClass = "-translate-x-[130%] -translate-y-10 -rotate-y-[25deg] -rotate-z-[8deg] scale-[0.85]";
            zIndex = "z-20";
            opacity = "opacity-0";
          } else {
            if (pos === 0) {
              transformClass = "translate-z-0 translate-y-0 scale-100";
              zIndex = "z-10";
              opacity = "opacity-100";
            } else if (pos === 1) {
              transformClass = "-translate-z-[70px] translate-y-5 scale-[0.96]";
              zIndex = "z-[9]";
            } else if (pos === 2) {
              transformClass = "-translate-z-[140px] translate-y-10 scale-[0.92]";
              zIndex = "z-[8]";
              opacity = "opacity-80";
            } else {
              transformClass = "-translate-z-[210px] translate-y-[60px] scale-[0.88]";
              zIndex = "z-[7]";
              opacity = "opacity-[0.55]";
            }
          }

          return (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#0f172a_100%)] p-6 transition-all duration-[650ms] [transform-origin:center_center] [will-change:transform] md:px-[30px] md:pb-[18px] md:pt-[26px] ${transformClass} ${zIndex} ${opacity} ${
                pos === 0 && !isExiting 
              }`}
            >
              <div className="mb-3.5 inline-flex w-fit items-center gap-1.5 rounded-[20px] border border-[#E68736]/40 bg-white/5 px-3.5 py-1 text-[11px] font-normal uppercase tracking-widest text-[#E68736]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E68736]" />
                {p.badge}
              </div>

              <div className="mb-3  text-[32px] font-black uppercase tracking-tight text-white leading-none md:text-[clamp(36px,5.5vw,58px)]">
                {p.title}
              </div>

              <p className="max-w-[890px] text-base font-normal leading-relaxed text-slate-300/85 md:text-lg md:leading-[1.7]">
                <span className="md:hidden">{p.mobileDesc}</span>
                <span className="hidden md:block">{p.desktopDesc}</span>
              </p>

              <div className="relative mt-4 flex flex-1 items-end justify-end group">
                <span className="absolute bottom-0 left-0 select-none font-['Barlow_Condensed'] text-[110px] font-black leading-none text-white/5">
                  0{i + 1}
                </span>
                <img
                  src={p.image}
                  alt={p.title}
                  className="max-h-[400px] max-w-[440px] object-contain transition-transform duration-400 [filter:drop-shadow(0_14px_32px_rgba(230,135,54,0.3))] group-hover:-translate-y-2 group-hover:scale-105"
                />
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-[18px]">
                <button
                  className="cursor-pointer rounded-lg bg-[#E68736] px-6 py-2.5 font-['DM_Sans'] text-sm font-normal text-white transition-all hover:bg-[#f59e3f] hover:scale-105 active:scale-95"
                  onClick={() => navigate(p.link)}
                >
                  View More →
                </button>
                <span className="text-[13px] font-normal text-slate-400/70">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border-2 border-[#E68736] bg-white text-[22px] font-bold text-[#E68736] shadow-[0_4px_12px_rgba(230,135,54,0.2)] transition-all hover:bg-[#E68736] hover:text-white hover:scale-110 active:scale-95"
          onClick={slidePrev}
        >
          ←
        </button>
        <button
          className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border-2 border-[#E68736] bg-white text-[22px] font-bold text-[#E68736] shadow-[0_4px_12px_rgba(230,135,54,0.2)] transition-all hover:bg-[#E68736] hover:text-white hover:scale-110 active:scale-95"
          onClick={slideNext}
        >
          →
        </button>
      </div>
    </div>
  );
}