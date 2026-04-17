/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { HiX, HiMail, HiTag, HiCube } from "react-icons/hi";
import apiService from '../../api/ApiService'; // Ensure the path to your apiService.js is correct

const VerificationModal = ({ isOpen, onClose, activeDownloadData, onSuccess }) => {
  const [isSending, setIsSending] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const timerRef = useRef(null);

  const [availableBrands, setAvailableBrands] = useState([]);
  const [fetchingBrands, setFetchingBrands] = useState(false);

  const isRequest = activeDownloadData?.type === "request";

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", companyName: "", streetAddress: "",
    city: "", state: "", country: "", pincode: "", mobileNumber: "", email: "", otp: "",
    requestBrand: "", 
    requestCategory: "Scanbridge" 
  });

  // Fetch brands using apiService
  useEffect(() => {
    if (isRequest && isOpen) {
      const getBrands = async () => {
        try {
          setFetchingBrands(true);
          const res = await apiService.getBrandLogos();
          const brandArray = res.data?.data?.brands || [];
          if (Array.isArray(brandArray)) {
            const uniqueNames = [...new Set(brandArray
              .map(item => item.brandName)
              .filter(name => name)
            )].sort();
            setAvailableBrands(uniqueNames);
          }
        } catch (err) {
          console.error("Error fetching brands for dropdown:", err);
        } finally {
          setFetchingBrands(false);
        }
      };
      getBrands();
    }
  }, [isRequest, isOpen]);

  // Timer logic for OTP
  useEffect(() => {
    if (otpSent && timeLeft > 0 && !isEmailVerified) {
      timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setOtpSent(false);
    }
    return () => clearInterval(timerRef.current);
  }, [otpSent, timeLeft, isEmailVerified]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const triggerEmailVerification = async () => {
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return Swal.fire("Invalid Email", "Enter a valid email", "error");
    }
    try {
      setIsSending(true);
      // Using apiService to send OTP
      const res = await apiService.sendOtp(formData.email);
      
      if (res.data.success && res.data.data?.isVerified) {
        setIsEmailVerified(true);
        setUserExists(true);
        if (!isRequest) {
          onSuccess?.(activeDownloadData);
          onClose();
        }
      } else {
        setOtpSent(true);
        setUserExists(false);
        setTimeLeft(600);

        Swal.fire({
          title: "OTP Sent!",
          text: "Your verification code has been sent to your email.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Verification failed", "error");
    } finally {
      setIsSending(false);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (isRequest && !formData.requestBrand) {
      return Swal.fire("Required", "Please select a brand", "warning");
    }

    try {
      setIsSending(true);
      const payload = {
        email: formData.email,
        otp: formData.otp,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        companyName: formData.companyName,
        address: {
          line1: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          postalCode: formData.pincode,
          country: formData.country
        },
        libraryObjectId: activeDownloadData?._id,
        libraryId: activeDownloadData?.libraryId,
        brandName: isRequest ? formData.requestBrand : activeDownloadData?.brandName,
        category: isRequest ? formData.requestCategory : activeDownloadData?.category,
      };

      // Using apiService to verify OTP and submit data
      const res = await apiService.verifyOtp(payload);

      if (res.data.success) {
        if (!isRequest) {
          onSuccess?.(activeDownloadData);
        }
        onClose();
        Swal.fire("Success", isRequest ? "Request Sent!" : "Download Started!", "success");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Action failed";
      Swal.fire("Error", errorMsg, "error");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl h-fit max-h-[95vh] rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-all z-20"
        >
          <HiX size={20} />
        </button>

        {/* Header Section */}
        <div className="px-8 pt-10 pb-6 bg-white sticky top-0 z-10">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase">
            {isRequest ? "Scanbridge Request" : "Verify to Download"}
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            {isRequest ? "Specify the brand you need files for." : "Please verify your work email to proceed."}
          </p>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleLeadSubmit} className="px-8 pb-10 overflow-y-auto custom-scrollbar">
          
          {/* Email Verification Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Work Email</label>
                <div className="relative">
                  <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  <input 
                    name="email" 
                    placeholder="email@company.com" 
                    required 
                    className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-all disabled:bg-white disabled:text-slate-500" 
                    onChange={handleInputChange} 
                    disabled={isEmailVerified} 
                    value={formData.email} 
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button 
                  type="button" 
                  onClick={triggerEmailVerification} 
                  disabled={isEmailVerified || isSending} 
                  className={`w-full h-12 px-6 rounded-xl font-bold text-xs uppercase transition-all shadow-sm ${
                    isEmailVerified 
                    ? "bg-green-100 text-green-600 border border-green-200" 
                    : "bg-slate-900 text-white hover:bg-slate-800 active:scale-95"
                  }`}
                >
                  {isSending ? "Processing..." : isEmailVerified ? "✓ Verified" : "Send OTP"}
                </button>
              </div>
            </div>

            {/* OTP Section */}
            {otpSent && !isEmailVerified && (
              <div className="mt-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-2 px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Verification Code</span>
                  <span className="text-xs font-black text-orange-500 tabular-nums">
                    Expires in {formatTime(timeLeft)}
                  </span>
                </div>
                <input 
                  name="otp" 
                  placeholder="0 0 0 0 0 0" 
                  className="w-full h-14 text-center text-xl tracking-[0.5em] font-bold rounded-xl border-2 border-slate-200 focus:border-slate-900 focus:outline-none transition-all" 
                  onChange={handleInputChange} 
                  value={formData.otp} 
                  maxLength={6}
                />
              </div>
            )}
          </div>

          {/* Profile Details Section */}
          <div className={`space-y-6 transition-opacity duration-300 ${(otpSent || userExists) ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1 bg-slate-100"></div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2">Professional Details</span>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isRequest && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Category</label>
                    <div className="relative">
                      <HiCube className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input name="requestCategory" value={formData.requestCategory} readOnly className="w-full h-12 pl-11 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-500 cursor-not-allowed" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Select Brand</label>
                    <div className="relative">
                      <HiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select 
                        name="requestBrand" 
                        required 
                        className="w-full h-12 pl-11 pr-10 appearance-none bg-white border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none cursor-pointer font-medium" 
                        onChange={handleInputChange} 
                        value={formData.requestBrand}
                      >
                        <option value="">{fetchingBrands ? "Loading Brands..." : "Select Brand"}</option>
                        {availableBrands.map(name => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <input name="firstName" placeholder="First Name" required className="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.firstName} />
              <input name="lastName" placeholder="Last Name" required className="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.lastName} />
              <input name="companyName" placeholder="Company Name" required className="md:col-span-2 w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.companyName} />
              <input name="streetAddress" placeholder="Street Address" required className="md:col-span-2 w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.streetAddress} />
              <input name="city" placeholder="City" required className="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.city} />
              <input name="state" placeholder="State" required className="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.state} />
              <input name="country" placeholder="Country" required className="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.country} />
              <input name="pincode" placeholder="Pincode" required className="w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.pincode} />
              <input name="mobileNumber" placeholder="Mobile Number (with country code)" required className="md:col-span-2 w-full h-12 px-4 border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:outline-none transition-all" onChange={handleInputChange} value={formData.mobileNumber} />
              
              <button 
                type="submit" 
                className="md:col-span-2 w-full h-14 bg-slate-900 text-white rounded-xl font-black uppercase text-sm tracking-widest hover:bg-black active:scale-[0.98] transition-all shadow-lg shadow-slate-200"
                disabled={!otpSent && !userExists}
              >
                {isSending ? "Please wait..." : isRequest ? "Submit Request" : "Finish & Download"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}} />
    </div>
  );
};

export default VerificationModal;