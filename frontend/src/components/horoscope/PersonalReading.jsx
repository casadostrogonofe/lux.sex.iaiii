import React from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, LogIn, UserCircle } from "lucide-react";

const AGNES_SITE = "https://frontend-nu-opal-d1fi47s48v.vercel.app";
const AGNES_WIZARD = "/agnes-wizard.jpeg";

const PersonalReading = () => {
  const { t } = useTranslation();

  return (
    <section className="mt-20" data-testid="personal-reading-section">
      <div className="relative overflow-hidden rounded-2xl border border-[#1f1a35] bg-[#0a0612] p-8 md:p-12">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 10%, rgba(155,48,255,0.16) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(212,175,55,0.1) 0%, transparent 55%)",
          }}
        />
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <img
              src={AGNES_WIZARD}
              alt="Mestre Agnes"
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border border-[#d4af37]/40 flex-shrink-0"
              data-testid="personal-reading-wizard"
            />
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase">
                  {t("horoscope.ai.personal_tag")}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0ff] mb-3">
                {t("horoscope.ai.personal_title")}
              </h2>
              <p className="text-[#a89fc4] text-sm md:text-base font-light leading-[1.7] max-w-xl">
                {t("horoscope.ai.personal_subtitle")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`${AGNES_SITE}/auth`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#d4af37]/50 text-[#d4af37] text-[10px] tracking-[0.25em] uppercase hover:bg-[#d4af37]/10 transition-colors"
              data-testid="agnes-login-btn"
            >
              <LogIn className="w-3.5 h-3.5" />
              {t("horoscope.agnes.login", "Entrar / Criar conta")}
            </a>
            <a
              href={`${AGNES_SITE}/dashboard`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1f1a35] text-[#a89fc4] text-[10px] tracking-[0.25em] uppercase hover:border-[#9b30ff]/50 hover:text-[#f5f0ff] transition-colors"
              data-testid="agnes-members-btn"
            >
              <UserCircle className="w-3.5 h-3.5" />
              {t("horoscope.agnes.members", "Área de membros")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalReading;
