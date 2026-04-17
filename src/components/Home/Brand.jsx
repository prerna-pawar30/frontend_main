import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 1. Import apiService and remove axios/config
import apiService from "../../api/ApiService"; 
import "../../pages/HomeNew.css"; 

const SHOP_BASE_URL = import.meta.env.VITE_SHOP_URL;

export default function Brands() {
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      offset: 120,
    });

    const onLoad = () => AOS.refresh();
    window.addEventListener("load", onLoad);

    const fetchBrands = async () => {
      try {
        // 2. Use the service method instead of axios.get(BrandLogoUrl)
        const res = await apiService.getBrandLogos();
        
        // Ensure you are targeting the correct data path from your API response
        setBrandData(res.data?.data?.brands || []);
      } catch (err) {
        console.error("Failed to load brands", err);
        setBrandData([]);
      }
    };

    fetchBrands();

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <section className="py-12 bg-white" data-aos="fade-up">
      <div className="responsive-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-[#1a2b3b]">
          Let’s Begin with the{" "}
          <span className="text-[#E68736]">Brand You Use</span>
        </h2>

        <div className="bg-[#F7E6DC] rounded-[2.5rem] border border-[#F0CDBE] p-6 sm:p-12 text-center">
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
            gap-4 sm:gap-6 md:gap-8 items-stretch"
          >
            {brandData.map((brand, idx) => (
              <a
                key={brand.brandId || brand._id}
                href={`${SHOP_BASE_URL}/all-products?brand=${brand._id}`}
                className="brand-card bg-white rounded-xl p-3 sm:px-6 sm:py-4
                text-[#072434] flex items-center justify-start
                gap-3 sm:gap-4 transition-all duration-300 min-h-[70px]"
                data-aos="zoom-in"
                data-aos-delay={idx * 40}
              >
                <span
                  className="bg-[#E68736] text-white text-[10px] sm:text-xs font-bold 
                  w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 flex items-center justify-center 
                  rounded-full shadow-md"
                >
                  ✓
                </span>

               <div className="flex items-baseline gap-0.5 overflow-hidden">
                  <span className="text-sm sm:text-xl font-semibold text-[#011632] truncate">
                    {brand.brandName}
                  </span>
                  <span className="text-[10px] sm:text-sm text-[#011632] font-bold">
                    ®
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}