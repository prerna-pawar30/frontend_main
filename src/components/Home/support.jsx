import React from "react";
import "aos/dist/aos.css";
import "../../pages/HomeNew.css";
import { Send } from "lucide-react";

// Inline keyframes injected once for the custom SVG line animation
const lineStyle = `
  @keyframes bgline-draw {
    0%   { stroke-dashoffset: 1200; opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.6; }
    100% { stroke-dashoffset: 0; opacity: 0; }
  }
  .bg-line {
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    animation: bgline-draw linear infinite;
    animation-duration: 10s;
  }
`;

const LINES = [
  { d: "M-50 60 Q 100 30 200 80 Q 350 130 500 60 Q 650 -10 850 80",     stroke: "rgba(230,135,54,0.35)", w: 1.2, delay: "0s"   },
  { d: "M-50 100 Q 120 70 250 120 Q 400 170 550 100 Q 700 30 900 120",  stroke: "rgba(230,135,54,0.25)", w: 1,   delay: "0.6s" },
  { d: "M-50 140 Q 150 110 280 160 Q 430 210 580 140 Q 730 70 920 160", stroke: "rgba(148,163,184,0.2)",  w: 0.9, delay: "1.2s" },
  { d: "M-50 190 Q 100 160 230 200 Q 380 240 530 180 Q 680 120 870 200",stroke: "rgba(230,135,54,0.2)",  w: 1,   delay: "1.8s" },
  { d: "M-50 230 Q 130 200 260 240 Q 410 280 560 220 Q 710 160 900 240",stroke: "rgba(148,163,184,0.15)", w: 0.8, delay: "2.4s" },
  { d: "M-50 270 Q 100 240 240 280 Q 390 320 540 260 Q 690 200 880 280",stroke: "rgba(230,135,54,0.28)", w: 1.1, delay: "3s"   },
  { d: "M-50 310 Q 150 280 290 320 Q 440 360 590 300 Q 740 240 920 320",stroke: "rgba(230,135,54,0.18)", w: 0.9, delay: "3.6s" },
  { d: "M-50 350 Q 120 320 260 360 Q 410 400 560 340 Q 710 280 900 360",stroke: "rgba(148,163,184,0.18)", w: 0.8, delay: "4.2s" },
  { d: "M-50 390 Q 100 360 250 400 Q 400 440 550 380 Q 700 320 890 400",stroke: "rgba(230,135,54,0.22)", w: 1,   delay: "4.8s" },
  { d: "M-50 430 Q 130 400 270 435 Q 420 470 570 415 Q 720 360 910 435",stroke: "rgba(148,163,184,0.14)", w: 0.7, delay: "5.4s" },
  { d: "M-50 20 Q 110 -10 240 40 Q 390 90 540 20 Q 690 -50 880 40",     stroke: "rgba(230,135,54,0.15)", w: 0.8, delay: "0.3s" },
  { d: "M-50 -20 Q 90 -50 220 0 Q 370 50 520 -20 Q 670 -90 860 0",      stroke: "rgba(148,163,184,0.12)", w: 0.7, delay: "0.9s" },
  { d: "M-50 460 Q 100 430 250 465 Q 400 500 555 445 Q 710 390 900 465",stroke: "rgba(230,135,54,0.12)", w: 0.7, delay: "5.1s" },
];

const RotatingCircles = () => (
  <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" width="500" height="500">
    <style>{`
      @keyframes spin1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spin2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes spin3 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .r1 { transform-origin: 210px 210px; animation: spin1 18s linear infinite; }
      .r2 { transform-origin: 210px 210px; animation: spin2 28s linear infinite; }
      .r3 { transform-origin: 210px 210px; animation: spin3 40s linear infinite; }
    `}</style>
    <circle cx="210" cy="210" r="62" fill="none" stroke="#e0d9d0" strokeWidth="1" strokeDasharray="4 8" opacity="0.5"/>
    <g className="r1">
      <circle cx="210" cy="210" r="100" fill="none" stroke="#d4c4b0" strokeWidth="1" strokeDasharray="6 10"/>
      <circle cx="210" cy="110" r="5" fill="#E68736" opacity="0.85"/>
      <circle cx="310" cy="210" r="3.5" fill="#888" opacity="0.5"/>
    </g>
    <g className="r2">
      <circle cx="210" cy="210" r="148" fill="none" stroke="#c8b89a" strokeWidth="1" strokeDasharray="8 14"/>
      <circle cx="358" cy="210" r="5.5" fill="#E68736" opacity="0.7"/>
    </g>
    <g className="r3">
      <circle cx="210" cy="210" r="195" fill="none" stroke="#bfae97" strokeWidth="1" strokeDasharray="10 18"/>
      <circle cx="210" cy="15" r="5" fill="#E68736" opacity="0.55"/>
    </g>
  </svg>
);


export default function Support() {
  return (
    <section className="relative py-8 md:py-24 bg-white overflow-hidden">
       {/* ── Circles: TOP LEFT ── */}
      <div
        style={{
          position: "absolute",
          top: "-140px",
          left: "-80px",
          width: "500px",
          height: "500px",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.9,
        }}
      >
        <RotatingCircles />
      </div>
      
      <style>{lineStyle}</style>
      <div className="responsive-container px-4 ">
        <div
          className="rounded-[2rem] md:rounded-[2.5rem] py-12 px-6 md:py-24 text-center relative z-10 overflow-hidden flex flex-col justify-center items-center bg-[#1a2b3b] bg-gradient-to-br from-[#1e293b] via-[#0f172a] via-60% to-[#2d1a0a] border-[1.5px] border-[#e68736]/40 min-h-[400px]"
          data-aos="fade-up"
        >
          {/* ── Background Lines Animation ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 450"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            {LINES.map((l, i) => (
              <path
                key={i}
                className="bg-line"
                style={{ animationDelay: l.delay }}
                d={l.d}
                fill="none"
                stroke={l.stroke}
                strokeWidth={l.w}
              />
            ))}
          </svg>

          {/* Corner Glows */}
          <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-orange-500/10 blur-[60px] md:blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-orange-500/5 blur-[60px] md:blur-[100px] pointer-events-none" />

          {/* Shimmer overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-30 bg-gradient-to-r from-white/5 via-transparent via-50%" />

          {/* Content */}
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white tracking-tight leading-[1.1]">
              Supporting you at <span className="text-[#E68736]">every step</span>
            </h2>
            <p className="py-2 text-slate-300 mb-10 text-base md:text-xl lg:text-[22px] font-medium leading-relaxed max-w-2xl mx-auto opacity-90">
              Our expert team is always ready to assist, offering guidance and support
              to ensure a seamless experience from start to finish.
            </p>
            <div className="flex justify-center w-full">
              {/* Fixed the missing <a> opening element tag below */}
              <a
                href="/Contact"
                className="group relative inline-flex items-center justify-center gap-4 py-4 px-8 md:px-12 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all duration-300 w-full sm:w-auto bg-[#E68736] text-white shadow-[0_10px_25px_rgba(230,135,54,0.3)] hover:-translate-y-0.5 hover:shadow-[0_15px_30px_rgba(230,135,54,0.4)]"
              >
                Contact us
                <span className="p-2 rounded-lg flex items-center justify-center bg-white/20">
                  <Send size={18} className="text-white" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}