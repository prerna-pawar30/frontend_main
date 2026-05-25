import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// API & Styles
import apiService from "../../api/ApiService"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../pages/HomeNew.css"; 

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BANNERS ================= */
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await apiService.getBanners();
        // Extract nested data based on your specific API structure
        const bannerList = res.data?.data?.banners || [];

        const activeBanners = bannerList
          .filter((b) => b.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder);

        setBanners(activeBanners);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  /* ================= AOS INIT ================= */
  useEffect(() => {
    const loadAOS = async () => {
      const AOS = (await import("aos")).default;
      await import("aos/dist/aos.css");
      AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
    };
    loadAOS();
  }, []);

  const showLoading = loading || banners.length === 0;

  return (
    <section className="py-14 md:py-20 bg-white w-full">
      <div className=" w-full">
        {showLoading ? (
          /* Matched Loading UI from Ecommerce */
          <div className="w-full rounded-3xl h-[410px] sm:h-[240px] md:h-[290px] lg:h-[380px] flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-[#E68736] rounded-full animate-spin"></div>
              <p className="mt-3 text-gray-600 font-medium">Loading...</p>
            </div>
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: "#hero-prev",
              nextEl: "#hero-next",
            }}
            loop={banners.length > 1}
            className="orange-pagination relative"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={banner._id || index}>
                <a
                  href={`${SHOP_BASE_URL}/all-products?bannerId=${banner.bannerId || banner._id}`}
                  className="block w-full h-full"
                >
                  <div className="w-full rounded-3xl overflow-hidden h-[110px] sm:h-[240px] md:h-[290px] lg:h-[380px] bg-gray-100">
                    <img
                      src={banner.imageUrl}
                      alt={`Banner ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                  </div>
                </a>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Arrows matched to Ecommerce style */}
            <button
              id="hero-prev"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white hover:text-[#E68736] cursor-pointer text-3xl hidden md:block"
            >
              ‹
            </button>
            <button
              id="hero-next"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white hover:text-[#E68736] cursor-pointer text-3xl hidden md:block"
            >
              ›
            </button>
          </Swiper>
        )}
      </div>
    </section>
  );
}