import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import { fetchPartners, fetchAdsByPlacement } from "../sanity/ads";

// Partners + sidebar ads shown on every article/blog page.
// Adapts to mobile: becomes a 2-col horizontal grid below the main content.
const PartnersSidebar = () => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState([]);
  const [sidebarAds, setSidebarAds] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [p, ads] = await Promise.all([
        fetchPartners(),
        fetchAdsByPlacement("sidebar"),
      ]);
      if (cancelled) return;
      setPartners(p || []);
      setSidebarAds(ads || []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (partners.length === 0 && sidebarAds.length === 0) return null;

  return (
    <aside
      className="w-full lg:max-w-[260px] lg:flex-shrink-0"
      data-testid="partners-sidebar"
    >
      <div className="lg:sticky lg:top-32">
        <p className="text-[10px] tracking-[0.4em] text-[#9b30ff] uppercase mb-3">
          {t("common.official_partners")}
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5">
          {partners.map((p) => (
            <a
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group block rounded-2xl border border-[#1f1a35] hover:border-[#9b30ff]/50 overflow-hidden transition-colors duration-300 bg-[#0a0612]"
              data-testid={`partner-card-${p.id}`}
            >
              <div
                className="flex items-center justify-center px-4 lg:px-6 aspect-[4/3]"
                style={{ background: p.bg }}
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between px-3 lg:px-4 py-2.5 lg:py-3 border-t border-[#1f1a35]">
                <span className="font-serif text-xs lg:text-sm text-[#f5f0ff] truncate">
                  {p.name}
                </span>
                <ExternalLink className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#9b30ff] flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}

          {sidebarAds.map((ad) => (
            <a
              key={ad.id}
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group block rounded-2xl border border-[#9b30ff]/25 hover:border-[#9b30ff]/60 overflow-hidden transition-colors duration-300 bg-[#0a0612]"
              data-testid={`sidebar-ad-${ad.id}`}
            >
              {ad.image && (
                <div className="relative aspect-[4/3] bg-[#0a0612] overflow-hidden">
                  <img
                    src={ad.image}
                    alt={ad.headline || ad.sponsor}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              )}
              <div className="px-3 lg:px-4 py-2.5 lg:py-3 border-t border-[#1f1a35]">
                <span className="text-[8px] lg:text-[9px] tracking-[0.4em] text-[#5a5470] uppercase block mb-1">
                  {t("common.sponsored")}
                </span>
                <span className="font-serif text-xs lg:text-sm text-[#f5f0ff] block truncate">
                  {ad.headline || ad.sponsor}
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="text-[9px] tracking-[0.4em] text-[#5a5470] uppercase mt-5 pt-3 border-t border-[#1f1a35]">
          {t("common.partners_footer")}
        </p>
      </div>
    </aside>
  );
};

export default PartnersSidebar;
