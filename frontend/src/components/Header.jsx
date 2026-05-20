import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { LOGO_IAIII, navLinks } from "../mock/mockData";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/85 backdrop-blur-lg border-b border-[#2b2b2b]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between py-5">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img
            src={LOGO_IAIII}
            alt="lux"
            className="h-10 w-10 md:h-11 md:w-11 object-contain transition-transform duration-500 group-hover:rotate-6"
          />
          <span className="font-serif text-2xl md:text-[28px] tracking-[0.2em]">
            <span className="text-[#f5f0e6]">LUX</span>
            <span className="text-[#d4af37]">.SEX</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`text-xs tracking-[0.3em] uppercase transition-colors duration-300 ${
                l.active ? "text-[#d4af37]" : "text-[#f5f0e6] hover:text-[#d4af37]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-[#a0998a] hover:text-[#d4af37] transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-xl leading-none">🇧🇷</span>
          </button>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-[#f5f0e6] hover:text-[#d4af37] transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-7 h-7" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="hidden lg:block text-[#f5f0e6] hover:text-[#d4af37] transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Drawer menu */}
      <div
        className={`fixed inset-0 z-[60] bg-black/97 backdrop-blur-xl transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#2b2b2b]">
          <div className="flex items-center gap-3">
            <img src={LOGO_IAIII} alt="lux" className="h-10 w-10 object-contain" />
            <span className="font-serif text-2xl tracking-[0.2em]">
              <span className="text-[#f5f0e6]">LUX</span>
              <span className="text-[#d4af37]">.SEX</span>
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-[#f5f0e6] hover:text-[#d4af37] transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 h-[calc(100vh-92px)]">
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-serif text-3xl md:text-5xl tracking-[0.1em] transition-colors duration-300 ${
                l.active ? "text-[#d4af37]" : "text-[#f5f0e6] hover:text-[#d4af37]"
              }`}
              style={{ animation: open ? `fadeUp 0.5s ${i * 0.08}s both` : "none" }}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-10 text-[10px] tracking-[0.4em] text-[#6b6356] uppercase">
            MMXXVI · Lux Society
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
