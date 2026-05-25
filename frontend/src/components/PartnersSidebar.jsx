import React from "react";
import { ExternalLink } from "lucide-react";
import { articleSidebarPartners } from "../mock/mockData";

// Partners shown on the right side of every article/blog page
const PartnersSidebar = () => {
  return (
    <aside className="hidden lg:block w-full max-w-[260px] flex-shrink-0">
      <div className="sticky top-32 space-y-5">
        <p className="text-[10px] tracking-[0.4em] text-[#9b30ff] uppercase mb-3">
          Parceiros oficiais
        </p>

        {articleSidebarPartners.map((p) => (
          <a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group block rounded-2xl border border-[#1f1a35] hover:border-[#9b30ff]/50 overflow-hidden transition-colors duration-500 bg-[#0a0612]"
          >
            <div
              className="flex items-center justify-center px-6 aspect-[4/3]"
              style={{ background: p.bg }}
            >
              <img
                src={p.logo}
                alt={p.name}
                className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-[#1f1a35]">
              <span className="font-serif text-sm text-[#f5f0ff]">{p.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9b30ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}

        <p className="text-[9px] tracking-[0.4em] text-[#5a5470] uppercase pt-3 border-t border-[#1f1a35]">
          Patrocinados · Lux Society MMXXVI
        </p>
      </div>
    </aside>
  );
};

export default PartnersSidebar;
