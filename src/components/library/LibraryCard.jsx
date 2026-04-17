import React from 'react';
import { HiCalendar, HiDownload, HiCheckCircle } from "react-icons/hi";

const LibraryCard = ({ brand, onDownloadClick, isDownloading, isDownloaded }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <div className="group bg-white rounded-[1.2rem] md:rounded-1xl border border-slate-300 hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl md:hover:shadow-2xl">
      <div className="p-3 md:p-5 bg-slate-50/50 flex-1 flex flex-col justify-between">
        <div className="text-center mb-2 md:mb-4 space-y-2">
          <h3 className="font-bold text-slate-800 text-[10px] md:text-sm truncate uppercase">
            {brand.brandName}
          </h3>
          <div className="flex items-center justify-center gap-1.5">
            <HiCalendar className="text-slate-400" size={12} />
            <span className="text-[8px] md:text-[11px] font-bold text-slate-500">
              Updated: <span className="text-slate-900">{formatDate(brand.updatedAt)}</span>
            </span>
          </div>
          <div className="flex justify-center">
            <span className="bg-white px-2 py-0.5 rounded-full border border-slate-200 text-[7px] md:text-[10px] text-slate-600 font-bold uppercase">
              Category: {brand.category}
            </span>
          </div>
        </div>

        <button
          onClick={() => onDownloadClick(brand)}
          disabled={isDownloading}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-black text-[9px] md:text-[10px] tracking-widest transition-all duration-300 
            ${isDownloaded ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-[#E68736] text-white hover:bg-[#d47629]"} 
            ${isDownloading ? "opacity-75 cursor-wait" : "active:scale-95"}`}
        >
          {isDownloading ? (
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isDownloaded ? (
            <>
              <HiCheckCircle size={14} className="animate-in zoom-in" />
              DOWNLOADED
            </>
          ) : (
            <>
              <HiDownload size={14} />
              DOWNLOAD
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LibraryCard;