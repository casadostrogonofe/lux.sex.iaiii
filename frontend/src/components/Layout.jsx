import React from "react";
import { Outlet } from "react-router-dom";
import AgeOverlay from "./AgeOverlay";
import Header from "./Header";
import Footer, { CookieBanner } from "./Footer";

// Layout wraps every page so Header (with MusicPlayer) and Footer
// stay mounted across route changes — the radio keeps playing.
const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f0e6] font-sans antialiased overflow-x-hidden flex flex-col">
      <AgeOverlay />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
