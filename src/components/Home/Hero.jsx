import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 1. Import apiService and remove axios/config
import apiService from "../../api/ApiService"; 
import "../../pages/HomeNew.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BANNERS ================= */
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        // 2. Use the service method instead of axios.get(BannerUrl)
        const res = await apiService.getBanners();
        
        const activeBanners =
          res.data?.data
            ?.filter(b => b.isActive)
            ?.sort((a, b) => a.displayOrder - b.displayOrder) || [];

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
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out", offset: 120 });
    const refresh = () => AOS.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[100px] sm:h-[260px] md:h-[300px] lg:h-[390px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E68736]"></div>
      </div>
    );
  }

  return (
    <section className="pt-24 pb-6 bg-white w-full">
      <div className="responsive-container">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{ prevEl: "#hero-prev", nextEl: "#hero-next" }}
          loop={banners.length > 1}
          className="orange-pagination w-full relative"
        >
          <button id="hero-prev" className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20">
            <i className="bi bi-chevron-left text-4xl text-white hover:text-[#E68736]" />
          </button>

          {banners.map((banner, index) => (
            <SwiperSlide key={banner._id}>
              <a
                href={`${SHOP_BASE_URL}/all-products?bannerId=${banner.bannerId || banner._id}`}
                className="block w-full h-full"
              >
                <div className="w-full rounded-3xl overflow-hidden h-[150px] sm:h-[230px] md:h-[290px] lg:h-[420px] bg-gray-100">
                  <img
                    src={banner.imageUrl}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"} 
                  />
                </div>
              </a>
            </SwiperSlide>
          ))}

          <button id="hero-next" className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <i className="bi bi-chevron-right text-4xl text-white hover:text-[#E68736]" />
          </button>
        </Swiper>
      </div>
    </section>
  );
}