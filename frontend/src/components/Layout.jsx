import React from "react";
import { Outlet } from "react-router-dom";
import AgeOverlay from "./AgeOverlay";
import Header from "./Header";
import Footer, { CookieBanner } from "./Footer";
import FloatingMusicPlayer from "./FloatingMusicPlayer";

// Persistent layout — MusicPlayer + Header stay mounted across routes
const Layout = () => {
  return (
    <div className="min-h-screen bg-[#050208] text-[#f5f0ff] font-sans antialiased overflow-x-hidden flex flex-col">
      <AgeOverlay />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <FloatingMusicPlayer />
    </div>
  );
};

export default Layout;
