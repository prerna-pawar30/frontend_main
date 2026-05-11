// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import axios from "axios";

// import { BrandLogoUrl } from "../../config";
// import "../../pages/HomeNew";

// export default function Brandlogo() {
//   const [brandLogos, setBrandLogos] = useState([]);

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//       easing: "ease-in-out",
//       offset: 120,
//     });

//     const fetchBrandLogos = async () => {
//       try {
//         const res = await axios.get(BrandLogoUrl);
//         setBrandLogos(
//           res.data?.data?.brands
//             ?.map(b => b.logoUrl || b.file)
//             .filter(Boolean) || []
//         );
//       } catch (err) {
//         console.error("Failed to load brand logos", err);
//         setBrandLogos([]);
//       }
//     };

//     fetchBrandLogos();
//   }, []);

//   return (
//     <>
//       {/* ================= COMPATIBILITY ================= */}
//       <section className="bg-white" data-aos="fade-up">
//         <div className="py-12 mx-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-10">
//             Engineered for{" "}
//             <span className="text-[#E68736]">Compatibility With</span>
//           </h2>

//           <div className="bg-[#F7E6DC] border border-[#F0CDBE] rounded-3xl p-8">
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
//               {brandLogos.map((logo, i) => (
//                 <div
//                   key={i}
//                   className="bg-white rounded-xl flex items-center justify-center 
//                   h-[110px] w-full shadow-sm"
//                   data-aos="zoom-in"
//                   data-aos-delay={i * 60}
//                 >
//                   <img
//                     src={logo}
//                     alt="Brand logo"
//                     className="h-[90px] object-contain"
//                     loading="lazy"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
