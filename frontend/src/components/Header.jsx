import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, X, Globe, ExternalLink, ChevronDown } from "lucide-react";
import { LOGO_IAIII, menuConfig } from "../mock/mockData";
import MusicPlayer from "./MusicPlayer";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  const path = location.pathname;
  const isActive = (href, external) => {
    if (external) return false;
    if (href === "/") return path === "/";
    return path === href || path.startsWith(href + "/");
  };

  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHovered(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setHovered(null), 180);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-[#050208]/90 backdrop-blur-lg border-b border-[#1a1526]"
            : "bg-[#050208]/60 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between py-4 md:py-5 gap-3">
          <Link to="/turismo" className="flex items-center gap-2 md:gap-3 group shrink-0">
            <img
              src={LOGO_IAIII}
              alt="lux"
              className="h-9 w-9 md:h-11 md:w-11 object-contain transition-transform duration-500 group-hover:rotate-6"
            />
            <span className="font-serif text-xl md:text-[26px] tracking-[0.2em]">
              <span className="text-[#f5f0ff]">LUX</span>
              <span className="text-[#9b30ff]">.SEX</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {menuConfig.map((item) => {
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.25em] uppercase px-4 py-2 text-[#f5f0ff] hover:text-[#9b30ff] transition-colors duration-300 flex items-center gap-1.5"
                  >
                    {item.label}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                );
              }
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = hovered === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  <Link
                    to={item.href}
                    className={`text-[11px] tracking-[0.25em] uppercase px-4 py-2 transition-colors duration-300 flex items-center gap-1.5 ${
                      isActive(item.href, false)
                        ? "text-[#9b30ff]"
                        : "text-[#f5f0ff] hover:text-[#9b30ff]"
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {hasChildren && isOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                      onMouseEnter={() => handleEnter(item.label)}
                      onMouseLeave={handleLeave}
                    >
                      <div className="min-w-[220px] bg-[#0b0812] border border-[#1a1526] shadow-2xl shadow-black/60 py-2 animate-[fadeIn_0.2s_ease]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`block px-5 py-3 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                              path === child.href
                                ? "text-[#9b30ff] bg-[#110e1a]"
                                : "text-[#f5f0ff] hover:text-[#9b30ff] hover:bg-[#110e1a]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <MusicPlayer />
            <button className="hidden md:flex items-center gap-1.5 text-[#7c7893] hover:text-[#9b30ff] transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-lg leading-none">🇧🇷</span>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="text-[#f5f0ff] hover:text-[#9b30ff] transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer menu */}
      <div
        className={`fixed inset-0 z-[60] bg-[#050208]/97 backdrop-blur-xl transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#1a1526]">
          <div className="flex items-center gap-3">
            <img src={LOGO_IAIII} alt="lux" className="h-10 w-10 object-contain" />
            <span className="font-serif text-2xl tracking-[0.2em]">
              <span className="text-[#f5f0ff]">LUX</span>
              <span className="text-[#9b30ff]">.SEX</span>
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-[#f5f0ff] hover:text-[#9b30ff] transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-92px)] py-8 px-6">
          <nav className="flex flex-col gap-1 max-w-md mx-auto">
            {menuConfig.map((item, i) => {
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-2xl text-[#f5f0ff] hover:text-[#9b30ff] transition-colors duration-300 flex items-center justify-between py-3 border-b border-[#1a1526]"
                    style={{ animation: open ? `fadeUp 0.4s ${i * 0.05}s both` : "none" }}
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="w-4 h-4 opacity-60" />
                  </a>
                );
              }
              const hasChildren = item.children && item.children.length > 0;
              const expanded = mobileExpanded === item.label;
              return (
                <div
                  key={item.label}
                  className="border-b border-[#1a1526]"
                  style={{ animation: open ? `fadeUp 0.4s ${i * 0.05}s both` : "none" }}
                >
                  <div className="flex items-center justify-between py-3">
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={`font-serif text-2xl transition-colors ${
                        isActive(item.href, false)
                          ? "text-[#9b30ff]"
                          : "text-[#f5f0ff] hover:text-[#9b30ff]"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        onClick={() =>
                          setMobileExpanded(expanded ? null : item.label)
                        }
                        aria-label="Expandir"
                        className="p-2 text-[#7c7893] hover:text-[#9b30ff] transition-colors"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {hasChildren && expanded && (
                    <div className="pb-3 pl-2 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setOpen(false)}
                          className={`text-sm tracking-[0.15em] uppercase py-2 px-3 transition-colors ${
                            path === child.href
                              ? "text-[#9b30ff]"
                              : "text-[#7c7893] hover:text-[#f5f0ff]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-10 text-[10px] tracking-[0.4em] text-[#5a5470] uppercase text-center">
            MMXXVI · Lux Society
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
