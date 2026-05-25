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

  const pause  = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  if (bestSellingData.loading || bestSellingData.data.length < 4) return null;

  const cards = bestSellingData.data;

  return (
    <section className=" py-16">
      <div className="text-center relative z-10">

        {/* Header */}
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

          {/* Track */}
          <div
            ref={trackRef}
            className="flex py-6"
            style={{ willChange: "transform", width: "max-content", gap: "24px" }}
          >
            {[...cards, ...cards].map((b, i) => (
              <div
                key={`best-${i}`}
                onMouseEnter={pause}
                onMouseLeave={resume}
                style={{
                  width: "240px",
                  flexShrink: 0,
                  cursor: "default",
                  height: "360px",
                  borderRadius: "25px",
                  border: "2px solid #FDDCB5",
                  backgroundColor: "#fff",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  boxSizing: "border-box",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  pausedRef.current = true;
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={(e) => {
                  pausedRef.current = false;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Image area — fixed height, neutral warm bg */}
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    flexShrink: 0,
                    backgroundColor: "#FFF8F0",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={Array.isArray(b.images) ? b.images[0] : (b.image || b.images)}
                    alt={b.name}
                    draggable={false}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                </div>

                {/* Text + button */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    textAlign: "left",
                  }}
                >
                  {/* Product name — 2-line clamp, reserved min-height */}
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#072434",
                      lineHeight: "1.4",
                      margin: 0,
                      marginBottom: "8px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "42px",
                    }}
                  >
                    {b.name} Compatible {b.category?.name}
                  </h3>

                  {/* Spacer — pushes button to bottom */}
                  <div style={{ flex: 1 }} />

                  {/* Shop Now button */}
                  <a
                    href={`${SHOP_BASE_URL}/hot-selling?product=${b.productId}`}
                    onClick={e => e.stopPropagation()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      background: "#E68736",
                      color: "#fff",
                      border: "1px solid #E68736",
                      borderRadius: "12px",
                      padding: "10px 0",
                      fontSize: "15px",
                      fontWeight: "700",
                      cursor: "pointer",
                      textDecoration: "none",
                      width: "100%",
                      transition: "background 0.2s, color 0.2s, transform 0.15s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.style.color = "#E68736";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "#E68736";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseDown={e => { e.currentTarget.style.transform = "scale(0.97)"; }}
                    onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  >
                    <FiShoppingCart size={18} />
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="mt-12">
          <a
            href={`${SHOP_BASE_URL}/hot-selling`}
            className="inline-block text-white hover:text-white py-4 px-12 rounded-xl font-bold text-xl transition-all duration-300 bg-[#E68736] hover:bg-[#E68736]/90"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}