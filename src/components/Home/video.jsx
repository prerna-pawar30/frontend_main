/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Loader2 } from "lucide-react";

import apiService from "../../api/ApiService";
import "../../pages/HomeNew.css";

/* ── Rotating Hexagon / Diamond Rings decoration ── */
const RotatingHexRings = () => (
  <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" width="500" height="500">
    <style>{`
      @keyframes spinH1 { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
      @keyframes spinH2 { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
      @keyframes spinH3 { from { transform: rotate(45deg); }  to { transform: rotate(405deg); } }
      .h1 { transform-origin: 210px 210px; animation: spinH1 20s linear infinite; }
      .h2 { transform-origin: 210px 210px; animation: spinH2 32s linear infinite; }
      .h3 { transform-origin: 210px 210px; animation: spinH3 48s linear infinite; }
    `}</style>

    {/* Static inner square ring */}
    <rect
      x="152" y="152" width="116" height="116" rx="8"
      fill="none" stroke="#e0d9d0" strokeWidth="1"
      strokeDasharray="5 9" opacity="0.5"
      transform="rotate(45 210 210)"
    />

    {/* Ring 1 — hexagon-ish octagon */}
    <g className="h1">
      <polygon
        points="210,110 270,140 295,205 270,270 210,300 150,270 125,205 150,140"
        fill="none" stroke="#d4c4b0" strokeWidth="1" strokeDasharray="7 11"
      />
      <circle cx="210" cy="110" r="5" fill="#E68736" opacity="0.85"/>
      <circle cx="295" cy="205" r="3.5" fill="#888" opacity="0.5"/>
    </g>

    {/* Ring 2 — larger rotated square */}
    <g className="h2">
      <rect
        x="62" y="62" width="296" height="296" rx="12"
        fill="none" stroke="#c8b89a" strokeWidth="1" strokeDasharray="9 15"
        transform="rotate(22 210 210)"
      />
      <circle cx="358" cy="210" r="5.5" fill="#E68736" opacity="0.7"/>
      <circle cx="62"  cy="210" r="3.5" fill="#888"    opacity="0.4"/>
    </g>

    {/* Ring 3 — outermost diamond */}
    <g className="h3">
      <polygon
        points="210,18 390,210 210,400 30,210"
        fill="none" stroke="#bfae97" strokeWidth="1" strokeDasharray="11 18"
      />
      <circle cx="210" cy="18"  r="5"   fill="#E68736" opacity="0.55"/>
      <circle cx="390" cy="210" r="3.5" fill="#888"    opacity="0.35"/>
      <circle cx="30"  cy="210" r="4"   fill="#E68736" opacity="0.4"/>
    </g>
  </svg>
);

export default function VideoGallery() {
  const [videos, setVideos]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selectedVid, setSelectedVid] = useState(null);

  const trackRef    = useRef(null);
  const animRef     = useRef(null);
  const pausedRef   = useRef(false);
  const positionRef = useRef(0);
  const SPEED       = 0.5;

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match  = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res       = await apiService.getYtVideos();
        const videoList = res.data?.data?.videos || [];
        const formatted = videoList.map((vid) => ({
          id:       vid.ytVideoId || vid._id,
          vId:      getYouTubeID(vid.link),
          title:    vid.title,
          category: "Education",
        }));
        setVideos(formatted);
      } catch (err) {
        console.error("Failed to fetch YouTube videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
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
    if (!loading && videos.length > 0) {
      const t = setTimeout(startLoop, 120);
      return () => {
        clearTimeout(t);
        cancelAnimationFrame(animRef.current);
      };
    }
  }, [loading, videos, startLoop]);

  const pause  = () => { pausedRef.current = true;  };
  const resume = () => { pausedRef.current = false; };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center ">
        <Loader2 className="animate-spin text-[#E68736]" size={40} />
      </div>
    );
  }

  if (videos.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-visible">

      {/* ── Hex rings: TOP LEFT ── */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-200px",
          width: "500px",
          height: "500px",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.85,
        }}
      >
        <RotatingHexRings />
      </div>



      <div className="responsive-container relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#1a2b3b]">
              Our Video <span className="text-[#E68736]">Gallery</span>
            </h2>
            <p className="text-[#525b65] font-medium text-base md:text-lg max-w-lg">
              Precision demonstrations for modern dentistry
            </p>
          </div>
        </div>

        {/* Scroll viewport */}
        <div className="relative w-full overflow-hidden">

          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-6"
            style={{ background: "linear-gradient(to right, white, transparent)" }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-6"
            style={{ background: "linear-gradient(to left, white, transparent)" }}
          />

          <div
            ref={trackRef}
            className="flex pb-8"
            style={{ willChange: "transform", width: "max-content", gap: "32px" }}
          >
            {[...videos, ...videos].map((video, i) => (
              <div
                key={`vid-${i}`}
                onClick={() => { pause(); setSelectedVid(video.vId); }}
                onMouseEnter={pause}
                onMouseLeave={resume}
                className="w-[300px] md:w-[380px] flex-shrink-0 snap-start group cursor-pointer"
              >
                <div className="relative h-[200px] md:h-[240px] rounded-[2rem] overflow-hidden border border-[#f0e6e0] shadow-sm transition-all duration-500 group-hover:shadow-xl md:group-hover:-translate-y-2">
                  <img
                    src={`https://img.youtube.com/vi/${video.vId}/hqdefault.jpg`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={video.title}
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                    <div className="bg-white p-4 rounded-full shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play fill="#E68736" className="text-[#E68736] w-6 h-6 ml-1" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-[#E68736] text-[10px] font-bold text-white uppercase rounded-full tracking-wider shadow-lg">
                      {video.category}
                    </span>
                  </div>
                </div>

                <div className="mt-5 px-2">
                  <h3 className="font-bold text-[#1a2b3b] text-base md:text-lg line-clamp-2 group-hover:text-[#E68736] transition-colors leading-snug">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedVid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-6 backdrop-blur-sm bg-black/80"
            onClick={() => { setSelectedVid(null); resume(); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl relative shadow-xl rounded-[2.5rem] overflow-hidden bg-black aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setSelectedVid(null); resume(); }}
                className="absolute top-6 right-6 z-[10001] p-3 bg-white/10 hover:bg-[#E68736] rounded-full text-white transition-all shadow-xl"
              >
                <X size={24} />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVid}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}