import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import VehiclesPage from './pages/Vehicles';
import { ThemeProvider } from './context/ThemeContext';
import ScrollAnimationProvider from './context/ScrollAnimationContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize smooth scrolling
  useEffect(() => {
    // Add styles for improved scrolling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ThemeProvider>
      <ScrollAnimationProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/vehicles/all" element={<VehiclesPage />} />
                <Route path="/vehicles/:category" element={<VehiclesPage />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/categories/:category" element={<Categories />} />
                <Route path="/contact" element={<Contact />} />
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