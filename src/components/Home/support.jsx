import React from "react";
import "aos/dist/aos.css";
import "../../pages/HomeNew.css";
import { Send } from "lucide-react"; 

export default function Support() {
  return (
    // Removed pr-12 pl-12 to let responsive-container handle spacing
    <section className="relative py-12 md:py-20 bg-white overflow-hidden">
      
      <div className="responsive-container">
        {/* Inner Box: Removed mx-2 sm:mx-6. 
            Updated rounded corners to match the rest of the site style.
        */}
        <div 
          className="rounded-[2.5rem] bg-[#F7E6DC] py-12 md:py-20 text-center relative z-10 border border-[#F0CDBE] shadow-sm"
          data-aos="fade-up"
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-[#011632] tracking-tight">
              Supporting you at <span className="text-[#E68736]">every step</span>
            </h2>

            <p className="py-4 md:py-6 text-[#525b65] mb-8 md:mb-10 text-base md:text-[18px] font-medium leading-relaxed max-w-2xl mx-auto">
              Our expert team is always ready to assist, offering guidance and support
              to ensure a seamless experience from start to finish.
            </p>

            <div className="flex justify-center">
              <a
                href="/Contact"
                // CHANGED: text-lg on mobile, text-[26px] on desktop. 
                // px-6 on mobile, px-10 on desktop.
                className="group relative inline-flex items-center justify-center gap-4 md:gap-8 bg-[#E68736] text-white py-3 px-6 md:px-10 rounded-xl font-bold text-lg md:text-[26px]  hover:bg-[#cf752b] transition-all duration-300 w-full sm:w-auto"
               >
                Contact us
                <span className="bg-white/30 p-2 rounded-md flex items-center justify-center">
                    <Send size={20} className="md:w-[22px] fill-white" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}