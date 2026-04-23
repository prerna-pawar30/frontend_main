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
import footerBg from "../../assets/footer/Element.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const [activeIcon, setActiveIcon] = useState(null);

  const socialLinks = [
    { Icon: FaFacebookF,  url: "https://www.facebook.com/profile.php?id=61581182323248" },
    { Icon: FaInstagram,  url: "https://www.instagram.com/digident.india?igsh=MWFkdWpra293NDJ6YQ==" },
    { Icon: FaLinkedinIn, url: "https://www.linkedin.com/company/digident-india/" },
    { Icon: FaEnvelope,   url: "mailto:info@digident.in" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F7E6DC 0%, #E68736 100%)' }}
    >
      {/* Shimmer overlay */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 0%, transparent 55%)',
        }} */}
      {/* /> */}

      {/* Background image blended on top */}
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${footerBg})`,
          
        }}
      />

      <div className="mx-auto pt-16 px-6 sm:px-10 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* LOGO + SOCIAL */}
          <div className="flex flex-col items-center text-center lg:text-left">
            <img src={logoDigident} alt="Digident Logo" className="w-40 mb-4" />
            <div className="flex gap-4 mt-2">
              {socialLinks.map(({ Icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveIcon(index)}
                  className="p-3 rounded-full shadow cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{
                    background: activeIcon === index
                      ? 'rgba(255,255,255,1)'
                      : 'rgba(255,255,255,0.75)',
                  }}
                >
                  <Icon className="text-lg text-[#E68736]" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-xl mb-3 text-[#011632]">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us",     href: "/about" },
                { label: "Our Products", href: "/products" },
                { label: "Shop",         href: "/shop" },
                { label: "Contact Us",   href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[18px] text-[#011632] hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* PRODUCT CATEGORIES */}
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-xl mb-3 text-[#011632]">Product Categories</h3>
            <ul className="space-y-2">
              {["Prosthetic Screws", "Scan Abutments", "Analogs"].map((cat) => (
                <li
                  key={cat}
                  className="text-[18px] text-[#011632] hover:text-white cursor-pointer transition-colors duration-200"
                >
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* POLICIES */}
          <div className="text-center lg:text-left">
            <h3 className="font-bold text-xl mb-3 text-[#011632]">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" state={{ activeTab: "privacy" }}
                  className="text-[18px] text-[#011632] hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/Shipping-Policy" state={{ activeTab: "shipping" }}
                  className="text-[18px] text-[#011632] hover:text-white transition-colors duration-200">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/TermsOfUse" state={{ activeTab: "terms" }}
                  className="text-[18px] text-[#011632] hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/Return-Policy" state={{ activeTab: "return" }}
                  className="text-[18px] text-[#011632] hover:text-white transition-colors duration-200">
                  Exchange & Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ADDRESS */}
          <div className="max-w-[260px] mx-auto lg:mx-0 text-center lg:text-left">
            <h3 className="font-bold text-xl mb-3 text-[#011632]">Address</h3>
            <ul className="space-y-4 text-[#011632]">
              <li className="flex items-start gap-3 justify-center lg:justify-start font-semibold">
                <FaMapMarkerAlt className="text-white text-[20px] mt-1 flex-shrink-0" />
                <p className="text-[15px] leading-relaxed">
                  Digident India Pvt Ltd, 314, Sapna Sangeeta Rd, near Matlani Garden,
                  Professor Colony, Indore, Madhya Pradesh 452001
                </p>
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <FaPhoneAlt className="text-white text-xl flex-shrink-0" />
                <span className="font-semibold text-[15px]">
                  +91 9294503001<br />+91 9294503002<br />+91 9294503003
                </span>
              </li>
              <li className="flex items-center gap-3 justify-center lg:justify-start">
                <FaEnvelope className="text-white text-xl flex-shrink-0" />
                <span className="font-semibold text-[15px]">info@digident.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 pb-6 w-full flex justify-center">
          <p
            className="text-[#011632] text-base pb-1"
            style={{ borderBottom: '1px solid rgba(1,22,50,0.3)' }}
          >
            Copyright © {new Date().getFullYear()} Digident India | All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
}