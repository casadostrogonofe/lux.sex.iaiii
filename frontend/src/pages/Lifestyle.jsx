import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import AdBanner from "../components/AdBanner";
import FeaturedArticles from "../components/FeaturedArticles";
import VideoSection from "../components/VideoSection";
import RecentArticles from "../components/RecentArticles";
import Newsletter from "../components/Newsletter";
import { fetchBannerBySlot } from "../api/banners";

const Lifestyle = () => {
  const [banners, setBanners] = useState({
    premium: null,
    inline: null,
    footer: null,
  });

  useEffect(() => {
    (async () => {
      const [premium, inline, footer] = await Promise.all([
        fetchBannerBySlot("lifestyle_premium"),
        fetchBannerBySlot("lifestyle_inline"),
        fetchBannerBySlot("lifestyle_footer"),
      ]);
      setBanners({ premium, inline, footer });
    })();
  }, []);

  return (
    <>
      <Hero />
      {banners.premium && <AdBanner variant="premium" data={banners.premium} />}
      <FeaturedArticles />
      <VideoSection />
      {banners.inline && <AdBanner variant="inline" data={banners.inline} />}
      <RecentArticles />
      {banners.footer && <AdBanner variant="footer" data={banners.footer} />}
      <Newsletter />
    </>
  );
};

export default Lifestyle;
