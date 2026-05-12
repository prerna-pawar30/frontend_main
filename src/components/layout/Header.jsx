// Header.jsx
import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import logoDefault from "../../assets/home/digident1.webp";   
import logoScrolled from "../../assets/home/digident.webp"; 

import {
  HiX,
  HiHome,
  HiInformationCircle,
  HiShoppingBag,
  HiPhone,
  HiSparkles,
  HiShoppingCart,
} from "react-icons/hi";

// Use the URL from your .env file
const SHOP_URL = import.meta.env.VITE_SHOP_URL;

const MENU = [
  { to: "/", label: "Home", icon: <HiHome /> },
  { to: "/about", label: "About us", icon: <HiInformationCircle /> },
  { to: "/product", label: "Our products", icon: <HiSparkles /> },
  { to: SHOP_URL, label: "Shop", icon: <HiShoppingBag />, isExternal: true },
  { to: "/contact", label: "Contact us", icon: <HiPhone /> },
  { to: "/library", label: "Library", icon: <HiInformationCircle /> },
  { to: "/career", label: "Careers", icon: <HiInformationCircle /> },
  { to: "/blog", label: "Blogs", icon: <HiInformationCircle /> },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shrink, setShrink] = useState(false);
  const drawerRef = useRef(null);

  // Handle Scroll logic for header height and background
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 10);
      setShrink(y > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on Escape or Outside Click
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    const handleClickOutside = (e) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // --- Center Expansion Animation Styles ---
  const desktopNavStyles = `
    relative text-[16px] xl:text-[18px] font-medium tracking-wide 
    transition-all duration-300 py-1 text-[#011632] hover:text-[#E68736]
    
    after:content-[''] after:absolute after:bottom-0 after:left-1/2 
    after:h-[2px] after:w-0 after:bg-[#E68736] 
    after:transition-all after:duration-300 after:-translate-x-1/2
    hover:after:w-full
  `;

  return (
    <>
      {/* Header Container */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md flex items-center
          ${isScrolled ? "backdrop-blur-sm bg-[#F7E6DC]/70" : "bg-[#F7E6DC]"}
          ${shrink ? "h-[65px]" : "h-[85px]"}
        `}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="flex-shrink-0 transition-all duration-500 z-50"
            style={{ transform: isScrolled ? "translateX(-10px)" : "translateX(0px)" }}
          >
            <img
              src={isScrolled ? logoScrolled : logoDefault}
              alt="Digident Logo"
              className={`object-contain transition-all duration-300 
                ${shrink ? "h-10 md:h-12" : "h-14 md:h-16"}`}
            />
          </Link>

          {/* Desktop Navigation - Hidden on Mobile/Tablet */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {MENU.map(({ to, label, isExternal }) => (
              isExternal ? (
                <a key={label} href={to} className={desktopNavStyles}>
                  {label}
                </a>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `${desktopNavStyles} ${isActive ? "text-[#E68736] after:w-full" : ""}`
                  }
                >
                  {label}
                </NavLink>
              )
            ))}
          </nav>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((s) => !s)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center z-50"
          >
            <span className={`block absolute w-6 h-[2.5px] bg-[#E68736] transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"}`} />
            <span className={`block absolute w-6 h-[2.5px] bg-[#E68736] transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`block absolute w-6 h-[2.5px] bg-[#E68736] transition-transform duration-300 ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"}`} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      />

      {/* Mobile Right-Side Drawer */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 z-[70] h-full w-[280px] sm:w-[320px] md:w-[360px]
          bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="h-full p-6 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <img src={logoDefault} alt="Logo" className="h-16 object-contain" />
            <button onClick={() => setIsOpen(false)} className="p-2">
              <HiX className="text-3xl text-[#E68736]" />
            </button>
          </div>
          
          <div className="h-px bg-gray-100 mb-6" />

          {/* Drawer Navigation Links */}
          <nav className="flex-grow overflow-y-auto">
            <ul className="flex flex-col gap-1">
              {MENU.map((item) => (
                <li key={item.label}>
                  {item.isExternal ? (
                    <a
                      href={item.to}
                      className="flex items-center gap-4 py-4 px-4 rounded-xl text-lg text-[#072434] hover:bg-[#F7E6DC]/30 active:bg-[#F7E6DC]/50 transition-colors"
                    >
                      <span className="text-xl text-[#E68736]">{item.icon}</span>
                      {item.label}
                    </a>
                  ) : (
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-4 py-4 px-4 rounded-xl text-lg transition-colors ${
                          isActive
                            ? "bg-[#E68736]/10 text-[#E68736] font-semibold"
                            : "text-[#072434] hover:bg-[#F7E6DC]/30"
                        }`
                      }
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Section in Drawer */}
          <div className="pt-6">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#E68736] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#E68736]/20 active:scale-[0.98] transition-transform"
            >
              <HiShoppingCart className="text-xl" /> Contact / Enquiry
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}