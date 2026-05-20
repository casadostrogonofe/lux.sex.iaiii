import React from "react";
import AgeOverlay from "../components/AgeOverlay";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AdBanner from "../components/AdBanner";
import FeaturedArticles from "../components/FeaturedArticles";
import VideoSection from "../components/VideoSection";
import RecentArticles from "../components/RecentArticles";
import Newsletter from "../components/Newsletter";
import Footer, { CookieBanner } from "../components/Footer";
import { adSlots } from "../mock/mockData";

const Lifestyle = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f0e6] font-sans antialiased overflow-x-hidden">
      <AgeOverlay />
      <Header />

      <main>
        <Hero />
        <AdBanner variant="premium" data={adSlots.premium} />
        <FeaturedArticles />
        <VideoSection />
        <AdBanner variant="inline" data={adSlots.inline} />
        <RecentArticles />
        <AdBanner variant="footer" data={adSlots.footer} />
        <Newsletter />
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Lifestyle;
