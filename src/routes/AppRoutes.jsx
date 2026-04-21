import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('../pages/HomeNew.jsx'))
const About = lazy(() => import('../pages/About.jsx'))
const Contact = lazy(() => import('../pages/Contact.jsx'))
const ScanBody = lazy(() => import('../components/product-pages/ScanBody.jsx'))
const Aboutment = lazy(() => import('../components/product-pages/Abutment.jsx'))
const Screw = lazy(() => import('../components/product-pages/Screw.jsx'))
const LabAnalog = lazy(() => import('../components/product-pages/LabAnalog.jsx'))
const Product = lazy(() => import('../pages/Product.jsx'))
const Library = lazy(() => import('../pages/Library.jsx'))
const VideoGallery = lazy(() => import('../components/Home/video.jsx'))
const Hero = lazy(() => import('../components/Home/Hero.jsx'))
const Brands = lazy(() => import('../components/Home/Brand.jsx'))
const Bestselling = lazy(() => import('../components/Home/Bestselling.jsx'))
const Brandlogo = lazy(() => import('../components/Home/Brandlogo.jsx'))
const Category = lazy(() => import('../components/Home/category.jsx'))
const Support = lazy(() => import('../components/Home/support.jsx'))
const Testimonials = lazy(() => import('../components/Home/testimonial.jsx'))
const Policies = lazy(() => import('../components/privacy/policy.jsx'))
const PrivacyPolicy = lazy(() => import('../components/privacy/PrivacyPolicy.jsx'))
const ShippingPolicy = lazy(() => import('../components/privacy/ShippingPolicy.jsx'))
const ReturnPolicy = lazy(() => import('../components/privacy/ReturnPolicy.jsx'))
const TermsOfUse = lazy(() => import('../components/privacy/TermsOfUse.jsx'))
const DigidentAbout = lazy(() => import('../components/Home/About.jsx'))
const FeaturesSection = lazy(() => import('../components/Home/Features.jsx'))
const NotFound = lazy(() => import("../pages/notfoun.jsx"))
const Career = lazy(() => import("../pages/career.jsx"))
const JobDetailsPage = lazy(() => import('../components/career/JobDetailsModal.jsx'))
const JobApplicationModalWrapper = lazy(() => import('../components/career/JobApplicationModalWrapper.jsx'))
const BlogList = lazy(() => import('../components/blogs/BlogList.jsx'))
const BlogDetail = lazy(() => import('../components/blogs/BlogDetail.jsx'))
const BlogSection = lazy(() => import('../components/blogs/homepage-blog/Blog.jsx'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product/scanbody" element={<ScanBody />} />
      <Route path="/product/abutment" element={<Aboutment />} />
      <Route path="/product/lab-analog" element={<LabAnalog />} />
      <Route path="/product/screw" element={<Screw />} />
      <Route path="/product" element={<Product />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/library" element={<Library />} />
      <Route path="/video" element={<VideoGallery />} />
      <Route path="/banner" element={<Hero />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/bestselling" element={<Bestselling />} />
      <Route path="/brandlogo" element={<Brandlogo />} />
      <Route path="/category" element={<Category />} />
      <Route path="/support" element={<Support />} />
      <Route path="/testimonial" element={<Testimonials />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/Shipping-Policy" element={<ShippingPolicy />} />
      <Route path="/Return-Policy" element={<ReturnPolicy />} />
      <Route path="/TermsOfUse" element={<TermsOfUse />} />
      <Route path="/digident-about" element={<DigidentAbout />} />
      <Route path="/features" element={<FeaturesSection />} />
      <Route path="/career" element={<Career />} />
      <Route path="/career/job/:id" element={<JobDetailsPage />} />
      <Route path="/career/application/:applicationId" element={<JobApplicationModalWrapper />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/blog-list" element={<BlogSection />} />
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes