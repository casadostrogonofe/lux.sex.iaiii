import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Store, Dice5, ArrowRight } from "lucide-react";

const tiles = [
  {
    href: "/shop/sex-shop",
    icon: ShoppingBag,
    title: "Sex Shop",
    description: "Marcas parceiras selecionadas pela curadoria Lux. Redirecionamento direto para a boutique.",
    badge: "Marketplace de Parceiros",
  },
  {
    href: "/shop/marketplace",
    icon: Store,
    title: "Marketplace",
    description: "Produtos exclusivos Lux Society com checkout próprio. Edições numeradas, frete privado.",
    badge: "Em breve · Checkout Stripe",
  },
  {
    href: "/shop/apostas",
    icon: Dice5,
    title: "Apostas & Bets",
    description: "Jogos próprios com fundo erótico. Roleta, slots e mesas privadas para convidados.",
    badge: "Beta · Lux Casino",
  },
];

const ShopHub = () => (
  <section className="pt-32 md:pt-40 pb-24">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      <div className="flex items-center gap-6 mb-10">
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#9b30ff]" />
        <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#9b30ff] uppercase">
          Shop · Lux Society MMXXVI
        </span>
      </div>

      <h1 className="font-serif text-[#f5f0ff] text-5xl md:text-7xl lg:text-[88px] leading-[1.05] mb-8">
        Três universos.<br />
        <span className="italic text-[#9b30ff]">Uma curadoria.</span>
      </h1>
      <p className="text-[#7c7893] max-w-2xl text-base md:text-lg leading-relaxed mb-16 font-light">
        Boutiques parceiras, produtos exclusivos e jogos próprios — três experiências distintas dentro do ecossistema Lux.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {tiles.map(({ href, icon: Icon, title, description, badge }) => (
          <Link
            key={href}
            to={href}
            className="group bg-[#0b0812] border border-[#1a1526] hover:border-[#9b30ff]/50 transition-colors duration-300 p-8 md:p-10 flex flex-col"
          >
            <div className="w-14 h-14 rounded-full border border-[#9b30ff]/30 flex items-center justify-center mb-8 group-hover:border-[#9b30ff] group-hover:bg-[#9b30ff]/10 transition-[border-color,background-color] duration-300">
              <Icon className="w-6 h-6 text-[#9b30ff]" strokeWidth={1.5} />
            </div>
            <span className="text-[10px] tracking-[0.4em] text-[#9b30ff] uppercase mb-4">
              {badge}
            </span>
            <h2 className="font-serif text-3xl text-[#f5f0ff] mb-5 leading-tight group-hover:text-[#9b30ff] transition-colors">
              {title}
            </h2>
            <p className="text-[#7c7893] text-sm leading-relaxed mb-8 font-light flex-1">
              {description}
            </p>
            <div className="flex items-center gap-2 text-[#9b30ff] text-xs tracking-[0.3em] uppercase group-hover:tracking-[0.4em] transition-[letter-spacing] duration-300">
              Explorar
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ShopHub;
