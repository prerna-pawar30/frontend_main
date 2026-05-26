import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import PageLoader from '../components/ui/PageLoader'

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

function AnimatedPage({ children }) {
  return <PageTransition>{children}</PageTransition>
}

const AppRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="/product/scanbody" element={<AnimatedPage><ScanBody /></AnimatedPage>} />
          <Route path="/product/abutment" element={<AnimatedPage><Aboutment /></AnimatedPage>} />
          <Route path="/product/lab-analog" element={<AnimatedPage><LabAnalog /></AnimatedPage>} />
          <Route path="/product/screw" element={<AnimatedPage><Screw /></AnimatedPage>} />
          <Route path="/product" element={<AnimatedPage><Product /></AnimatedPage>} />
          <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="/library" element={<AnimatedPage><Library /></AnimatedPage>} />
          <Route path="/video" element={<AnimatedPage><VideoGallery /></AnimatedPage>} />
          <Route path="/banner" element={<AnimatedPage><Hero /></AnimatedPage>} />
          <Route path="/brands" element={<AnimatedPage><Brands /></AnimatedPage>} />
          <Route path="/bestselling" element={<AnimatedPage><Bestselling /></AnimatedPage>} />
          <Route path="/brandlogo" element={<AnimatedPage><Brandlogo /></AnimatedPage>} />
          <Route path="/category" element={<AnimatedPage><Category /></AnimatedPage>} />
          <Route path="/support" element={<AnimatedPage><Support /></AnimatedPage>} />
          <Route path="/testimonial" element={<AnimatedPage><Testimonials /></AnimatedPage>} />
          <Route path="/policies" element={<AnimatedPage><Policies /></AnimatedPage>} />
          <Route path="/privacy-policy" element={<AnimatedPage><PrivacyPolicy /></AnimatedPage>} />
          <Route path="/shipping-policy" element={<AnimatedPage><ShippingPolicy /></AnimatedPage>} />
          <Route path="/return-policy" element={<AnimatedPage><ReturnPolicy /></AnimatedPage>} />
          <Route path="/terms-of-use" element={<AnimatedPage><TermsOfUse /></AnimatedPage>} />
          <Route path="/digident-about" element={<AnimatedPage><DigidentAbout /></AnimatedPage>} />
          <Route path="/features" element={<AnimatedPage><FeaturesSection /></AnimatedPage>} />
          <Route path="/career" element={<AnimatedPage><Career /></AnimatedPage>} />
          <Route path="/career/job/:id" element={<AnimatedPage><JobDetailsPage /></AnimatedPage>} />
          <Route path="/career/application/:applicationId" element={<AnimatedPage><JobApplicationModalWrapper /></AnimatedPage>} />
          <Route path="/blog" element={<AnimatedPage><BlogList /></AnimatedPage>} />
          <Route path="/blog/:id" element={<AnimatedPage><BlogDetail /></AnimatedPage>} />
          <Route path="/blog-list" element={<AnimatedPage><BlogSection /></AnimatedPage>} />
          <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default AppRoutes
