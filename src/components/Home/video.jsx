/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// 1. Import apiService and remove axios/config
import apiService from "../../api/ApiService"; 
import "../../pages/HomeNew.css";

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVid, setSelectedVid] = useState(null);
  const scrollRef = useRef(null);

  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
const fetchVideos = async () => {
  try {
    setLoading(true);
    const res = await apiService.getYtVideos();
    
    // FIX: Access res.data.data.videos instead of res.data.videos
    const videoList = res.data?.data?.videos || [];
    
    const formattedVideos = videoList.map(vid => ({
      id: vid.ytVideoId || vid._id,
      vId: getYouTubeID(vid.link),
      title: vid.title,
      category: "Education" 
    }));
    
    setVideos(formattedVideos);
  } catch (err) {
    console.error("Failed to fetch YouTube videos:", err);
  } finally {
    setLoading(false);
  }
};
    fetchVideos();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 400;
      scrollRef.current.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center bg-white">
        <Loader2 className="animate-spin text-[#E68736]" size={40} />
      </div>
    );
  }

  if (videos.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-white relative overflow-hidden">
      <div className="responsive-container relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#1a2b3b]">
              Our Video <span className="text-[#E68736]">Gallery</span>
            </h2>
            <p className="text-[#525b65] font-medium text-base md:text-lg max-w-lg">
              Precision demonstrations for modern dentistry
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => scroll("left")} className="p-3 rounded-full border border-[#f0e6e0] hover:bg-[#E68736] hover:text-white transition-all shadow-sm bg-white active:scale-95">
              <ChevronLeft size={22} />
            </button>
            <button onClick={() => scroll("right")} className="p-3 rounded-full border border-[#f0e6e0] hover:bg-[#E68736] hover:text-white transition-all shadow-sm bg-white active:scale-95">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Video Cards Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto pb-8 no-scrollbar snap-x touch-pan-x"
        >
          {videos.map((video) => (
            <div
                key={video.id}
                onClick={() => setSelectedVid(video.vId)}
                className="w-[300px] md:w-[380px] flex-shrink-0 snap-start group cursor-pointer"
              >
                <div className="relative h-[200px] md:h-[240px] rounded-[2rem] overflow-hidden border border-[#f0e6e0] shadow-sm transition-all duration-500 group-hover:shadow-xl md:group-hover:-translate-y-2">
                  <img
                    src={`https://img.youtube.com/vi/${video.vId}/hqdefault.jpg`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={video.title}
                  />

                  {/* Play Overlay */}
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

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedVid && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-6 backdrop-blur-lg bg-black/80"
            onClick={() => setSelectedVid(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl relative shadow-2xl rounded-[2.5rem] overflow-hidden bg-black aspect-video"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVid(null)} 
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
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}