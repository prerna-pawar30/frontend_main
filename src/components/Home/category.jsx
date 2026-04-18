/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 1. Import apiService and remove axios/config
import apiService from "../../api/ApiService"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Icons and Assets
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "../../pages/HomeNew.css"; 

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

export default function Category() {
  const [exploreData, setExploreData] = useState({
    loading: true,
    data: [],
    error: null,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

const fetchCategories = async () => {
  try {
    const res = await apiService.getExploreItems();
    
    setExploreData({
      loading: false,
      // Access the specific categories array
      data: res.data?.data?.categories || [], 
      error: null,
    });
  } catch (err) {
    setExploreData({
      loading: false,
      data: [],
      error: "Failed to load categories",
    });
  }
};
    fetchCategories();
  }, []);

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="responsive-container">
        
        {/* Header Section */}
        <div className="mb-12 text-center" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-[#072434] mb-3">
            Explore Our <span className="text-[#E68736]">Categories</span>
          </h2>
          <p className="text-gray-500 text-lg">Digital dental precision</p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Navigation Buttons */}
          <button 
            id="cat-prev" 
            className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-50 p-2 text-[#072434] hover:text-[#E68736] transition-all duration-300 flex items-center justify-center"
          >
            <FiChevronLeft className="text-[30px] md:text-[40px]" strokeWidth={1.5} />
          </button>

          <button 
            id="cat-next" 
            className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-50 p-2 text-[#072434] hover:text-[#E68736] transition-all duration-300 flex items-center justify-center"
          >
            <FiChevronRight className="text-[30px] md:text-[40px]" strokeWidth={1.5} />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            navigation={{
              prevEl: "#cat-prev",
              nextEl: "#cat-next",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="w-full py-6 !static" 
          >
            {exploreData.loading ? (
              <div className="py-20 text-center text-gray-400">Loading digital precision...</div>
            ) : (
              exploreData.data.map((cat, i) => (
                <SwiperSlide key={cat.categoryId || cat._id || i}>
                  <div
                    className="category-card rounded-[25px] border-2 border-orange-200 p-6 flex flex-col items-center h-[360px]"
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    {/* Image Area */}
                    <div className="w-full h-48 flex items-center justify-center mb-6">
                      <img
                        src={cat.image || cat.imageUrl || cat.images?.[0]}
                        alt={cat.title || cat.name}
                        className="max-h-full object-contain transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    {/* Text Area */}
                    <div className="text-left w-full flex flex-col h-full">
                      <h3 className="text-[18px] font-bold text-[#072434] leading-tight">
                        {cat.title || cat.name}
                      </h3>

                      <a
                        href={`${SHOP_BASE_URL}/all-products?category=${cat._id}`}
                        className="mt-8 w-full flex items-center justify-center gap-2 bg-[#E68736] hover:bg-white hover:text-[#E68736] border border-orange-200 text-white py-2 rounded-xl text-[17px] font-bold transition-all active:scale-95"
                      >
                        <FiShoppingCart size={20} />
                        Shop Now
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}