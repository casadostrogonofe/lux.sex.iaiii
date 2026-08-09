import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import AgeOverlay from "./AgeOverlay";
import Header from "./Header";
import Footer, { CookieBanner } from "./Footer";
import { PageTransition } from "./motion/PageTransition";
import { RouteSkeleton } from "./motion/RouteSkeleton";

// Persistent layout — Header (with MusicPlayer) stays mounted across routes
const Layout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#050208] text-[#f5f0ff] font-sans antialiased overflow-x-hidden flex flex-col">
      <AgeOverlay />
      <Header />
      <main className="flex-1" data-testid="application-main-content">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Suspense fallback={<RouteSkeleton />}>
              <Outlet />
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Layout;
