/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import apiService from "../../api/ApiService";
import { FiShoppingCart } from "react-icons/fi";

import "../../pages/HomeNew.css";

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

export default function Category() {
  const [exploreData, setExploreData] = useState({
    loading: true,
    data: [],
    error: null,
  });

  const trackRef    = useRef(null);
  const animRef     = useRef(null);
  const pausedRef   = useRef(false);
  const positionRef = useRef(0);
  const SPEED       = 0.5; // px per frame

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });

    const fetchCategories = async () => {
      try {
        const res = await apiService.getExploreItems();
        setExploreData({
          loading: false,
          data: res.data?.data?.categories || [],
          error: null,
        });
      } catch (err) {
        setExploreData({ loading: false, data: [], error: "Failed to load categories" });
      }
    };
    fetchCategories();
  }, []);

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
    if (!exploreData.loading && exploreData.data.length > 0) {
      const t = setTimeout(startLoop, 120);
      return () => {
        clearTimeout(t);
        cancelAnimationFrame(animRef.current);
      };
    }
  }, [exploreData.loading, exploreData.data, startLoop]);

  const pause  = () => { pausedRef.current = true;  };
  const resume = () => { pausedRef.current = false; };

  const cards = exploreData.data;

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="responsive-container">

        {/* Header Section — unchanged */}
        <div className="mb-12 text-center" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-[#072434] mb-3">
            Explore Our <span className="text-[#E68736]">Categories</span>
          </h2>
          <p className="text-gray-500 text-lg">Digital dental precision</p>
        </div>

        {/* Scroll viewport */}
        <div className="relative w-full overflow-hidden">

          {/* Soft fade edges so cards glide in/out cleanly */}
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16"
            style={{ background: "linear-gradient(to right, white, transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16"
            style={{ background: "linear-gradient(to left, white, transparent)" }}
          />

          {exploreData.loading ? (
            <div className="py-20 text-center text-gray-400">Loading digital precision...</div>
          ) : (
            /* Track: cards × 2 for seamless loop, RAF drives translateX */
            <div
              ref={trackRef}
              className="flex py-6"
              style={{ willChange: "transform", width: "max-content", gap: "24px" }}
            >
              {[...cards, ...cards].map((cat, i) => (
                <div
                  key={`cat-${i}`}
                  /* ── ORIGINAL card classes & styles, untouched ── */
                  className="category-card rounded-[25px] border-2 border-orange-200 p-6 flex flex-col items-center h-[360px]"
                  style={{ cursor: "default", width: "260px", flexShrink: 0 }}
                  onMouseEnter={pause}
                  onMouseLeave={resume}
                  onClick={pause}
                >
                  {/* Image Area — original */}
                  <div className="w-full h-48 flex items-center justify-center mb-6">
                    <img
                      src={cat.image || cat.imageUrl || cat.images?.[0]}
                      alt={cat.title || cat.name}
                      className="max-h-full object-contain transition-transform duration-500 hover:scale-110"
                      draggable={false}
                    />
                  </div>

                  {/* Text Area — original */}
                  <div className="text-left w-full flex flex-col h-full">
                    <h3 className="text-[18px] font-bold text-[#072434] leading-tight">
                      {cat.title || cat.name}
                    </h3>

                    <a
                      href={`${SHOP_BASE_URL}/all-products?category=${cat._id}`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-8 w-full flex items-center justify-center gap-2  hover:text-white border border-orange-200 text-white py-2 rounded-xl text-[17px] font-bold transition-all active:scale-95"
                      style={{ background: 'linear-gradient(160deg, #f8c1a1, #eb730b 100%)' }}
                    >
                      <FiShoppingCart size={20} />
                      Shop Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}