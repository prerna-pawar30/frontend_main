/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiService from "../api/ApiService"; 

// Child Components
import LibraryHeader from "../components/library/LibraryHeader";
import LibraryFilters from "../components/library/LibraryFilters";
import LibraryHero from "../components/library/LibraryHero";
import LibraryCard from "../components/library/LibraryCard";
import VerificationModal from "../components/library/VerificationModal";

const CATEGORY_MAP = {
  General: "GEN",
  "Screw-Retained": "SCR",
  "Abutment-Level": "ABT",
};

const Library = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [showModal, setShowModal] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadedIds, setDownloadedIds] = useState(new Set());
  const [activeDownloadData, setActiveDownloadData] = useState(null);

  useEffect(() => {
    const fetchExternalData = async () => {
      try {
        setLoading(true);
        // Calling the external fetch method from apiService
        const res = await apiService.getExternalBrands();
        
        // Ensure we handle the data structure correctly
        const dataArray = res?.data?.data || res?.data;
        setBrands(Array.isArray(dataArray) ? dataArray : []);
      } catch (error) {
        console.error("Failed to fetch external brands:", error);
        setBrands([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExternalData();
  }, []);

  const handleDownloadClick = (brand) => {
    setActiveDownloadData(brand);
    setShowModal(true);
  };

  const trackAndDownload = async (brand) => {
    if (!brand?.libraryId) return;
    setDownloadingId(brand.libraryId);
    try {
      const response = await apiService.downloadLibrary(brand.libraryId);
      
      const blob = new Blob([response.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      const fileName = brand.displayName || brand.brandName || "library";
      link.download = `${fileName}-${CATEGORY_MAP[brand.category] || brand.category}.zip`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadedIds((prev) => new Set(prev).add(brand.libraryId));
    } catch (err) {
      console.error("Download error:", err);
      Swal.fire("Error", "Download failed", "error");
    } finally {
      setDownloadingId(null);
    }
  };

  const backendCategory = CATEGORY_MAP[selectedCategory];
  const filteredBrands = (brands || []).filter((brand) => {
    const matchesSearch = brand.brandName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !backendCategory || brand.category?.toUpperCase() === backendCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-10 md:py-12 px-4 md:px-6">
      <LibraryHeader />
      
      <LibraryFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <LibraryHero selectedCategory={selectedCategory} />

      {/* Note & Request Sections */}
      <div className="max-w-7xl mx-auto mb-8 space-y-4">
        <div className="flex items-start gap-4 p-4 md:p-5 rounded-2xl bg-orange-50 border border-orange-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#E68736]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Note</h4>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              *Rosen screw library is included in <span className="text-[#E68736] font-bold">GENERAL</span>. 
              For more information, Please download the related library guide from above.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 md:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#E68736]/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E68736]/10 border border-[#E68736]/20 flex items-center justify-center text-[#E68736]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm md:text-base font-black text-white uppercase tracking-tight">
                Request <span className="text-[#E68736]">Scanbridge</span> Library
              </h4>
              <p className="text-slate-400 text-[11px] md:text-xs font-medium">
                Send a request to get a scanbridge library as per your requirement.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveDownloadData({ brandName: "Scanbridge Request", type: "request" });
              setShowModal(true);
            }}
            className="relative z-10 w-full md:w-auto px-8 py-3 bg-[#E68736] hover:bg-white hover:text-[#E68736] text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 active:scale-95 shadow-lg"
          >
            Send Request
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-t-[#E68736] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredBrands.map((brand) => (
            <LibraryCard 
              key={brand.libraryId || brand.id} 
              brand={brand} 
              onDownloadClick={handleDownloadClick}
              isDownloading={downloadingId === brand.libraryId}
              isDownloaded={downloadedIds.has(brand.libraryId)}
            />
          ))}
          {filteredBrands.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-300 font-bold uppercase tracking-widest text-sm">
              No brands found
            </div>
          )}
        </div>
      )}

      {showModal && (
        <VerificationModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          activeDownloadData={activeDownloadData}
          onSuccess={trackAndDownload}
        />
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Library;