/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import apiService from "../../api/ApiService";
import { FiShoppingCart } from "react-icons/fi";

import "../../pages/HomeNew.css";

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

export default function Bestselling() {
  const [bestSellingData, setBestSellingData] = useState({
    loading: true,
    data: [],
    error: null,
  });

  /* ── RAF scroll refs ── */
  const trackRef    = useRef(null);
  const animRef     = useRef(null);
  const pausedRef   = useRef(false);
  const positionRef = useRef(0);
  const SPEED       = 0.5;

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });

    const fetchBestSelling = async () => {
      try {
        const res = await apiService.getBestSelling();
        setBestSellingData({
          loading: false,
          data: res.data?.data || [],
          error: null,
        });
      } catch (err) {
        setBestSellingData({
          loading: false,
          data: [],
          error: "Failed to load best selling products",
        });
      }
    };
    fetchBestSelling();
  }, []);

  /* ── same RAF loop as Category ── */
  const startLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (!pausedRef.current) {
        positionRef.current += SPEED;
        const halfWidth = track.scrollWidth / 2;
        if (positionRef.current >= halfWidth) positionRef.current = 0;
        track.style.transform = `translateX(-${positionRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (!bestSellingData.loading && bestSellingData.data.length >= 4) {
      const t = setTimeout(startLoop, 120);
      return () => {
        clearTimeout(t);
        cancelAnimationFrame(animRef.current);
      };
    }
  }, [bestSellingData.loading, bestSellingData.data, startLoop]);

  const pause  = () => { pausedRef.current = true;  };
  const resume = () => { pausedRef.current = false; };

  /* original hide condition */
  if (bestSellingData.loading || bestSellingData.data.length < 4) return null;

  const cards = bestSellingData.data;

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* Header — original, untouched */}
        <div className="mb-12" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-[#072434] mb-3">
            Best Selling <span className="text-[#E68736]">Range</span>
          </h2>
          <p className="text-gray-500 text-lg">Our most trusted collection</p>
        </div>

        {/* Scroll viewport */}
        <div className="relative w-full overflow-hidden">

          {/* Fade edges */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16"
            style={{ background: "linear-gradient(to right, white, transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16"
            style={{ background: "linear-gradient(to left, white, transparent)" }}
          />

          {/* Track — cards × 2 for seamless loop */}
          <div
            ref={trackRef}
            className="flex py-4"
            style={{ willChange: "transform", width: "max-content", gap: "20px" }}
          >
            {[...cards, ...cards].map((b, i) => (
              <div
                key={`best-${i}`}
                onMouseEnter={pause}
                onMouseLeave={resume}
                style={{ width: "260px", flexShrink: 0, cursor: "default" }}
                /* ── original card classes, untouched ── */
                className="category-card rounded-[25px] border-2 border-gray-200 bg-white p-6 flex flex-col h-[350px] transition-all duration-300 hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                {/* Image Area — original */}
                <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={Array.isArray(b.images) ? b.images[0] : (b.image || b.images)}
                    alt={b.name}
                    className="max-h-full object-contain transition-transform duration-500 hover:scale-110"
                    draggable={false}
                  />
                </div>

                {/* Text Area — original */}
                <div className="text-left w-full flex flex-col flex-grow">
                  <h3 className="text-[16px] font-bold text-[#072434] leading-tight line-clamp-2 mb-4">
                    {b.name} Compatible {b.category?.name}
                  </h3>

                  <div className="flex w-full">
                    <a
                      href={`${SHOP_BASE_URL}/hot-selling?product=${b.productId}`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full flex items-center justify-center gap-2 bg-[#E68736] hover:bg-white hover:text-[#E68736] border border-[#E68736] text-white py-2 rounded-xl text-[17px] font-bold transition-all active:scale-95"
                    >
                      <FiShoppingCart size={20} />
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button — original, untouched */}
        <div className="mt-12">
          <a
            href={`${SHOP_BASE_URL}/hot-selling`}
            className="inline-block  text-white hover:text-white py-4 px-12 rounded-xl font-bold text-xl transition-all duration-300"
             style={{ background: 'linear-gradient(160deg, #fbd3bc, #f6811b 100%)' }}
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}
