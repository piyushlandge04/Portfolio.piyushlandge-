import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home',         label: 'Home'           },
  { href: '#about',        label: 'About'          },
  { href: '#skills',       label: 'Skills'         },
  { href: '#experience',   label: 'Experience'     },
  { href: '#projects',     label: 'Projects'       },
  { href: '#certificates', label: 'Certifications' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full relative z-25 flex flex-col font-sans select-none">
      {/* ── Main bar ── */}
      <nav className="w-full py-4 px-5 sm:px-8 flex flex-row justify-between items-center bg-transparent">

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
        <div className="md:hidden absolute top-full left-0 w-full z-50 bg-bg-secondary/95 backdrop-blur-xl border-t border-text-primary/5 px-5 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[0.95rem] font-medium text-text-primary/80 hover:text-text-primary py-3 border-b border-text-primary/5 transition-colors cursor-pointer"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="text-[0.95rem] font-bold text-text-primary py-3 transition-colors cursor-pointer"
          >
            Contact Me
          </a>
        </div>
      )}

      {/* 1px gradient divider */}
      <div
        className="h-px w-full bg-linear-to-r from-transparent via-text-primary/20 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
