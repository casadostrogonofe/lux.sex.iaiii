import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, EyeOff, Sparkles } from "lucide-react";
import AdBanner from "../components/AdBanner";
import { fetchBannerBySlot } from "../api/banners";

const HomePage = () => {
  const [premiumAd, setPremiumAd] = useState(null);
  const [footerAd, setFooterAd] = useState(null);

  useEffect(() => {
    (async () => {
      const [p, f] = await Promise.all([
        fetchBannerBySlot("lifestyle_premium"),
        fetchBannerBySlot("lifestyle_footer"),
      ]);
      setPremiumAd(p);
      setFooterAd(f);
    })();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-20">
        {/* Ambient gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(75, 22, 130, 0.45), transparent 60%), radial-gradient(ellipse 40% 30% at 70% 70%, rgba(155, 48, 255, 0.18), transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[10px] md:text-xs tracking-[0.5em] text-[#d4af37] uppercase">
              A Estética do Desejo
            </span>
            <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h1 className="font-serif text-[#f5f0ff] text-5xl sm:text-6xl md:text-7xl lg:text-[100px] leading-[1.02] mb-10">
            Encontre sua{" "}
            <span className="italic bg-gradient-to-r from-[#9b30ff] via-[#b48cff] to-[#e6d5ff] bg-clip-text text-transparent">
              fantasia
            </span>
          </h1>

          <p className="text-[#a89fc4] text-base md:text-lg leading-[1.85] font-light max-w-2xl mx-auto mb-14">
            Perfis verificados. Chat ao vivo. Videochamadas. Tudo em um ambiente seguro e 100% discreto.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col items-center gap-5">
            <Link
              to="/turismo"
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full text-black text-[14px] font-medium tracking-[0.2em] uppercase transition-transform duration-300 active:scale-[0.98]"
              style={{
                background:
                  "linear-gradient(180deg, #f0d875 0%, #d4af37 50%, #b8956b 100%)",
                boxShadow:
                  "0 0 28px rgba(212, 175, 55, 0.35), 0 8px 24px rgba(212, 175, 55, 0.2), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              Começar Agora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/sobre"
              className="text-[#7c7893] hover:text-[#d4af37] text-xs tracking-[0.4em] uppercase transition-colors"
            >
              Já tenho conta
            </Link>
          </div>

          {/* Trust line */}
          <div className="mt-24 flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-[0.4em] text-[#5a5470] uppercase">
            <span>Discrição Absoluta</span>
            <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
            <span>Selo de Qualidade Inegociável</span>
            <span className="w-1 h-1 rounded-full bg-[#5a5470]" />
            <span>Acesso Restrito (18+)</span>
          </div>
        </div>
      </section>

      {/* PILLARS SECTION — "O que torna a Lux.Sex diferente" */}
      <section className="border-t border-[#1a1526] py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-[#f5f0ff] text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              O que torna a Lux.Sex{" "}
              <span className="italic text-[#9b30ff]">diferente</span>
            </h2>
            <p className="text-[#7c7893] max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
              Plataforma fechada, curada e construída para quem busca exclusividade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Verificação Real",
                text: "Todo perfil passa por KYC documental e biométrico. Sem perfis falsos.",
              },
              {
                icon: EyeOff,
                title: "100% Discreto",
                text: "Acesso restrito, conteúdo não indexado, ambiente fechado e criptografado.",
              },
              {
                icon: Sparkles,
                title: "Curadoria Premium",
                text: "Qualidade exigida em todo conteúdo. Selo L.S Premium para os criadores top.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="relative bg-[#0a0612] border border-[#1f1a35] rounded-3xl p-10 text-center hover:border-[#9b30ff]/40 transition-colors duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-[#9b30ff]/15 border border-[#9b30ff]/40 flex items-center justify-center mx-auto mb-8">
                  <Icon className="w-6 h-6 text-[#9b30ff]" strokeWidth={1.6} />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-[#f5f0ff] mb-5">
                  {title}
                </h3>
                <p className="text-[#7c7893] text-sm md:text-base leading-relaxed font-light">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD SLOT — Premium */}
      {premiumAd && <AdBanner variant="premium" data={premiumAd} />}

      {/* EXPLORE COMMUNITY */}
      <section className="border-t border-[#1a1526] py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase block mb-5">
            Explore a Comunidade
          </span>
          <h2 className="font-serif text-[#f5f0ff] text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Uma curadoria editorial completa.
          </h2>
          <p className="text-[#7c7893] max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12 font-light">
            Turismo, bem-estar, gastronomia, vida noturna e shop — quatro universos sob a mesma assinatura.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: "Turismo", href: "/turismo" },
              { label: "Bem Estar", href: "/bem-estar" },
              { label: "Vida Noturna", href: "/vida-noturna" },
              { label: "Gastronomia", href: "/gastronomia" },
            ].map((c) => (
              <Link
                key={c.href}
                to={c.href}
                className="group block border border-[#1f1a35] hover:border-[#9b30ff]/50 bg-[#0a0612] rounded-2xl py-8 transition-colors duration-300"
              >
                <span className="font-serif text-xl md:text-2xl text-[#f5f0ff] group-hover:text-[#9b30ff] transition-colors">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {footerAd && <AdBanner variant="footer" data={footerAd} />}
    </>
  );
};

export default HomePage;
