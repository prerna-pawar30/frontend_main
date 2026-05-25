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
  const SPEED       = 0.5;

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

  const pause  = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  const cards = exploreData.data;

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="responsive-container">

        {/* Header */}
        <div className="mb-12 text-center" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-[#072434] mb-3">
            Explore Our <span className="text-[#E68736]">Categories</span>
          </h2>
          <p className="text-gray-500 text-lg">Digital dental precision</p>
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

          {exploreData.loading ? (
            <div className="py-20 text-center text-gray-400">Loading digital precision...</div>
          ) : (
            <div
              ref={trackRef}
              className="flex py-6"
              style={{ willChange: "transform", width: "max-content", gap: "24px" }}
            >
              {[...cards, ...cards].map((cat, i) => (
                <div
                  key={`cat-${i}`}
                  onMouseEnter={pause}
                  onMouseLeave={resume}
                  onClick={pause}
                  style={{
                    width: "240px",
                    flexShrink: 0,
                    cursor: "default",
                    /* Fixed height so all cards are uniform */
                    height: "360px",
                    borderRadius: "25px",
                    border: "2px solid #FDDCB5",
                    backgroundColor: "#fff",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    boxSizing: "border-box",
                  }}
                >
                  {/* Image area — fixed height with neutral bg so all images sit uniformly */}
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
                      src={cat.image || cat.imageUrl || cat.images?.[0]}
                      alt={cat.title || cat.name}
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

                  {/* Text + button — flex-grow so button always sits at bottom */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    {/* Category name — fixed 2-line clamp so button stays aligned */}
                    <h3
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#072434",
                        lineHeight: "1.4",
                        margin: 0,
                        marginBottom: "8px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "44px",   /* reserves space for 2 lines */
                      }}
                    >
                      {cat.title || cat.name}
                    </h3>

                    {/* Spacer pushes button to the very bottom */}
                    <div style={{ flex: 1 }} />

                    <a
                      href={`${SHOP_BASE_URL}/all-products?category=${cat._id}`}
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        background: "#E68736",
                        color: "#fff",
                        border: "none",
                        borderRadius: "12px",
                        padding: "10px 0",
                        fontSize: "15px",
                        fontWeight: "700",
                        cursor: "pointer",
                        textDecoration: "none",
                        transition: "opacity 0.2s, transform 0.15s",
                        width: "100%",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
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
          )}
        </div>
      </div>
    </section>
  );
}