import React from 'react';
import { HiSearch } from "react-icons/hi";

const LibraryFilters = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => (
  <div className="max-w-5xl mx-auto mb-6 md:mb-10 space-y-4 md:space-y-6">
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-3 rounded-[1.5rem] md:rounded-xl border border-gray-200">
      <div className="relative w-full md:w-80">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          className="w-full pl-10 pr-4 py-2.5 outline-none text-[15px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-1 md:gap-2 p-1 bg-slate-50 rounded-xl md:rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
        {["General", "Screw-Retained", "Abutment-Level"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedCategory(tab)}
            className={`whitespace-nowrap flex-1 md:flex-none px-4 md:px-4 py-2 rounded-lg md:rounded-xl text-[11px] md:text-[14px] font-bold transition-all duration-300 ${
              selectedCategory === tab ? "bg-[#E68736] text-white " : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default LibraryFilters;