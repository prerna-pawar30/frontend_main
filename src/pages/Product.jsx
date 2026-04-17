/* eslint-disable no-unused-vars */
"use client";

import { Tabs } from "../components/ui/tabs";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

// Assets
import scanBody1 from "../assets/products/labanalog.webp";
import scanBody2 from "../assets/products/scanbody1.webp";
import aboutmentImg from "../assets/products/aboutment.webp";
import screwImg from "../assets/products/screw.webp";

export default function Products() {
  const navigate = useNavigate(); // 2. Initialize navigate

  const tabs = [
    {
      title: "Scan Body",
      value: "scan-body",
      content: (
        <ProductCard
          title="Scan Body"
          image={scanBody2}
          link="/product/scanbody" // 3. Add the specific route link
          mobileDesc="Engineered with integrated internal threading to securely retain fixation screws, ensuring precision during intraoral scanning."
          desktopDesc="The scan body is engineered with an integrated internal threading mechanism that securely retains the fixation screw, eliminating the risk of screw disengagement during clinical handling or intraoral scanning procedures. Its geometry and surface characteristics are optimized to deliver high dimensional accuracy and superior scan fidelity, enabling precise digital impression capture."
          bgColor="bg-[#FFAA5F]"
        />
      ),
    },
    {
      title: "Lab Analog",
      value: "lab-analog",
      content: (
        <ProductCard
          title="Lab Analog"
          image={scanBody1}
          link="/product/lab-analog" // Link for Lab Analog
           mobileDesc="Incorporates the TrueAlign™ Concept for exact 90° orthogonal alignment between side and bottom screw interfaces."
          desktopDesc="The Lab Analog incorporates the proprietary TrueAlign™ Concept, a precision-engineered feature designed to ensure exact positional alignment between the lab analog body, side screw, and bottom screw interface. This design achieves a true 90° orthogonal alignment between the side and bottom screw axes, enabling a precise and repeatable fit during laboratory workflows."
          bgColor="bg-[#FFC89A]"
        />
      ),
    },
    {
      title: "Abutment",
      value: "abutment",
      content: (
        <ProductCard
          title="Abutment"
          image={aboutmentImg}
          link="/product/abutment" // Link for Abutment
           mobileDesc="Precision-engineered for exact vertical height control, preventing food lodgement and ensuring proper seating."
          desktopDesc="The CuraVex™ Abutment System is precision-engineered to deliver exact vertical height control, preventing food lodgement and ensuring proper prosthetic seating. It features micro-incremental height options and integrated 55° angular reference markings to facilitate precise trimming, particularly beneficial in complex implant angulations."
          bgColor="bg-[#FFD8B5]"
        />
      ),
    },
    {
      title: "Screw",
      value: "screw",
      content: (
        <ProductCard
          title="Screw"
          image={screwImg}
          link="/product/screw" // Link for Screw
         mobileDesc="Advanced captive screw architecture that eliminates the need for conventional screwdrivers and access holes."
          desktopDesc="The Next-Gen Captive Screw is an advanced fastening solution engineered to redefine precision. Its innovative screw-top architecture eliminates the need for a conventional screwdriver and removes the traditional screw access hole entirely. Offered in Standard and PVD-Coated finishes, it ensures secure fixation while simplifying laboratory and clinical workflows."
          bgColor="bg-[#FFD8B5]"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen py-8 md:py-12 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-[#072434]">
        Our Products
      </h1>
      <div className="h-[32rem] md:h-[46rem] pb-30 [perspective:1000px] relative flex flex-col max-w-6xl mx-auto w-full items-start justify-start px-4">
        <Tabs
          tabs={tabs}
          activeTabClassName="bg-[#ffaa5fff]"
          tabClassName="text-[#072434] font-bold text-[10px] sm:text-xs md:text-base px-2 md:px-4 "
        />
      </div>
    </div>
  );
}

// 4. Update ProductCard to accept 'link' prop
function ProductCard({ title, image, mobileDesc, desktopDesc, bgColor, link }) {
  const navigate = useNavigate();
  const isOrange = bgColor.includes("#ffaa5fff");

  return (
    <div
      className={`group w-full relative h-full rounded-[1.0rem] p-6 md:p-40 md:pt-10 md:pb-10 ${bgColor} shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden transition-all duration-300`}
    >
      <div className="text-center flex-none">
        <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-6 tracking-tight text-[#072434]">
          {title}
        </h2>
        
        <p className={`md:hidden font-medium text-[14px] leading-snug px-2 ${isOrange ? "text-white/95" : "text-black/80"}`}>
          {mobileDesc}
        </p>

        <p className={`hidden md:block font-medium text-base lg:text-[18px] px-6 leading-relaxed ${isOrange ? "text-white/90" : "text-black/80"}`}>
          {desktopDesc}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center mt-4 md:mt-10 relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          style={{ maxHeight: "280px" }}
        />
      </div>

      {/* --- RE-LINKED HOVER BUTTON --- */}
<div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
  <button 
    className="border-2 border-white text-black px-4 py-2 rounded-xl text-xs md:text-[14px] font-bold shadow-lg 
               /* Mobile: Visible and reset position */
               opacity-100 translate-y-0 
               /* Desktop: Hidden by default, show only on hover */
               md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 
               transition-all duration-300 active:scale-95 hover:bg-white"
    onClick={() => navigate(link)}
  >
    View More
  </button>
</div>
    </div>
  );
}