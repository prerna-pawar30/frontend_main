/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logoDigident from "../../assets/home/digident1.webp";
import footerBg from "../../assets/footer/Element.webp";
import { Link } from "react-router-dom";
export default function Footer() {
  const [activeIcon, setActiveIcon] = useState(null);
 // 1. Array with your specific links and icons
  const socialLinks = [
    { 
      Icon: FaFacebookF, 
      url: "https://www.facebook.com/profile.php?id=61581182323248" 
    },
    { 
      Icon: FaInstagram, 
      url: "https://www.instagram.com/digident.india?igsh=MWFkdWpra293NDJ6YQ==" 
    },
    { 
      Icon: FaLinkedinIn, 
      url: "https://www.linkedin.com/company/digident-india/" 
    },
    { 
      Icon: FaEnvelope, 
      url: "mailto:info@digident.in" 
    },
  ];

  return (
    <footer className="relative bg-[#F7E6DC] overflow-hidden ">
              <div className="mx-auto pt-16 bg-cover  bg-center bg-no-repeat px-6 sm:px-10"
                    style={{ backgroundImage: `url(${footerBg})` }}
              >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">

          {/* LOGO + SOCIAL */}
          <div className="flex flex-col items-center  text-center lg:text-left">
            <img src={logoDigident} alt="Digident Logo" className="w-40 mb-4" />

           
            {/* Social Icons Center on Mobile */}
            <div className="flex gap-4 mt-2 ">
              {socialLinks.map(({ Icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveIcon(index)}
                  className="p-3 bg-white rounded-full shadow cursor-pointer hover:scale-110 hover:shadow-lg transition-all"
                >
                  <Icon
                    className={`text-lg transition-all duration-300 ${
                      activeIcon === index
                        ? "text-[#E68736]"
                        : "text-[#E68736]"
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-xl mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-[#E6762E] cursor-pointer text-[18px]"><a href="/about">About Us</a></li>
              <li className="hover:text-[#E6762E] cursor-pointer text-[18px]"> <a href="/products">Our Products</a></li>
              <li className="hover:text-[#E6762E] cursor-pointer text-[18px]"> <a href="/shop">Shop</a></li>
              <li className="hover:text-[#E6762E] cursor-pointer text-[18px]"> <a href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* PRODUCT CATEGORIES */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-xl mb-3">Product Categories</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-[#E6762E] cursor-pointer text-[18px]">Prosthetic Screws</li>
              <li className="hover:text-[#E6762E] cursor-pointer text-[18px]">Scan Abutments</li>
              <li className="hover:text-[#E6762E] cursor-pointer text-[18px]">Analogs</li>
            </ul>
          </div>

          {/* POLICIES */}
          <div className="text-center lg:text-left">
            <h3 className="font-semibold text-xl mb-3">Policies</h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <Link to="/privacy-policy" state={{ activeTab: "privacy" }} className="hover:text-[#E6762E] cursor-pointer text-[18px]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/Shipping-Policy" state={{ activeTab: "shipping" }} className="hover:text-[#E6762E] cursor-pointer text-[18px]">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/TermsOfUse" state={{ activeTab: "terms" }} className="hover:text-[#E6762E] cursor-pointer text-[18px]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/Return-Policy" state={{ activeTab: "return" }} className="hover:text-[#E6762E] cursor-pointer text-[18px]">
                  Exchange & Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ADDRESS */}
          <div className="max-w-[260px] mx-auto lg:mx-0 text-center lg:text-left">
            <h3 className="font-semibold text-xl mb-3">Address</h3>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3 justify-center lg:justify-start">
                <FaMapMarkerAlt className="text-[#E6762E] text-[60px] mt-1" />
                <p>
                  Digident India Pvt Ltd, 314, Sapna Sangeeta Rd, near Matlani Garden,
                  Professor Colony, Indore, Madhya Pradesh 452001
                </p>
              </li>

              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <FaPhoneAlt className="text-[#E6762E] text-xl" />
                <span className="font-semibold">+91 9294503001 <br/> +91 9294503002 <br /> +91 9294503003</span>
              </li>


              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <FaEnvelope className="text-[#E6762E] text-xl" />
                <span className="font-semibold">info@digident.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 w-full flex justify-center relative z-10">
          <p className="text-gray-600 text-base border-b border-gray-600 pb-1">
            Copyright © {new Date().getFullYear()} Digident India | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
