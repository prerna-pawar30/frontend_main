import './App.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  const location = useLocation()

  const noLayoutPages = ["/inventory"]
  const hideLayout = noLayoutPages.includes(location.pathname)

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 72,
      easing: 'ease-out-cubic',
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [location.pathname])

  return (
    <div className="app-shell">
      {!hideLayout && <Header />}

      <main className="container content">
        <AppRoutes />
      </main>

      {!hideLayout && <Footer />}
    </div>
  )
}

export default App
