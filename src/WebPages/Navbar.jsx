import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home',         label: 'Home'           },
  { href: '#about',        label: 'About'          },
  { href: '#projects',     label: 'Projects'       },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex flex-col font-sans select-none transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-xs border-b border-text-primary/5 py-2.5' 
        : 'bg-transparent py-4'
    }`}>
      {/* ── Main bar ── */}
      <nav className="w-full max-w-7xl mx-auto px-5 sm:px-8 flex flex-row justify-between items-center">

        {/* Brand */}
        <a href="#home" className="flex items-center shrink-0">
          <span className="font-heading font-bold text-sm tracking-widest text-text-primary uppercase">
            Piyush Landge
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-text-primary/80 hover:text-text-primary transition-colors duration-200 cursor-pointer"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="btn-hero-secondary rounded-full px-4 sm:px-5 py-2 text-xs font-semibold cursor-pointer hidden md:inline-block text-center"
          >
            Contact Me
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-text-primary/10 text-text-primary hover:text-text-primary hover:border-text-primary/25 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-text-primary/5 px-6 py-6 flex flex-col gap-2 shadow-lg animate-[slideDown_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-text-primary/80 hover:text-text-primary py-3 px-3 rounded-xl hover:bg-text-primary/2 transition-all cursor-pointer block text-left"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 text-center text-sm font-bold text-white bg-black hover:bg-neutral-800 py-3.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer block"
          >
            Contact Me
          </a>
        </div>
      )}

      {/* 1px gradient divider (only shown when not scrolled and menu is closed) */}
      {!scrolled && !open && (
        <div
          className="h-px w-full bg-linear-to-r from-transparent via-text-primary/20 to-transparent absolute bottom-0 left-0"
          aria-hidden="true"
        />
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
