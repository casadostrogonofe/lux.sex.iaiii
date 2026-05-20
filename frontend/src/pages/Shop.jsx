import React, { useEffect, useState, useMemo } from "react";
import { ExternalLink, Star, Search, ShieldCheck } from "lucide-react";
import AgeOverlay from "../components/AgeOverlay";
import Header from "../components/Header";
import AdBanner from "../components/AdBanner";
import Footer, { CookieBanner } from "../components/Footer";
import { partnerStores, shopCategories } from "../mock/mockData";
import { fetchBannerBySlot, fetchBanners } from "../api/banners";

const ShopHero = ({ banner }) => (
  <section className="relative pt-32 md:pt-40 pb-12">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="flex items-center justify-center gap-6 mb-10">
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
        <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#d4af37] uppercase">
          Shop · Marketplace MMXXVI
        </span>
        <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
      </div>

      <h1 className="font-serif text-center text-[#f5f0e6] text-5xl md:text-7xl lg:text-[88px] leading-[1.05] mb-6">
        Boutiques que entendem <br />
        de{" "}
        <span className="italic bg-gradient-to-r from-[#d4af37] via-[#b48cff] to-[#e6d5b8] bg-clip-text text-transparent">
          desejo
        </span>
        .
      </h1>

      <p className="text-center text-[#a0998a] max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12 font-light">
        Marcas selecionadas a dedo pela curadoria Lux Society. Cada loja é independente —
        ao clicar, você é redirecionado para o site do parceiro.
      </p>

      {banner && (
        <a
          href={banner.link || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="group block relative overflow-hidden border border-[#2b2b2b] hover:border-[#d4af37]/60 transition-colors duration-700 mt-6"
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] to-[#0b0b0b]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />
            </div>
            <div className="bg-[#0f0f10] p-8 md:p-14 lg:p-16 flex flex-col justify-center">
              <span className="text-[10px] tracking-[0.5em] text-[#6b6356] uppercase block mb-5">
                Patrocinado · {banner.sponsor}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0e6] leading-[1.15] mb-5">
                {banner.headline}
              </h2>
              <p className="text-[#a0998a] text-base md:text-lg leading-relaxed mb-8 font-light">
                {banner.description}
              </p>
              <div className="inline-flex items-center gap-3 text-[#d4af37] text-xs tracking-[0.3em] uppercase">
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
    className="group block border border-[#2b2b2b] hover:border-[#d4af37]/60 transition-colors duration-500 bg-[#0d0d0e]"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={store.cover}
        alt={store.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      {store.badge && (
        <div className="absolute top-4 left-4 text-[9px] tracking-[0.4em] text-[#d4af37] bg-black/70 backdrop-blur-sm px-3 py-1.5 uppercase border border-[#d4af37]/30">
          {store.badge}
        </div>
      )}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1.5">
        <Star className="w-3 h-3 text-[#d4af37] fill-current" />
        <span className="text-[11px] text-[#f5f0e6] font-medium">{store.rating}</span>
      </div>
    </div>

    <div className="p-6">
      <span className="text-[10px] tracking-[0.4em] text-[#d4af37] uppercase block mb-3">
        {store.tagline}
      </span>
      <h3 className="font-serif text-2xl text-[#f5f0e6] mb-3 leading-tight group-hover:text-[#d4af37] transition-colors duration-500">
        {store.name}
      </h3>
      <p className="text-[#a0998a] text-sm leading-relaxed mb-6 font-light min-h-[42px]">
        {store.description}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-[#2b2b2b]">
        <span className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#6b6356] uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" /> Parceiro Verificado
        </span>
        <span className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] text-[#d4af37] uppercase group-hover:tracking-[0.4em] transition-all duration-500">
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
    className="group block border border-[#d4af37]/25 hover:border-[#d4af37] transition-colors duration-500 bg-gradient-to-br from-[#1a1410] to-[#0b0b0b] p-8"
  >
    <span className="text-[9px] tracking-[0.5em] text-[#6b6356] uppercase block mb-4">
      Patrocinado · {banner.sponsor}
    </span>
    <h3 className="font-serif text-2xl text-[#f5f0e6] mb-3 leading-tight">
      {banner.headline}
    </h3>
    <p className="text-[#a0998a] text-sm leading-relaxed mb-8 font-light">
      {banner.description}
    </p>
    <div className="inline-flex items-center gap-2 text-[#d4af37] text-[10px] tracking-[0.4em] uppercase group-hover:tracking-[0.5em] transition-all duration-500">
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
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f0e6] font-sans antialiased overflow-x-hidden">
      <AgeOverlay />
      <Header />

      <main>
        <ShopHero banner={topBanner} />

        {/* Filters + search */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-8">
          <div className="border-y border-[#2b2b2b] py-6 flex flex-col lg:flex-row lg:items-center gap-5 lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {shopCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`text-[10px] tracking-[0.3em] uppercase px-4 py-2.5 border transition-colors duration-300 ${
                    active === c.id
                      ? "border-[#d4af37] text-[#d4af37] bg-[#d4af37]/5"
                      : "border-[#2b2b2b] text-[#a0998a] hover:border-[#d4af37]/50 hover:text-[#f5f0e6]"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="relative flex items-center min-w-[260px]">
              <Search className="w-4 h-4 text-[#6b6356] absolute left-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar parceiro..."
                className="w-full bg-transparent border border-[#2b2b2b] focus:border-[#d4af37] text-[#f5f0e6] placeholder:text-[#6b6356] pl-11 pr-4 py-3 text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mt-4 text-[10px] tracking-[0.4em] text-[#6b6356] uppercase">
            {filtered.length} parceiro{filtered.length !== 1 ? "s" : ""} encontrado
            {filtered.length !== 1 ? "s" : ""}
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-[#a0998a] mb-3">
                Nenhum parceiro encontrado.
              </p>
              <p className="text-[#6b6356] text-sm">Tente outra categoria ou termo de busca.</p>
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
        <section className="border-t border-[#2b2b2b]">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-20 text-center">
            <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase block mb-5">
              Para marcas
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0e6] leading-tight mb-6">
              Sua boutique no <span className="italic text-[#d4af37]">marketplace</span> Lux.
            </h2>
            <p className="text-[#a0998a] max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-10 font-light">
              Acesso a uma audiência verificada, alto poder aquisitivo e curadoria editorial
              exclusiva. Apenas marcas aprovadas pelo conselho Lux Society.
            </p>
            <a
              href="mailto:parceiros@lux.sex"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#d4af37] hover:bg-[#e6c25a] text-black text-xs tracking-[0.3em] uppercase font-medium transition-colors duration-500"
            >
              Solicitar Parceria
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {footerBanner && <AdBanner variant="footer" data={footerBanner} />}
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Shop;
