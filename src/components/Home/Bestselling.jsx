/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 1. Import apiService and remove axios/config imports
import apiService from "../../api/ApiService"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Icons and Assets
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "../../pages/HomeNew.css"; // Ensure your CSS is imported

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

export default function Bestselling() {
  const [bestSellingData, setBestSellingData] = useState({
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

    const fetchBestSelling = async () => {
      try {
        // 2. Use the service method instead of axios.get(BestSellingUrl)
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

  // --- LOGIC: Hide section if loading OR if there are fewer than 4 items ---
  if (bestSellingData.loading || bestSellingData.data.length < 4) {
    return null;
  }

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Header Section */}
        <div className="mb-12" data-aos="fade-down">
          <h2 className="text-4xl md:text-5xl font-bold text-[#072434] mb-3">
            Best Selling <span className="text-[#E68736]">Range</span>
          </h2>
          <p className="text-gray-500 text-lg">Our most trusted collection</p>
        </div>

        {/* Carousel Container */}
        <div className="relative group px-4 md:px-0 ">
          {/* Navigation Buttons */}
         <button 
            id="best-prev" 
            className="absolute left-0 md:left-[-40px] lg:left-[-70px] top-1/2 -translate-y-1/2 z-50 p-1 text-[#072434] hover:text-[#E68736] transition-all duration-300 flex items-center justify-center bg-white/80 md:bg-transparent rounded-full shadow-sm md:shadow-none"
          >
            <FiChevronLeft className="text-[28px] md:text-[40px]" strokeWidth={1.5} />
          </button>

          <button 
            id="best-next" 
            className="absolute right-0 md:right-[-40px] lg:right-[-70px] top-1/2 -translate-y-1/2 z-50 p-1 text-[#072434] hover:text-[#E68736] transition-all duration-300 flex items-center justify-center bg-white/80 md:bg-transparent rounded-full shadow-sm md:shadow-none"
          >
            <FiChevronRight className="text-[28px] md:text-[40px]" strokeWidth={1.5} />
          </button>

          <Swiper
            modules={[Navigation]}
           spaceBetween={20} // Reduced space for mobile
            slidesPerView={1.2} // Shows a peek of the next slide on mobile
            navigation={{
              prevEl: "#best-prev",
              nextEl: "#best-next",
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="w-full h-full py-4 !static" 
          >
            {bestSellingData.data.map((b, i) => (
              <SwiperSlide key={b.productId || i} className="h-auto">
                <div
                  className="category-card rounded-[25px] border border-gray-200 bg-white p-6 flex flex-col h-[350px] transition-all duration-300 hover:shadow-md"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  {/* Image Area */}
                  <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={Array.isArray(b.images) ? b.images[0] : (b.image || b.images)}
                      alt={b.name}
                      className="max-h-full object-contain transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* Text Area */}
                  <div className="text-left w-full flex flex-col flex-grow">
                    <h3 className="text-[16px] font-bold text-[#072434] leading-tight line-clamp-2 mb-4">
                      {b.name} Compatible {b.category?.name}
                    </h3>
                    
                    <div className="flex w-full">
                      <a
                        href={`${SHOP_BASE_URL}/hot-selling?product=${b.productId}`}
                        className="w-full flex items-center justify-center gap-2 bg-[#E68736] hover:bg-white hover:text-[#E68736] border border-[#E68736] text-white py-2 rounded-xl text-[17px] font-bold transition-all  active:scale-95"
                      >
                        <FiShoppingCart size={20} />
                        Shop Now
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View More Button */}
        <div className="mt-12">
          <a
            href={`${SHOP_BASE_URL}/hot-selling`}
            className="inline-block bg-[#f3d3b6] hover:bg-[#E68736] text-[#E68736] hover:text-white py-4 px-12 rounded-xl font-bold text-xl transition-all duration-300"
          >
            View More
          </a>
        </div>
      </div>
    </section>
  );
}