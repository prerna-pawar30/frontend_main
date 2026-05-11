/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 1. Import apiService and remove axios/config imports
import apiService from "../../api/ApiService"; 
import "../../pages/HomeNew.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";

export default function Testimonials() {
  const [testimonialData, setTestimonialData] = useState({
    loading: true,
    data: [],
    error: null,
  });

  const testimonialsSwiperRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 120,
    });

    const fetchTestimonials = async () => {
      try {
        // 2. Use the service method instead of axios.get(TestimonialsUrl)
        const res = await apiService.getTestimonials();
        
        setTestimonialData({
          loading: false,
          data: res.data?.data || [],
          error: null,
        });
      } catch (err) {
        setTestimonialData({
          loading: false,
          data: [],
          error: "Failed to load testimonials",
        });
      }
    };

    fetchTestimonials();
  }, []);

  // Logic: Hide the entire section if loading or if there are fewer than 3 testimonials
  if (testimonialData.loading || testimonialData.data.length < 3) {
    return null;
  }

  return (
    <section className="relative py-12 md:py-16 bg-white overflow-hidden md:overflow-visible">
      <div className="max-w-[1400px] mx-auto px-4 text-center relative z-10">
        <div data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#072434]">
            Our Testim<span className="text-[#E68736]">onials</span>
          </h2>

          <p className="text-gray-500 mb-6 md:mb-10 text-base md:text-lg">
            Smiles That Last <br className="hidden md:block" />
            Digident India Reviews
          </p>
        </div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={testimonialData.data.length > 3}
          freeMode
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            testimonialsSwiperRef.current = swiper;
          }}
          breakpoints={{
            640: { 
              slidesPerView: 2, 
              spaceBetween: 25,
              centeredSlides: false 
            },
            1024: { 
              slidesPerView: 3, 
              spaceBetween: 30,
              centeredSlides: false 
            },
          }}
          className="w-full py-4 md:py-8 testimonials-swiper"
        >
          {testimonialData.data.map((t, i) => (
            <SwiperSlide 
              key={t.reviewId || t._id || i} 
              className="flex justify-center h-auto py-6 md:py-10"
            >
              <div
                className="bg-white p-6 md:p-8 border-[1.5px] border-[#E68736] border-dashed text-left 
                           rounded-[30px] rounded-bl-none
                           shadow-[0_10px_20px_rgba(220,130,50,0.15)]
                           transition-all duration-300 w-full max-w-[350px] md:max-w-[400px] 
                           min-h-[260px] md:min-h-[320px] h-full flex flex-col" 
                onMouseEnter={() => testimonialsSwiperRef.current?.autoplay?.stop()}
                onMouseLeave={() => testimonialsSwiperRef.current?.autoplay?.start()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-[#072434] text-lg md:text-xl truncate max-w-[150px] md:max-w-none">
                      {t.user
                        ? `${t.user.firstName} ${t.user.lastName || ""}`
                        : "Verified User"}
                    </p>
                    <div className="flex text-[#E68736] mt-1 text-xs md:text-base">
                      {"★".repeat(Math.round(t.rating))}
                      <span className="text-gray-300">
                        {"★".repeat(5 - Math.round(t.rating))}
                      </span>
                    </div>
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-[#072434]">{t.rating}</span>
                </div>

                <p className="text-[12px] md:text-sm font-semibold text-[#E68736] mb-3 uppercase tracking-wider">
                  {t.productName || "Product Review"}
                </p>

                <div className="text-gray-600 text-sm md:text-[16px] leading-relaxed italic overflow-hidden flex-1 line-clamp-5 md:line-clamp-6">
                  "{t.comment}"
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}