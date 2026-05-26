/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
import apiService from '../api/ApiService';
import Reveal from '../components/ui/Reveal';

import Hero from "../components/Home/Hero.jsx";
import Brands from "../components/Home/Brand.jsx";
import Category from "../components/Home/category.jsx";
import Bestselling from "../components/Home/Bestselling.jsx";
import VideoGallery from "../components/Home/video.jsx";
import Testimonials from "../components/Home/testimonial.jsx";
import Support from "../components/Home/support.jsx";
import DigidentAbout from "../components/Home/About.jsx";
import FeaturesSection from "../components/Home/Features.jsx";
import BlogSection from '../components/blogs/homepage-blog/Blog.jsx';

export default function HomeNew() {
  const [hasEnoughBlogs, setHasEnoughBlogs] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBlogs = async () => {
      try {
        const response = await apiService.getBlogs();
        const allBlogs = response.data?.data?.blogs || response.data?.blogs || [];
        setHasEnoughBlogs(allBlogs.length >= 4);
      } catch (error) {
        console.error("Error validation on blogs layout:", error);
        setHasEnoughBlogs(false);
      } finally {
        setLoading(false);
      }
    };
    checkBlogs();
  }, []);

  return (
    <div className="flex flex-col overflow-hidden">

      <Reveal className="responsive-container relative">
        <Hero />
      </Reveal>

      <Reveal className="responsive-container relative" delay={0.05}>
        <DigidentAbout />
      </Reveal>

      <Reveal className="responsive-container relative" delay={0.05}>
        <FeaturesSection />
      </Reveal>

      <Reveal className="responsive-container relative">
        <Brands />
      </Reveal>

      <Reveal className="responsive-container relative">
        <Category />
      </Reveal>

      <Reveal className="responsive-container">
        <Support />
      </Reveal>

      <Reveal className="responsive-container relative">
        <Bestselling />
      </Reveal>

      <Reveal className="responsive-container relative">
        <Testimonials />
      </Reveal>

      <Reveal className="responsive-container relative">
        <VideoGallery />
      </Reveal>

      {!loading && hasEnoughBlogs && (
        <Reveal className="w-full max-w-[1400px] mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="mb-8 md:mb-12 flex flex-row items-end justify-between gap-2">
            <div className="space-y-1 pr-2">
              <p className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#E68736] whitespace-nowrap">
                Our Journal
              </p>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                Latest <span className="text-[#E68736]">Insights</span>
              </h2>
            </div>

            <div className="flex-shrink-0 pb-0.5">
              <Link
                to="/blog"
                className="group inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-base font-bold text-slate-900 hover:text-[#E68736] transition-colors whitespace-nowrap"
              >
                <span>View All</span>
                <span className="hidden sm:inline"> Articles</span>
                <FiArrowRight size={18} className="transition-transform group-hover:translate-x-1 sm:w-6 sm:h-6" />
              </Link>
            </div>
          </div>

          <BlogSection limit={4} />
        </Reveal>
      )}

    </div>
  );
}
