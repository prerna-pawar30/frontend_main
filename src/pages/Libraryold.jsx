// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { HiDownload, HiSearch, HiX, HiMail, HiCheckCircle, HiCalendar } from "react-icons/hi";
// import { BrandUrl, BackendUrl } from "../config";
// import Swal from "sweetalert2";

// const CATEGORY_MAP = {
//   General: "GEN",
//   "Screw-Retained": "SCR",
//   "Abutment-Level": "ABT",
// };

// const SESSION_EXPIRY_MS = 10 * 60 * 1000;
// const downloadGeneralGuide = async () => {
//   try {
//     // This assumes the PDF is in your 'public' folder named 'Digident Library Guide.pdf'
//     const response = await fetch("/Library Guide.pdf");
    
//     if (!response.ok) throw new Error("File not found");

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
    
//     link.href = url;
//     link.setAttribute("download", "Digident-Library-Guide.pdf"); // The name the user will see
//     document.body.appendChild(link);
//     link.click();
    
//     // Cleanup
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Download failed:", error);
//     Swal.fire("Error", "Could not find the PDF file in the public folder.", "error");
//   }
// };
// const Library = () => {
//     // Track verified libraries in localStorage
//     const [verifiedLibraries, setVerifiedLibraries] = useState(() => {
//       try {
//         return new Set(JSON.parse(localStorage.getItem("verifiedLibraries") || "[]"));
//       } catch {
//         return new Set();
//       }
//     });
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [downloadingId, setDownloadingId] = useState(null);
//   const [downloadedIds, setDownloadedIds] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("General");
//   const [showModal, setShowModal] = useState(false);
//   const [modalReason, setModalReason] = useState("download");
//   const [isSending, setIsSending] = useState(false);
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [userExists, setUserExists] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(600);
//   const timerRef = useRef(null);
//   const [activeDownloadData, setActiveDownloadData] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     streetAddress: "",
//     city: "",
//     state: "",
//     country: "",
//     pincode: "",
//     mobileNumber: "",
//     email: "",
//     otp: "",
//   });

//   const cleanBaseUrl = BackendUrl.replace(/\/api\/v1\/.*/, "");
//   const backendBaseUrl = import.meta.env.VITE_BACKEND_URL ;

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   useEffect(() => {
//     if (!showModal) {
//       clearInterval(timerRef.current);
//       setOtpSent(false);
//       setUserExists(false);
//       setTimeLeft(600);
//       setFormData((prev) => ({ ...prev, otp: "" }));
//     }
//   }, [showModal]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(BrandUrl);
//         setBrands(res.data.data || []);
//       } catch (error) {
//         console.error("Failed to fetch brands:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (otpSent && timeLeft > 0 && !isEmailVerified) {
//       timerRef.current = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0) {
//       clearInterval(timerRef.current);
//       setOtpSent(false);
//       Swal.fire("Expired", "OTP expired. Please try again.", "warning");
//     }
//     return () => clearInterval(timerRef.current);
//   }, [otpSent, timeLeft, isEmailVerified]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const backendCategory = CATEGORY_MAP[selectedCategory];
//   const filteredBrands = brands.filter((brand) => {
//     const matchesSearch = brand.brandName?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = !backendCategory || brand.category?.toUpperCase() === backendCategory;
//     return matchesSearch && matchesCategory;
//   });

//  const handleDownloadClick = (brand) => {
//   // Always require verification before download
//   setActiveDownloadData(brand);
//   setModalReason("download");
//   setShowModal(true);

//   // Reset verification states every time
//   setIsEmailVerified(false);
//   setUserExists(false);
//   setOtpSent(false);

//   // Reset form completely
//   setFormData({
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     streetAddress: "",
//     city: "",
//     state: "",
//     country: "",
//     pincode: "",
//     mobileNumber: "",
//     email: "",
//     otp: "",
//   });
// };

//   const triggerEmailVerification = async () => {
//     if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
//       return Swal.fire("Invalid Email", "Enter a valid email", "error");
//     }
//     try {
//       setIsSending(true);
//       const payload = {
//         email: formData.email,
       
//       };

//       const res = await axios.post(`${backendBaseUrl}/api/v1/customerData/send-otp`, payload);

//       if (res.data.success && res.data.data?.isVerified) {
//         setIsEmailVerified(true);
//         setUserExists(true);
//         // Mark this library as verified
//         if (activeDownloadData?.libraryId) {
//           const updated = new Set(verifiedLibraries);
//           updated.add(activeDownloadData.libraryId);
//           setVerifiedLibraries(updated);
//           localStorage.setItem("verifiedLibraries", JSON.stringify(Array.from(updated)));
//         }
//         if (activeDownloadData) {
//           trackAndDownload(activeDownloadData);
//           setShowModal(false);
//           Swal.fire("Success", "Recognized! Starting download...", "success");
//         }
//       } else {
//         // This is a NEW user or unverified user -> Show OTP field
//         setOtpSent(true);
//         setUserExists(false); // They need to fill the full form
//         setTimeLeft(600);
//         Swal.fire("OTP Sent", "Please check your email for the code", "success");
//       }
//     } catch (err) {
//       Swal.fire("Error", err.response?.data?.message || "Verification failed", "error");
//     } finally {
//       setIsSending(false);
//     }
//   };

// const verifyOtpCode = async () => {
//   if (!formData.email || !formData.otp) {
//     return Swal.fire("Error", "Email and OTP are required", "error");
//   }

//   // If the user is recognized (exists), verify and download immediately
//   if (userExists) {
//     try {
//       setIsSending(true);
//       const res = await axios.post(`${backendBaseUrl}/api/v1/customerData/verify-otp`, {
//         email: formData.email,
//         otp: formData.otp,
//         // Send minimal data for existing users
//       });
//     console.log("OTP verification response for existing user:", res.status);
//       if (res.data.success) {
//         setIsEmailVerified(true);
//         trackAndDownload(activeDownloadData);
//         setShowModal(false);
//         Swal.fire("Success", "Verified! Download starting...", "success");
//       }  

//     } catch (err) {
//       Swal.fire("Error", "Invalid OTP", "error");
//     } finally {
//       setIsSending(false);
//     }
//   } else {
//     // NEW USER: Just "unlock" the profile form locally. 
//     // Do NOT call the API yet because we don't have their name/address.
//     setIsEmailVerified(true);
//     Swal.fire("Verified", "Please complete your profile to continue", "success");
//   }
// };

// const handleLeadSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     setIsSending(true);
//     const payload = {
//       email: formData.email,
//       otp: formData.otp, // Must include the OTP here!
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       mobileNumber: formData.mobileNumber,
//       companyName: formData.companyName,
//       address: {
//         line1: formData.streetAddress,
//         city: formData.city,
//         state: formData.state,
//         postalCode: formData.pincode,
//         country: formData.country,
//       },
      
//         libraryObjectId: activeDownloadData._id,
//         libraryId: activeDownloadData.libraryId,
//         brandName: activeDownloadData.brandName,
//         category: activeDownloadData.category,
     
//     };

//     const res = await axios.post(`${backendBaseUrl}/api/v1/customerData/verify-otp`, payload);

//     if (res.data.success) {
//       trackAndDownload(activeDownloadData);
//       setShowModal(false);
//       Swal.fire("Success", "Profile saved and download started!", "success");
//     }
//   } catch (err) {
//     // This will now catch the "length must be 5 characters" errors correctly
//     Swal.fire("Error", err.response?.data?.message || "Registration failed", "error");
//   } finally {
//     setIsSending(false);
//   }
// };

//   const trackAndDownload = async (brand) => {
//     if (!brand?.libraryId) return;
//     setDownloadingId(brand.libraryId);
//     try {
//       const response = await axios.get(
//         `https://library-server-mphx.onrender.com/api/library/download/${brand.libraryId}`,
//         { responseType: "blob" }
//       );
//       const blob = new Blob([response.data], { type: "application/zip" });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `${brand.displayName}-${CATEGORY_MAP[brand.category] || brand.category}.zip`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       setDownloadedIds((prev) => new Set(prev).add(brand.libraryId));
//     } catch (err) {
//       Swal.fire("Error", "Download failed", "error");
//     } finally {
//       setDownloadingId(null);
//     }
//   };

//   return (
//     <div className="min-h-screen py-10 md:py-12 px-4 md:px-6">
//       <div className="max-w-7xl mx-auto mb-6 md:mb-10 text-center">
//         <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 md:mb-4 uppercase tracking-tighter">
//           Library<span className="text-[#E68736]"> Guide</span>
//         </h1>
//       </div>

//       <div className="max-w-5xl mx-auto mb-6 md:mb-10 space-y-4 md:space-y-6">
//         <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-3 rounded-[1.5rem] md:rounded-xl border border-gray-200">
//           <div className="relative w-full md:w-80">
//             <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2.5 outline-none text-[15px]"
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="flex gap-1 md:gap-2 p-1 bg-slate-50 rounded-xl md:rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
//             {["General", "Screw-Retained", "Abutment-Level"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSelectedCategory(tab)}
//                 className={`whitespace-nowrap flex-1 md:flex-none px-4 md:px-4 py-2 rounded-lg md:rounded-xl text-[11px] md:text-[14px] font-bold transition-all duration-300 ${
//                   selectedCategory === tab ? "bg-[#E68736] text-white " : "text-slate-400 hover:text-slate-600"
//                 }`}
//               >
//                 {tab.toUpperCase()}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto mb-10">
//         <div className="relative overflow-hidden rounded-[1.5rem] md:rounded-1xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-12 text-white ">
//           <div className="absolute -top-20 -right-20 w-40 h-40 md:w-60 md:h-60 bg-[#E68736]/30 rounded-full blur-3xl"></div>
//           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//             <div className="text-center md:text-left">
//              <h2 className="text-xl md:text-4xl font-black uppercase tracking-tight mb-3">
//                 Download<span className="text-[#E68736]"> {selectedCategory} </span>Library Guide 
               
//               </h2>
//               <p className="text-slate-300 text-xs md:text-[16px] leading-relaxed max-w-md mx-auto md:mx-0">
//                 Access complete product documentation, technical specifications, and downloadable resources curated for
//                 your workflow.
//               </p>
//               <ul className="mt-4 space-y-2 text-[10px] md:text-[15px] font-semibold text-slate-200 hidden sm:block">
//                 <li>✔ Brand-wise organized files</li>
//                 <li>✔ Updated technical references</li>
//                 <li>✔ One-click ZIP downloads</li>
//               </ul>
//             </div>
//             <div className="flex justify-center md:justify-end">
//               <button
//                 onClick={downloadGeneralGuide}
//                 className="group flex items-center justify-center gap-3 w-full md:w-auto bg-[#E68736] hover:bg-white hover:text-[#E68736] text-white border border-[#E68736] px-6 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
//               >
//                 <HiDownload size={18} className="group-hover:scale-110 transition-transform" />
//                 Download Guide
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//        {/* Information Notice Section */}
// <div className="max-w-7xl mx-auto mb-8">
//   <div className="flex items-start gap-4 p-4 md:p-5 rounded-2xl bg-orange-50 border border-orange-200 ">
//     <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#E68736]">
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d=" orbit 13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     </div>
//     <div className="space-y-1">
//       <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Note</h4>
//       <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
//         *Rosen screw library is included in <span className="text-[#E68736] font-bold">GENERAL</span>. 
//         For more information, Please download the related library guide from above.
//       </p>
//     </div>
//   </div>
// </div>

//       {loading ? (
//         <div className="flex justify-center py-20">
//           <div className="w-10 h-10 border-2 border-t-[#E68736] rounded-full animate-spin"></div>
//         </div>
//       ) : filteredBrands.length === 0 ? (
//         <div className="text-center py-20 text-slate-300 font-bold uppercase tracking-widest text-sm">
//           No brands found
//         </div>
//       ) : (
//         <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
//           {filteredBrands.map((brand) => (
//             <div
//               key={brand.libraryId}
//               className="group bg-white rounded-[1.2rem] md:rounded-1xl border border-slate-300 hover:border-orange-200 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl md:hover:shadow-2xl"
//             >
//               {/* IMAGE DIV REMOVED FROM HERE */}
//               <div className="p-3 md:p-5 bg-slate-50/50 flex-1 flex flex-col justify-between">
//                 <div className="text-center mb-2 md:mb-4 space-y-2">
//                   <h3 className="font-bold text-slate-800 text-[10px] md:text-sm truncate uppercase">
//                     {brand.brandName}
//                   </h3>
                  
//                   <div className="flex items-center justify-center gap-1.5">
//                     <HiCalendar className="text-slate-400" size={12} />
//                     <span className="text-[8px] md:text-[11px] font-bold text-slate-500">
//                       Updated: <span className="text-slate-900">{formatDate(brand.updatedAt)}</span>
//                     </span>
//                   </div>

//                   <div className="flex justify-center">
//                     <span className="bg-white px-2 py-0.5 rounded-full border border-slate-200 text-[7px] md:text-[10px] text-slate-600 font-bold uppercase">
//                       Category: {brand.category}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleDownloadClick(brand)}
//                   disabled={downloadingId === brand.libraryId}
//                   className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-black text-[9px] md:text-[10px] tracking-widest transition-all duration-300 
//                     ${
//                       downloadedIds.has(brand.libraryId)
//                         ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
//                         : "bg-[#E68736] text-white hover:bg-[#d47629]"
//                     } 
//                     ${downloadingId === brand.libraryId ? "opacity-75 cursor-wait" : "active:scale-95"}`}
//                 >
//                   {downloadingId === brand.libraryId ? (
//                     <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   ) : downloadedIds.has(brand.libraryId) ? (
//                     <>
//                       <HiCheckCircle size={14} className="animate-in zoom-in" />
//                       DOWNLOADED
//                     </>
//                   ) : (
//                     <>
//                       <HiDownload size={14} />
//                       DOWNLOAD
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md">
//           <div className="bg-white w-full max-w-2xl h-full md:h-auto md:rounded-[2rem] shadow-2xl relative max-h-[90vh] overflow-y-auto">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-slate-900 z-10"
//             >
//               <HiX size={24} />
//             </button>

//             <form onSubmit={handleLeadSubmit} className="p-6 md:p-12">
//               <div className="mb-6 md:mb-8 mt-6 md:mt-0">
//                 <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase">
//                   {modalReason === "download" ? "Verify to Download" : "Join our Community"}
//                 </h2>
//                 <p className="text-slate-500 text-xs md:text-sm">Please verify your work email.</p>
//               </div>

//               <div className="bg-slate-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 mb-4 md:mb-6">
//                 <div className="flex flex-col gap-3">
//                   {/* Work Email */}
//                   <div className="flex-1 w-full">
//                     <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Work Email</label>
//                     <div className="relative">
//                       <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                       <input
//                         name="email"
//                         placeholder="email@company.com"
//                         required
//                         className="form-input-pro"
//                         onChange={handleInputChange}
//                         disabled={isEmailVerified}
//                         value={formData.email}
//                       />
//                     </div>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={triggerEmailVerification}
//                     disabled={isEmailVerified || isSending}
//                     className="w-full h-[48px] md:h-[52px] px-6 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase"
//                   >
//                     {isSending ? "Processing..." : isEmailVerified ? "Verified" : "Send OTP"}
//                   </button>
//                 </div>

//                 {/* OTP Section - always show, but disable if not sent or already verified */}
//                 <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-200">
//                   <div className="flex justify-between items-center mb-2 px-1">
//                     <span className="text-[10px] font-bold text-slate-400 uppercase">Enter Code</span>
//                     <span className="text-xs font-black text-[#E68736]">{formatTime(timeLeft)}</span>
//                   </div>
//                   <div className="flex gap-2 md:gap-4">
//                     <input
//                       name="otp"
//                       placeholder="OTP"
//                       className="form-input-pro text-center tracking-[0.3em] flex-1"
//                       onChange={handleInputChange}
//                       value={formData.otp}
//                       disabled={!otpSent || isEmailVerified}
//                     />
                   
//                   </div>
//                 </div>
//               </div>

//               {/* Profile fields - always show, but disable unless isEmailVerified && !userExists */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-2">
//                 <input
//                   name="firstName"
//                   placeholder="First Name"
//                   required
//                   className="form-input-pro !pl-4"
//                   onChange={handleInputChange}
//                   value={formData.firstName}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <input
//                   name="lastName"
//                   placeholder="Last Name"
//                   required
//                   className="form-input-pro !pl-4"
//                   onChange={handleInputChange}
//                   value={formData.lastName}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <input
//                   name="companyName"
//                   placeholder="Company"
//                   required
//                   className="form-input-pro !pl-4 md:col-span-2"
//                   onChange={handleInputChange}
//                   value={formData.companyName}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <input
//                   name="streetAddress"
//                   placeholder="Address"
//                   required
//                   className="form-input-pro !pl-4 md:col-span-2"
//                   onChange={handleInputChange}
//                   value={formData.streetAddress}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <input
//                   name="city"
//                   placeholder="City"
//                   required
//                   className="form-input-pro !pl-4"
//                   onChange={handleInputChange}
//                   value={formData.city}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <input
//                   name="state"
//                   placeholder="State"
//                   required
//                   className="form-input-pro !pl-4"
//                   onChange={handleInputChange}
//                   value={formData.state}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <input
//                   name="country"
//                   placeholder="Country"
//                   required
//                   className="form-input-pro !pl-4"
//                   onChange={handleInputChange}
//                   value={formData.country}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <input
//                   name="pincode"
//                   placeholder="Pincode"
//                   required
//                   className="form-input-pro !pl-4"
//                   onChange={handleInputChange}
//                   value={formData.pincode}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <input
//                   name="mobileNumber"
//                   placeholder="Mobile"
//                   required
//                   className="form-input-pro !pl-4 md:col-span-2"
//                   onChange={handleInputChange}
//                   value={formData.mobileNumber}
//                   disabled={!otpSent || isEmailVerified}
//                 />
//                 <button
//                   type="submit"
//                   className="md:col-span-2 bg-slate-900 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-xs"
//                   disabled={!otpSent || isEmailVerified}
//                 >
//                   Finish & Download
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//         .form-input-pro { width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; background: white; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; }
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `,
//         }}
//       />
//     </div>
//   );
// };

// export default Library;