import React, { useEffect, useState, useMemo } from "react";
import { ExternalLink, Star, Search, ShieldCheck } from "lucide-react";
import AdBanner from "../components/AdBanner";
import { partnerStores, shopCategories } from "../mock/mockData";
import { fetchBannerBySlot, fetchBanners } from "../api/banners";

const ShopHero = ({ banner }) => (
  <section className="relative pt-32 md:pt-40 pb-12">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="flex items-center justify-center gap-6 mb-10">
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#9b30ff]" />
        <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#9b30ff] uppercase">
          Shop · Marketplace MMXXVI
        </span>
        <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#9b30ff]" />
      </div>

      <h1 className="font-serif text-center text-[#f5f0ff] text-5xl md:text-7xl lg:text-[88px] leading-[1.05] mb-6">
        Boutiques que entendem <br />
        de{" "}
        <span className="italic bg-gradient-to-r from-[#9b30ff] via-[#b48cff] to-[#e6d5ff] bg-clip-text text-transparent">
          desejo
        </span>
        .
      </h1>

      <p className="text-center text-[#7c7893] max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12 font-light">
        Marcas selecionadas a dedo pela curadoria Lux Society. Cada loja é independente —
        ao clicar, você é redirecionado para o site do parceiro.
      </p>

      {banner && (
        <a
          href={banner.link || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block relative overflow-hidden border border-[#1a1526] hover:border-[#9b30ff]/60 transition-colors duration-700 mt-6"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[260px] md:h-[420px] overflow-hidden bg-black">
              {banner.image ? (
                <img
                  src={banner.image}
                  alt={banner.headline}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[2s] group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c18] to-[#050208]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />
            </div>
            <div className="bg-[#0b0812] p-8 md:p-14 lg:p-16 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.5em] text-[#5a5470] uppercase block mb-5">
                Patrocinado · {banner.sponsor}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0ff] leading-[1.15] mb-5">
                {banner.headline}
              </h2>
              <p className="text-[#7c7893] text-base md:text-lg leading-relaxed mb-8 font-light">
                {banner.description}
              </p>
              <div className="inline-flex items-center gap-3 text-[#9b30ff] text-xs tracking-[0.3em] uppercase">
                <span className="group-hover:tracking-[0.4em] transition-all duration-500">
                  {banner.cta}
                </span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </div>
        </a>
      )}
    </div>
  </section>
);

const StoreCard = ({ store }) => (
  <a
    href={store.link}
    target="_blank"
    rel="noopener noreferrer sponsored"
    className="group block border border-[#1a1526] hover:border-[#9b30ff]/60 transition-colors duration-500 bg-[#0d0d0e]"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={store.cover}
        alt={store.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      {store.badge && (
        <div className="absolute top-4 left-4 text-[9px] tracking-[0.4em] text-[#9b30ff] bg-black/70 backdrop-blur-sm px-3 py-1.5 uppercase border border-[#9b30ff]/30">
          {store.badge}
        </div>
      )}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1.5">
        <Star className="w-3 h-3 text-[#9b30ff] fill-current" />
        <span className="text-[11px] text-[#f5f0ff] font-medium">{store.rating}</span>
      </div>
    </div>

    <div className="p-6">
      <span className="text-[10px] tracking-[0.4em] text-[#9b30ff] uppercase block mb-3">
        {store.tagline}
      </span>
      <h3 className="font-serif text-2xl text-[#f5f0ff] mb-3 leading-tight group-hover:text-[#9b30ff] transition-colors duration-500">
        {store.name}
      </h3>
      <p className="text-[#7c7893] text-sm leading-relaxed mb-6 font-light min-h-[42px]">
        {store.description}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-[#1a1526]">
        <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-[#9b30ff]" /> Parceiro Verificado
        </span>
        <span className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-[#9b30ff] uppercase group-hover:tracking-[0.4em] transition-all duration-500">
          Visitar
          <ExternalLink className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  </a>
);

const InlineAdCard = ({ banner }) => (
  <a
    href={banner.link || "#"}
    target="_blank"
    rel="noopener noreferrer sponsored"
    className="group block border border-[#9b30ff]/25 hover:border-[#9b30ff] transition-colors duration-500 bg-gradient-to-br from-[#0f0c18] to-[#050208] p-8"
  >
    <span className="text-[9px] tracking-[0.5em] text-[#5a5470] uppercase block mb-4">
      Patrocinado · {banner.sponsor}
    </span>
    <h3 className="font-serif text-2xl text-[#f5f0ff] mb-3 leading-tight">
      {banner.headline}
    </h3>
    <p className="text-[#7c7893] text-sm leading-relaxed mb-8 font-light">
      {banner.description}
    </p>
    <div className="inline-flex items-center gap-2 text-[#9b30ff] text-[10px] tracking-[0.4em] uppercase group-hover:tracking-[0.5em] transition-all duration-500">
      {banner.cta}
      <ExternalLink className="w-3.5 h-3.5" />
    </div>
  </a>
);

const Shop = () => {
  const [active, setActive] = useState("todos");
  const [query, setQuery] = useState("");
  const [topBanner, setTopBanner] = useState(null);
  const [gridBanners, setGridBanners] = useState([]);
  const [footerBanner, setFooterBanner] = useState(null);

  useEffect(() => {
    (async () => {
      const [top, grids, footer] = await Promise.all([
        fetchBannerBySlot("shop_top"),
        fetchBanners("shop_grid"),
        fetchBannerBySlot("lifestyle_footer"),
      ]);
      setTopBanner(top);
      setGridBanners(grids);
      setFooterBanner(footer);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return partnerStores.filter((s) => {
      const matchCat = active === "todos" || s.category === active;
      const matchQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [active, query]);

  // Inject ad banner every 4 stores (or after if fewer)
  const grid = useMemo(() => {
    const items = [];
    filtered.forEach((s, idx) => {
      items.push({ type: "store", data: s });
      if ((idx + 1) % 4 === 0 && gridBanners.length > 0) {
        const ad = gridBanners[Math.floor(idx / 4) % gridBanners.length];
        if (ad) items.push({ type: "ad", data: ad });
      }
    });
    return items;
  }, [filtered, gridBanners]);

  return (
    <>
      <ShopHero banner={topBanner} />

      {/* Filters + search */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-8">
        <div className="border-y border-[#1a1526] py-6 flex flex-col lg:flex-row lg:items-center gap-5 lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {shopCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`text-[10px] tracking-[0.3em] uppercase px-4 py-2.5 border transition-colors duration-300 ${
                  active === c.id
                    ? "border-[#9b30ff] text-[#9b30ff] bg-[#9b30ff]/5"
                    : "border-[#1a1526] text-[#7c7893] hover:border-[#9b30ff]/50 hover:text-[#f5f0ff]"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="relative flex items-center min-w-[260px]">
            <Search className="w-4 h-4 text-[#5a5470] absolute left-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar parceiro..."
              className="w-full bg-transparent border border-[#1a1526] focus:border-[#9b30ff] text-[#f5f0ff] placeholder:text-[#5a5470] pl-11 pr-4 py-3 text-sm outline-none transition-colors"
            />
          </div>
        </div>

        <div className="mt-4 text-[10px] tracking-[0.4em] text-[#5a5470] uppercase">
          {filtered.length} parceiro{filtered.length !== 1 ? "s" : ""} encontrado
          {filtered.length !== 1 ? "s" : ""}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-[#7c7893] mb-3">
              Nenhum parceiro encontrado.
            </p>
            <p className="text-[#5a5470] text-sm">Tente outra categoria ou termo de busca.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {grid.map((item, i) =>
              item.type === "store" ? (
                <StoreCard key={`store-${item.data.id}`} store={item.data} />
              ) : (
                <InlineAdCard key={`ad-${i}`} banner={item.data} />
              )
            )}
          </div>
        )}
      </section>

      {/* Become a partner CTA */}
      <section className="border-t border-[#1a1526]">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-20 text-center">
          <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase block mb-5">
            Para marcas
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0ff] leading-tight mb-6">
            Sua boutique no <span className="italic text-[#9b30ff]">marketplace</span> Lux.
          </h2>
          <p className="text-[#7c7893] max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10 font-light">
            Acesso a uma audiência verificada, alto poder aquisitivo e curadoria editorial
            exclusiva. Apenas marcas aprovadas pelo conselho Lux Society.
          </p>
          <a
            href="mailto:parceiros@lux.sex"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#9b30ff] hover:bg-[#b15aff] text-black text-xs tracking-[0.3em] uppercase font-medium transition-colors duration-500"
          >
            Solicitar Parceria
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {footerBanner && <AdBanner variant="footer" data={footerBanner} />}
    </>
  );
};

export default Shop;
