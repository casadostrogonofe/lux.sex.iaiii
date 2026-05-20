import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, Globe, ExternalLink } from "lucide-react";
import { LOGO_IAIII, navLinks, lifestyleCategories } from "../mock/mockData";
import MusicPlayer from "./MusicPlayer";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const path = location.pathname;
  const isOnLifestyle = path === "/" || path.startsWith("/lifestyle");

  const isActive = (href, external) => {
    if (external) return false;
    if (href === "/lifestyle") return path === "/" || path === "/lifestyle";
    return path === href;
  };

  const isCategoryActive = (href) => path === href;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled || isOnLifestyle
            ? "bg-black/85 backdrop-blur-lg border-b border-[#2b2b2b]"
            : "bg-transparent"
        }`}
      >
        {/* Main bar */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between py-4 md:py-5 gap-3">
          <Link to="/lifestyle" className="flex items-center gap-2 md:gap-3 group shrink-0">
            <img
              src={LOGO_IAIII}
              alt="lux"
              className="h-9 w-9 md:h-11 md:w-11 object-contain transition-transform duration-500 group-hover:rotate-6"
            />
            <span className="font-serif text-xl md:text-[28px] tracking-[0.2em]">
              <span className="text-[#f5f0e6]">LUX</span>
              <span className="text-[#d4af37]">.SEX</span>
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.3em] uppercase text-[#f5f0e6] hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-1.5"
                >
                  {l.label}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`text-xs tracking-[0.3em] uppercase transition-colors duration-300 ${
                    isActive(l.href, l.external)
                      ? "text-[#d4af37]"
                      : "text-[#f5f0e6] hover:text-[#d4af37]"
                  }`}
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <MusicPlayer />
            <button className="hidden md:flex items-center gap-1.5 text-[#a0998a] hover:text-[#d4af37] transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-lg leading-none">🇧🇷</span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="text-[#f5f0e6] hover:text-[#d4af37] transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </div>
        </div>

        {/* Secondary nav: lifestyle categories */}
        {isOnLifestyle && (
          <div className="border-t border-[#2b2b2b] bg-black/70 backdrop-blur-md">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">
              <nav className="flex items-center gap-1 overflow-x-auto scrollbar-thin py-3">
                <Link
                  to="/lifestyle"
                  className={`shrink-0 text-[10px] md:text-[11px] tracking-[0.3em] uppercase px-3 md:px-4 py-2 transition-colors duration-300 whitespace-nowrap ${
                    path === "/" || path === "/lifestyle"
                      ? "text-[#d4af37] border-b border-[#d4af37]"
                      : "text-[#a0998a] hover:text-[#f5f0e6]"
                  }`}
                >
                  Todas
                </Link>
                {lifestyleCategories.map((c) => (
                  <Link
                    key={c.id}
                    to={c.href}
                    className={`shrink-0 text-[10px] md:text-[11px] tracking-[0.3em] uppercase px-3 md:px-4 py-2 transition-colors duration-300 whitespace-nowrap ${
                      isCategoryActive(c.href)
                        ? "text-[#d4af37] border-b border-[#d4af37]"
                        : "text-[#a0998a] hover:text-[#f5f0e6]"
                    }`}
                  >
                    {c.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

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
        <div className="overflow-y-auto h-[calc(100vh-92px)] py-10 px-6">
          <nav className="flex flex-col items-center gap-4 mb-10">
            {navLinks.map((l, i) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-2xl md:text-4xl tracking-[0.1em] text-[#f5f0e6] hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2"
                  style={{ animation: open ? `fadeUp 0.5s ${i * 0.06}s both` : "none" }}
                >
                  {l.label}
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  className={`font-serif text-2xl md:text-4xl tracking-[0.1em] transition-colors duration-300 ${
                    isActive(l.href, l.external)
                      ? "text-[#d4af37]"
                      : "text-[#f5f0e6] hover:text-[#d4af37]"
                  }`}
                  style={{ animation: open ? `fadeUp 0.5s ${i * 0.06}s both` : "none" }}
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="max-w-md mx-auto border-t border-[#2b2b2b] pt-8">
            <p className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase text-center mb-5">
              Categorias Lifestyle
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {lifestyleCategories.map((c) => (
                <Link
                  key={c.id}
                  to={c.href}
                  className={`text-[10px] tracking-[0.3em] uppercase px-3 py-2 border transition-colors duration-300 ${
                    isCategoryActive(c.href)
                      ? "border-[#d4af37] text-[#d4af37]"
                      : "border-[#2b2b2b] text-[#a0998a] hover:border-[#d4af37]/50 hover:text-[#f5f0e6]"
                  }`}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-[10px] tracking-[0.4em] text-[#6b6356] uppercase text-center">
            MMXXVI · Lux Society
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
