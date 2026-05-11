import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "bootstrap-icons/font/bootstrap-icons.css";
import ScrollToTop from "./ScrollToTop";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
