import './App.css'
import { useEffect, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import AppRoutes from './routes/AppRoutes.jsx' // Import the new file

function App() {
  const location = useLocation()

  const noLayoutPages = ["/inventory"]
  const hideLayout = noLayoutPages.includes(location.pathname)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100,
    })
  }, [])

  return (
    <div className="app-shell">
      {!hideLayout && <Header />}

      <main className="container content">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center text-gray-400">
              Loading page...
            </div>
          }
        >
          {/* Use the routes component here */}
          <AppRoutes />
        </Suspense>
      </main>

      {!hideLayout && <Footer />}
    </div>
  )
}

export default App