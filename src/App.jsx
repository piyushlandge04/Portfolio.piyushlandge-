import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import Hero from './WebPages/Hero';
import About from './WebPages/About';
import Projects from './WebPages/Projects';
import Contact from './WebPages/Contact';

function App() {
  useEffect(() => {
    // Force landing on home section on mount
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0 });

    // 1. Scroll Progress Bar Update
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
    
    // 2. IntersectionObserver for scroll-reveal animations (all browsers)
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-reveal-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.01,
      rootMargin: '0px 0px 100px 0px'
    });

    revealElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothTouch: true }}>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" aria-hidden="true"></div>

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </ReactLenis>
  );
}

export default App;
