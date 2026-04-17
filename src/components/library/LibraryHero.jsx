/* eslint-disable no-unused-vars */
import React from 'react';
import { HiDownload } from "react-icons/hi";
import Swal from "sweetalert2";

const LibraryHero = ({ selectedCategory }) => {
  const downloadGeneralGuide = async () => {
    try {
      const response = await fetch("/Library Guide.pdf");
      if (!response.ok) throw new Error("File not found");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Digident-Library-Guide.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      Swal.fire("Error", "Could not find the PDF file in the public folder.", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-1xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-12 text-white">
        <div className="absolute -top-20 -right-20 w-40 h-40 md:w-60 md:h-60 bg-[#E68736]/30 rounded-full blur-3xl"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-4xl font-black uppercase tracking-tight mb-3">
              Download<span className="text-[#E68736]"> {selectedCategory} </span>Library Guide
            </h2>
            <p className="text-slate-300 text-xs md:text-[16px] leading-relaxed max-w-md mx-auto md:mx-0">
              Access complete product documentation, technical specifications, and downloadable resources.
            </p>
            <ul className="mt-4 space-y-2 text-[10px] md:text-[15px] font-semibold text-slate-200 hidden sm:block">
              <li>✔ Brand-wise organized files</li>
              <li>✔ Updated technical references</li>
              <li>✔ One-click ZIP downloads</li>
            </ul>
          </div>
          <div className="flex justify-center md:justify-end">
            <button
              onClick={downloadGeneralGuide}
              className="group flex items-center justify-center gap-3 w-full md:w-auto bg-[#E68736] hover:bg-white hover:text-[#E68736] text-white border border-[#E68736] px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              <HiDownload size={18} className="group-hover:scale-110 transition-transform" />
              Download Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryHero;