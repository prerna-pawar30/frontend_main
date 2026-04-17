import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import about1 from "../assets/aboutus/aboutus.webp";
import about2 from "../assets/aboutus/aboutus 1.webp";
import about3 from "../assets/aboutus/aboutus4.webp";
import icon1 from "../assets/aboutus/aboutus1.webp";
import icon2 from "../assets/aboutus/aboutus2.webp";
import icon3 from "../assets/aboutus/aboutus3.webp";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <div className="bg-white font-sans text-[#1a2b3b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">

        {/* PAGE TITLE */}
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-12"
          data-aos="fade-down"
        >
          About Us
        </h2>

        {/* ================= SECTION 1 : HERO ================= */}
        <section
          className="relative rounded-2xl py-14 md:py-24 px-6 md:px-20 text-white mb-20 md:mb-20 flex items-center overflow-hidden"
          data-aos="fade-up"
        >
          <div className="relative z-10 max-w-xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
              Empowering the Future <br /> of Dentistry
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base leading-relaxed opacity-90">
              As dentistry embraces the digital era, DigiDent India stands at the forefront of innovation.
              We redefine implant accessory manufacturing through digital scanning, CAD/CAM precision,
              and 3D printing technology.
            </p>
          </div>

          <div className="absolute inset-0">
           <img
              src={about1}
              alt="Digital Dentistry Hero"
              className="w-full h-full object-cover object-right"
              // Priority 1: High priority for the first big image user sees
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </section>

        {/* ================= SECTION 2 : IDENTITY ================= */}
        <section className="relative z-20 mb-24 md:mb-32">
          <div
            className="flex flex-col md:flex-row bg-[#E6873633] rounded-[1rem]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* IMAGE */}
            <div className="w-full md:w-[45%] flex justify-center  md:p-0">
              <div className="md:-mt-36">
                <img
                  src={about2}
                  alt="Innovation"
                  className="
                    rounded-[1rem]
                    w-56 h-64
                    sm:w-64 sm:h-72
                    md:w-102 md:h-[420px]
                    object-cover
                    border-[4px] border-[#E68736]
                  "
                />
              </div>
            </div>


            {/* TEXT */}
            <div className="w-full md:w-[65%]  md:p-16 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#072434] mb-6 leading-snug">
                <span className="text-[#E68736]">At DigiDent India,</span>{" "}
                innovation isn't optional — it's our identity.
              </h3>
              <div className="space-y-4 text-gray-600 text-sm md:text-base">
                <p>
                  Digital manufacturing defines the new gold standard in implant dentistry —
                  delivering precision, repeatability, and speed.
                </p>
                <p>
                  Our mission is to make advanced implant accessories accessible through automation,
                  premium materials, and uncompromising engineering.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3 : TEAM ================= */}
        <section className="grid md:grid-cols-2 gap-16 mb-20">
          <div data-aos="fade-right">
            <p className="text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              OUR TEAM
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#072434] mb-6">
              Empowering Innovation{" "}
              <span className="text-[#E68736]">Through People</span>
            </h2>

            <div className="flex flex-wrap gap-10 mb-6 justify-center sm:justify-start">
              {[icon1, icon2, icon3].map((img, i) => (
                <div
                  key={i}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center"
                  data-aos="zoom-in"
                  data-aos-delay={i * 150}
                >
                  <img src={img} alt="" className="w-full h-full object-contain border-2 border-[#E68736] rounded-xl" />
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-sm sm:text-base">
              Every DigiDent component begins with a dedicated team — engineers,
              designers, and innovators setting new benchmarks.
            </p>
          </div>

          <div
            className="flex justify-center md:justify-end"
            data-aos="zoom-in"
          >
            <div className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[550px]">
              <img
                src={about3}
                alt="Our Team"
                className="w-full aspect-[600/450] object-cover rounded-[1rem] border-[4px] border-[#E68736]"
              />
            </div>
          </div>
        </section>

        {/* ================= SECTION 4 : STATS + CTA ================= */}
        <section
          className="bg-[#E6873633] rounded-[1rem] p-6 md:p-12 flex flex-col lg:flex-row gap-12 items-center"
          data-aos="fade-up"
        >
          <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <StatCard val="2010" label="Founding Year" />
            <StatCard val="2000" label="Happy Customers" />
            <StatCard val="190" label="Company Work" />
            <StatCard val="750" label="Projects Completed" />
            <StatCard val="21" label="Team Members" />
            <StatCard val="02" label="Offices" />
          </div>

          <div className="lg:w-1/2">
            <p className="font-bold text-[#072434] mb-3">
              Why Choose <span className="text-[#E68736]">DigiDent?</span>
            </p>

            <h3 className="text-2xl md:text-3xl font-bold text-[#072434] mb-8">
              Trusted by <span className="text-[#E68736]">Experts</span>, Proven by{" "}
              <span className="text-[#E68736]">Results</span>
            </h3>

            <div className="bg-white p-5 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between border-2 border-[#E68736]">
              <div className="text-center sm:text-left">
                <p className="font-bold text-sm">Have Any Questions?</p>
                <p className="text-[11px] text-gray-400">
                  Don’t hesitate to contact us
                </p>
              </div>

              <a href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#E68736] text-white px-8 py-3 rounded-[1rem] text-xs font-bold hover:bg-[#cf752b] transition">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ================= STATS CARD ================= */
const StatCard = ({ val, label }) => (
  <div className="bg-white p-5 rounded-[1rem] flex flex-col items-center justify-center border border-[#E68736]">
    <span className="text-xl md:text-2xl font-black text-[#072434]">{val}</span>
    <span className="text-[9px] md:text-[10px] uppercase font-bold text-gray-400 mt-1">
      {label}
    </span>
  </div>
);
