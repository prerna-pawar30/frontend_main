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
    <div className="products-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .products-page {
          background: #ffffff;
          min-height: 100vh;
          padding: 56px 32px 72px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .products-page::before {
          content: '';
          position: absolute; top: -80px; right: -80px;
          width: 600px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(230,135,54,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .products-page::after {
          content: '';
          position: absolute; bottom: -60px; left: -60px;
          width: 600px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(230,135,54,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .p-head { text-align: center; margin-bottom: 36px; }
        .p-head h1 {
         
          font-size: clamp(30px, 7vw, 28px);
          font-weight: 900; color: #072434;
          text-transform: uppercase; line-height: 1;
        }
        .p-head h1 span { color: #E68736; }
        .p-head p {
          font-size: 12px; letter-spacing: 0.2em;
          color: #a08060; text-transform: uppercase; margin-top: 8px;
        }

        .p-tabs {
          display: flex; gap: 8px; justify-content: center;
          margin-bottom: 36px; flex-wrap: wrap;
        }
        .p-tab {
          padding: 7px 22px; border-radius: 20px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
          cursor: pointer; border: 1.5px solid #E68736; color: #E68736; background: #fff;
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .p-tab.active {
          background: #E68736; color: #fff;
          box-shadow: 0 4px 12px rgba(230,135,54,0.3);
        }
        .p-tab:hover:not(.active) { background: rgba(230,135,54,0.08); }

        /* ── Stack: wider ── */
        .p-stack {
          position: relative;
          width: 100%;
          max-width: 980px;        /* ← increased from 540px */
          margin: 0 auto;
          height: 580px;           /* ← slightly taller for proportion */
          perspective: 1400px;
        }

        .p-card {
          position: absolute; inset: 0;
          border-radius: 28px;
          background: linear-gradient(135deg, #fff9f5 0%, #E68736 100%);
          box-shadow: 0 24px 64px rgba(230,135,54,0.22), 0 4px 16px rgba(0,0,0,0.08);
          display: flex; flex-direction: column;
          padding: 26px 30px 18px;  /* ← more generous padding */
          transition: transform 0.65s cubic-bezier(0.34,1.26,0.64,1),
                      opacity 0.5s ease,
                      box-shadow 0.4s ease;
          transform-origin: center center;
          overflow: hidden;
          will-change: transform;
        }

        .p-card[data-pos="0"] {
          transform: translateZ(0) translateY(0) scale(1);
          z-index: 10; opacity: 1;
          box-shadow: 0 32px 80px rgba(230,135,54,0.28), 0 8px 24px rgba(0,0,0,0.1);
        }
        .p-card[data-pos="1"] {
          transform: translateZ(-70px) translateY(20px) scale(0.96);
          z-index: 9; opacity: 1; pointer-events: none;
        }
        .p-card[data-pos="2"] {
          transform: translateZ(-140px) translateY(40px) scale(0.92);
          z-index: 8; opacity: 0.8; pointer-events: none;
        }
        .p-card[data-pos="3"] {
          transform: translateZ(-210px) translateY(60px) scale(0.88);
          z-index: 7; opacity: 0.55; pointer-events: none;
        }

        .p-card.exiting {
          transform: translateX(-130%) translateY(-40px) rotateY(-25deg) rotateZ(-8deg) scale(0.85) !important;
          opacity: 0 !important;
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease !important;
          z-index: 20 !important;
          pointer-events: none;
        }

        .p-card-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.8);
          border-radius: 20px; padding: 4px 14px;
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          color: #872e00; text-transform: uppercase;
          width: fit-content; margin-bottom: 14px;
        }
        .p-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #E68736; display: inline-block;
        }

        .p-card-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(36px, 5.5vw, 58px); /* ← bigger title */
          font-weight: 900; color: #072434; line-height: 1;
          text-transform: uppercase; letter-spacing: -0.01em;
          margin-bottom: 12px;
        }
        .p-card-desc {
          font-size: 16px; /* ← slightly larger body text */
          color: rgba(0, 0, 0, 0.68);
          line-height: 1.7;
          max-width: 620px; /* ← wider text block */
        }

        .p-card-img {
          flex: 1; display: flex; align-items: flex-end; justify-content: flex-end;
          margin-top: 16px; position: relative;
        }
        .p-card-img img {
          max-height: 400px;   /* ← bigger image */
          max-width: 440px;
          object-fit: contain;
          filter: drop-shadow(0 14px 28px rgba(100,40,0,0.25));
          transition: transform 0.4s ease;
        }
        .p-card[data-pos="0"]:hover .p-card-img img {
          transform: translateY(-8px) scale(1.05);
        }
        .p-card-num {
          position: absolute; bottom: 0; left: 0;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 110px; font-weight: 900;
          color: rgba(255, 255, 255, 0.2); line-height: 1;
          pointer-events: none; user-select: none;
        }

        .p-card-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: auto; padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.4);
        }
        .p-view-btn {
          background: #072434; color: #fff;
          border: none; border-radius: 10px;
          padding: 10px 24px; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .p-view-btn:hover { background: #E68736; transform: scale(1.03); }
        .p-card-count { font-size: 13px; color: rgba(7,36,52,0.45); font-weight: 500; }

        .p-nav {
          display: flex; align-items: center; justify-content: center;
          gap: 16px; margin-top: 32px;
        }
        .p-nav-btn {
          width: 52px; height: 52px; border-radius: 50%;
          border: 2px solid #E68736; background: #fff; color: #E68736;
          font-size: 22px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s; box-shadow: 0 4px 12px rgba(230,135,54,0.2);
          font-weight: 700;
        }
        .p-nav-btn:hover { background: #E68736; color: #fff; transform: scale(1.08); }
        .p-nav-btn:active { transform: scale(0.95); }

        @media (max-width: 600px) {
          .p-stack { height: 430px; }
          .p-card { padding: 24px 22px 20px; }
          .p-card-desc { max-width: 100%; }
        }
      `}</style>

      <div className="p-head">
        <h1>Our <span>Products</span></h1>
        <p>Precision-Engineered Dental Solutions</p>
      </div>

      <div className="p-tabs">
        {products.map((p, i) => (
          <button
            key={i}
            className={`p-tab${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="p-stack">
        {products.map((p, i) => {
          const pos = getPos(i, current, n);
          const isExiting = exitIdx === i;
          return (
            <div
              key={i}
              className={`p-card${isExiting ? " exiting" : ""}`}
              data-pos={isExiting ? undefined : pos}
            >
              <div className="p-card-badge">
                <span className="p-badge-dot" />
                {p.badge}
              </div>
              <div className="p-card-title">{p.title}</div>
              <p className="p-card-desc">
                <span className="md:hidden">{p.mobileDesc}</span>
                <span className="hidden md:block">{p.desktopDesc}</span>
              </p>
              <div className="p-card-img">
                <span className="p-card-num">0{i + 1}</span>
                <img src={p.image} alt={p.title} />
              </div>
              <div className="p-card-foot">
                <button className="p-view-btn" onClick={() => navigate(p.link)}>
                  View More →
                </button>
                <span className="p-card-count">
                  {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-nav">
        <button className="p-nav-btn" onClick={slidePrev}>←</button>
        <button className="p-nav-btn" onClick={slideNext}>→</button>
      </div>
    </div>
  );
}