import React from "react";
import { Link } from "react-router-dom";
import { Dice5, Users, Sparkles, Lock } from "lucide-react";
import { luxGames } from "../mock/mockData";

const Apostas = () => (
  <section className="pt-32 md:pt-40 pb-24">
    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#5a5470] uppercase mb-8">
        <Link to="/shop" className="hover:text-[#9b30ff] transition-colors">
          Shop
        </Link>
        <span className="text-[#9b30ff]">›</span>
        <span className="text-[#9b30ff]">Apostas & Bets</span>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#9b30ff]" />
        <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#9b30ff] uppercase">
          Lux Casino · Beta MMXXVI
        </span>
      </div>

      <h1 className="font-serif text-[#f5f0ff] text-5xl md:text-7xl leading-[1.05] mb-8">
        Jogos com <span className="italic text-[#9b30ff]">fundo erótico</span>.
      </h1>
      <p className="text-[#7c7893] max-w-2xl text-base md:text-lg leading-relaxed mb-16 font-light">
        Roleta, slots e mesas privadas — toda a estética da plataforma, com prêmios em produtos
        da boutique Lux e experiências exclusivas.
      </p>

      {/* Games grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {luxGames.map((g) => (
          <div
            key={g.id}
            className="group bg-[#0b0812] border border-[#1a1526] hover:border-[#9b30ff]/50 transition-colors duration-300 flex flex-col"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={g.image}
                alt={g.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 text-[9px] tracking-[0.4em] text-[#9b30ff] bg-black/70 backdrop-blur-sm px-3 py-1.5 uppercase border border-[#9b30ff]/30">
                {g.category}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-2xl text-[#f5f0ff] leading-tight mb-2">
                  {g.name}
                </h3>
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#7c7893] uppercase">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {g.players}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
                  <span className="text-[#9b30ff]">{g.multiplier}</span>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[#7c7893] text-xs leading-relaxed mb-5 font-light">
                {g.description}
              </p>
              <button
                className="w-full py-2.5 border border-[#9b30ff]/40 hover:border-[#9b30ff] text-[#9b30ff] text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Dice5 className="w-3.5 h-3.5" />
                Acesso Beta
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: Sparkles, title: "Prêmios em produtos", text: "Ganhe peças da boutique Lux, kits boudoir e experiências curadas." },
          { icon: Users, title: "Mesas privadas", text: "Acesso por convite. Buy-in mínimo, ambiente fechado e criptografado." },
          { icon: Lock, title: "Jogo responsável", text: "Limites diários, autoexclusão e suporte 24h. Apostas conscientes, sempre." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="border border-[#1a1526] p-8">
            <Icon className="w-7 h-7 text-[#9b30ff] mb-5" strokeWidth={1.5} />
            <h4 className="font-serif text-xl text-[#f5f0ff] mb-3">{title}</h4>
            <p className="text-[#7c7893] text-sm leading-relaxed font-light">{text}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="border-t border-[#1a1526] pt-10 text-center">
        <p className="text-[10px] tracking-[0.4em] text-[#5a5470] uppercase">
          18+ · Jogo responsável · CGU-MG · Beta privada com lista de espera
        </p>
      </div>
    </div>
  </section>
);

export default Apostas;
