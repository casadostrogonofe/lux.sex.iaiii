import React, { useState } from "react";
import { Mail, Check } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <section className="border-t border-[#2b2b2b]">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-24 text-center">
        <Mail className="w-10 h-10 text-[#d4af37] mx-auto mb-8" strokeWidth={1} />
        <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase block mb-5">
          Boletim privado
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#f5f0e6] leading-tight mb-6">
          O melhor do Lifestyle, <br /> uma vez por semana.
        </h2>
        <p className="text-[#a0998a] max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-12 font-light">
          Ensaios inéditos, recomendações e o diário da redação. Apenas para assinantes verificados.
        </p>

        <form
          onSubmit={submit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            className="flex-1 bg-transparent border border-[#2b2b2b] focus:border-[#d4af37] text-[#f5f0e6] placeholder:text-[#6b6356] px-5 py-4 text-sm tracking-wider outline-none transition-colors duration-300"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-[#d4af37] hover:bg-[#e6c25a] text-black text-xs tracking-[0.3em] uppercase font-medium transition-colors duration-300 flex items-center justify-center gap-2"
          >
            {done ? (
              <>
                <Check className="w-4 h-4" /> Confirmado
              </>
            ) : (
              "Assinar"
            )}
          </button>
        </form>

        <p className="text-[10px] tracking-[0.3em] text-[#6b6356] uppercase mt-6">
          Sem spam · Cancele quando quiser · LGPD 2026
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
