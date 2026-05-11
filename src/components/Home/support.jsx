import React from "react";
import "aos/dist/aos.css";
import "../../pages/HomeNew.css";
import { Send } from "lucide-react";

export default function Support() {
  return (
    <section className="relative py-12 md:py-20 bg-white overflow-hidden">
      <div className="responsive-container">
        <div
          className="rounded-[2.5rem] py-12 md:py-20 text-center relative z-10 overflow-hidden"
          data-aos="fade-up"
          style={{
            background: 'linear-gradient(160deg, #F7E6DC, #E68736 100%)',
            boxShadow: '0 4px 32px rgba(230,135,54,0.15)',
            border: '1.5px solid rgba(230,135,54,0.2)',
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, transparent 55%)',
            }}
          />

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-[#011632] tracking-tight">
              Supporting you at <span className="text-white">every step</span>
            </h2>

            <p className="py-4 md:py-6 text-[#011632]/70 mb-8 md:mb-10 text-base md:text-[18px] font-medium leading-relaxed max-w-2xl mx-auto">
              Our expert team is always ready to assist, offering guidance and support
              to ensure a seamless experience from start to finish.
            </p>

            <div className="flex justify-center">
              <a
                href="/Contact"
                className="group relative inline-flex items-center justify-center gap-4 md:gap-8 py-3 px-6 md:px-10 rounded-xl font-bold text-lg md:text-[26px] transition-all duration-300 w-full sm:w-auto"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: '#E68736',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fff'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
              >
                Contact us
                <span
                  className="p-2 rounded-md flex items-center justify-center"
                  style={{ background: 'rgba(230,135,54,0.15)' }}
                >
                  <Send size={20} className="md:w-[22px]" style={{ color: '#E68736' }} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}