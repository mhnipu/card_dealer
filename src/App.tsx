import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import VehiclesPage from './pages/Vehicles';
import ServicesPage from './pages/Services';
import ShowroomPage from './pages/Showroom';
import CustomCursor from './components/common/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';
import ScrollAnimationProvider from './context/ScrollAnimationContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  // Initialize animation elements
  useEffect(() => {
    // Apply visible class to all animate-on-mount elements with a short delay
    const animateElements = document.querySelectorAll('.animate-on-mount');
    
    if (animateElements.length) {
      // Set timeout to ensure elements are ready
      setTimeout(() => {
        animateElements.forEach((element) => {
          element.classList.add('visible');
        });
      }, 100);
    }
    
    // Apply performance optimizations
    gsap.config({
      nullTargetWarn: false,
      autoSleep: 60,
      force3D: true
    });
    
    // Clean up any hanging animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(false));
      gsap.killTweensOf(window);
    };
  }, []);

  return (
    <ThemeProvider>
      <ScrollAnimationProvider>
        <Router>
          <div className="app-container gpu-accelerated">
            <CustomCursor />
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/vehicles/all" element={<VehiclesPage />} />
                <Route path="/vehicles/:category" element={<VehiclesPage />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/categories/:category" element={<Categories />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/showroom" element={<ShowroomPage />} />
                <Route path="/showroom/:productId" element={<ShowroomPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ScrollAnimationProvider>
    </ThemeProvider>
  );
}

export default App;