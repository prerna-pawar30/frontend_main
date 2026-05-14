import React from "react";
import "aos/dist/aos.css";
import "../../pages/HomeNew.css";
import { Send } from "lucide-react";

export default function Support() {
  return (
    <section className="relative py-8 md:py-24 bg-white overflow-hidden">
      <div className="responsive-container px-4">
        <div
          className="rounded-[2rem] md:rounded-[2.5rem] py-12 px-6 md:py-24 text-center relative z-10 overflow-hidden flex flex-col justify-center items-center"
          data-aos="fade-up"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 60%, #2d1a0a 100%)',
            border: '1.5px solid rgba(230,135,54,0.4)',
            minHeight: '400px', // Slightly reduced for mobile
            position: 'relative',
          }}
        >
          {/* Decorative Corner Glows - Reduced size for mobile */}
          <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-orange-500/10 blur-[60px] md:blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-orange-500/5 blur-[60px] md:blur-[100px] pointer-events-none" />

          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: 'linear-gradient(120deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
            }}
          />

          <div className="max-w-4xl mx-auto relative z-10">
            {/* 
               Typography Fix: 
               text-4xl on mobile (was 6xl) 
               text-5xl on tablet 
               text-7xl on desktop 
            */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-white tracking-tight leading-[1.1]">
              Supporting you at <span className="text-[#E68736]">every step</span>
            </h2>

            {/* Subtext: text-base for mobile, text-lg/xl for desktop */}
            <p className="py-2 text-slate-300 mb-10 text-base md:text-xl lg:text-[22px] font-medium leading-relaxed max-w-2xl mx-auto opacity-90">
              Our expert team is always ready to assist, offering guidance and support
              to ensure a seamless experience from start to finish.
            </p>

            <div className="flex justify-center w-full">
              <a
                href="/Contact"
                className="group relative inline-flex items-center justify-center gap-4 py-4 px-8 md:px-12 rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all duration-300 w-full sm:w-auto"
                style={{
                  background: '#E68736',
                  color: '#fff',
                  boxShadow: '0 10px 25px rgba(230,135,54,0.3)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(230,135,54,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(230,135,54,0.3)';
                }}
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