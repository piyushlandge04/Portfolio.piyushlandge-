import React, { useEffect } from 'react';
import Navbar from './WebPages/Navbar';
import Hero from './WebPages/Hero';
import About from './WebPages/About';
import Projects from './WebPages/Projects';
import Certificates from './WebPages/Certificates';
import Contact from './WebPages/Contact';

function App() {
  useEffect(() => {
    // Force landing on home section on mount
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0 });

    // 1. Mouse Coordinate Tracking
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 2. Scroll Progress Bar Update
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = window.scrollY / docHeight;
        const progressEl = document.querySelector('.scroll-progress');
        if (progressEl) {
          progressEl.style.transform = `scaleX(${progress})`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 3. IntersectionObserver Fallback for Scroll-driven animations
    let observer;
    const supportsScrollTimeline = 
      typeof CSS !== 'undefined' && 
      CSS.supports && 
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

    if (!supportsScrollTimeline) {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      
      revealElements.forEach((el) => {
        el.classList.add('scroll-reveal-init');
      });

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible');
          }
        });
      };

      observer = new IntersectionObserver(observerCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <>
      {/* Dynamic Cursor Glow Follower */}
      <div 
        className="cursor-glow" 
        style={{ 
          transform: 'translate3d(calc(var(--mouse-x, -999px) - 50%), calc(var(--mouse-y, -999px) - 50%), 0)',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999
        }} 
        aria-hidden="true"
      ></div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" aria-hidden="true"></div>

      {/* Main Sections */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Certificates />
        <Contact />
      </main>

    </>
  );
}

export default App;
