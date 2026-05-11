import React from 'react';
import { HiCalendar, HiDownload, HiCheckCircle } from "react-icons/hi";

const LibraryCard = ({ brand, onDownloadClick, isDownloading, isDownloaded }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="group bg-white rounded-2xl border border-orange-200 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-lg">
      
      {/* Top accent bar */}
      <div className="h-1 w-full bg-orange-50 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-[#fbd3bc] via-[#E68736] to-[#fbd3bc] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
      </div>

      <div className="p-4 md:p-5 flex flex-col gap-4">

        {/* Brand Name */}
        <div className="text-center">
          <h3 className="font-extrabold text-[#011632] text-[11px] md:text-sm uppercase tracking-wider truncate">
            {brand.brandName}
          </h3>
        </div>

        {/* Info Pills */}
        <div className="flex flex-col items-center gap-2">

          {/* Date */}
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 rounded-full px-3 py-1">
            <HiCalendar className="text-[#E68736]" size={11} />
            <span className="text-[8px] md:text-[10px] font-semibold text-gray-500">
              Updated: <span className="text-[#011632] font-bold">{formatDate(brand.updatedAt)}</span>
            </span>
          </div>

          {/* Category */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E68736] flex-shrink-0" />
            <span className="text-[8px] md:text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
              {brand.category}
            </span>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Download Button */}
        <button
          onClick={() => onDownloadClick(brand)}
          disabled={isDownloading}
          className={`
            w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
            font-bold text-[9px] md:text-[10px] tracking-widest uppercase
            transition-all duration-300
            ${isDownloaded
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-gradient-to-r from-[#f6811b] to-[#fbd3bc] text-white hover:from-[#e07010] hover:to-[#f6c4a8] hover:shadow-md hover:shadow-orange-100"
            }
            ${isDownloading ? "opacity-70 cursor-wait" : "active:scale-95"}
          `}
        >
          {isDownloading ? (
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isDownloaded ? (
            <>
              <HiCheckCircle size={13} />
              Downloaded
            </>
          ) : (
            <>
              <HiDownload size={13} />
              Download
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default LibraryCard;