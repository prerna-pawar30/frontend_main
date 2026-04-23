import Hero from "../components/Home/Hero.jsx";
import Brands from "../components/Home/Brand.jsx";
import Category from "../components/Home/category.jsx";
import Bestselling from "../components/Home/Bestselling.jsx";
import VideoGallery from "../components/Home/video.jsx";
import Testimonials from "../components/Home/testimonial.jsx";
import Support from "../components/Home/support.jsx";
import DigidentAbout from "../components/Home/About.jsx";
import FeaturesSection from "../components/Home/Features.jsx";
import { Link,  } from 'react-router-dom';
import BlogSection from '../components/blogs/homepage-blog/Blog.jsx'; 
import { FiArrowRight } from "react-icons/fi";




export default function HomeNew() {
  return (
    <div className="flex flex-col overflow-hidden">
      
      {/* Hero: Pattern 5 Top Right */}
      <div className="responsive-container relative">
        <Hero />
      </div>

      {/* About: Pattern 2 Bottom Left */}
      <div className="responsive-container relative">
        <DigidentAbout />
      </div>

      {/* Features: Pattern 3 Top Left */}
      <div className="responsive-container relative">
        <FeaturesSection />
      </div>

      {/* Brands: Pattern 4 Bottom Right */}
      <div className="responsive-container relative">
        <Brands />
      </div>

      {/* Categories: Pattern 5 Center-ish (shifted left) */}
      <div className="responsive-container relative">
        <Category />
      </div>

      {/* Support: No pattern (keep it clean for the CTA) */}
      <div className="responsive-container">
        <Support />
      </div>

      {/* Bestselling: Pattern 2 Top Right */}
      <div className="responsive-container relative">
        <Bestselling />
      </div>

      {/* Testimonials: Pattern 3 Bottom Left */}
      <div className="responsive-container relative">
        <Testimonials />
      </div>

      {/* Video Gallery: Pattern 4 Top Left */}
      <div className="responsive-container relative">
        <VideoGallery />
      </div>
       
     <section className="py-15 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#E68736]">
                Our Journal
              </p>
              <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
                Latest <span className="text-[#E68736]">Insights</span>
              </h2>
            </div>
            
            <Link 
              to="/blog" 
              className="group inline-flex items-center gap-2 font-bold text-slate-900 hover:text-[#E68736] transition-colors"
            >
             
              View All Articles
              <FiArrowRight size={24} /> 
            </Link>
          </div>

          {/* This is your new component! */}
          <BlogSection limit={4} />

        </div>
      </section>

    </div>
  );
}