import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Show navbar immediately when scroll begins
      setIsVisible(true);

      // 2. Reset the scroll timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 3. Set scroll inactivity timeout to hide navbar
      scrollTimeoutRef.current = setTimeout(() => {
        if (!isHovered && !isOpen && window.scrollY >= 50) {
          setIsVisible(false);
        }
      }, 1500);

      // 4. Check if at the bottom of the page to auto-highlight Contact
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // 5. Highlight sections based on absolute viewport position
      const sections = ['home', 'about', 'education', 'projects', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 280; // Offset for triggering highlight

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isHovered, isOpen]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsVisible(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      if (!isOpen && window.scrollY >= 50) {
        setIsVisible(false);
      }
    }, 1500);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Me', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-4 left-0 right-0 z-50 select-none w-full px-6 md:px-8 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between rounded-2xl py-3 px-6 md:px-8 bg-transparent border-transparent">
        {/* Logo on the left */}
        <a href="#home" className="font-heading font-extrabold text-[1.1rem] tracking-wider text-text-primary flex items-center gap-1 group">
          PORTFOLIO
          <span className="inline-block w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--accent-cyan)] group-hover:scale-125 transition-transform duration-300" />
        </a>

        {/* Floating Pill Center Dock */}
        <div className="hidden lg:flex items-center gap-1 bg-bg-card/85 backdrop-blur-md border border-border-color/30 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.45)] px-2 h-12">
          {navLinks.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`px-3.5 py-1.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive 
                    ? 'bg-accent-cyan text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/35'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Side Let's Talk Button and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-heading font-bold text-[0.72rem] rounded-full hover:bg-accent-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-[1.03] active:scale-95 transition-all duration-300 uppercase tracking-widest border border-transparent"
          >
            LET'S TALK <span className="text-[0.9rem] font-bold leading-none">&rarr;</span>
          </a>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-text-primary cursor-pointer flex items-center p-1.5 bg-bg-card border border-border-color/45 rounded-full hover:border-accent-cyan transition-all" 
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-16 right-8 w-[200px] glass-card rounded-2xl border border-border-color/45 shadow-2xl p-4 transition-all duration-500 z-[49] flex flex-col gap-6 transform ${
        isOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-8 opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="flex flex-col items-stretch gap-2.5 w-full font-sans text-xs font-semibold text-left">
          {navLinks.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`w-full text-center py-2 rounded-xl transition-all duration-200 border uppercase tracking-wider ${
                  isActive
                    ? 'text-black bg-accent-cyan border-accent-cyan font-bold shadow-[0_0_10px_rgba(0,255,255,0.2)]'
                    : 'text-text-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 border-transparent hover:border-accent-cyan/20'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
