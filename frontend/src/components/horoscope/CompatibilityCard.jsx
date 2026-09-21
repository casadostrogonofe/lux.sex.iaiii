import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Heart, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;
const AGNES_LOGO = "/agnes-logo.jpeg";

const SIGN_OPTIONS = [
  { id: "aries", name: "Áries" },
  { id: "touro", name: "Touro" },
  { id: "gemeos", name: "Gêmeos" },
  { id: "cancer", name: "Câncer" },
  { id: "leao", name: "Leão" },
  { id: "virgem", name: "Virgem" },
  { id: "libra", name: "Libra" },
  { id: "escorpiao", name: "Escorpião" },
  { id: "sagitario", name: "Sagitário" },
  { id: "capricornio", name: "Capricórnio" },
  { id: "aquario", name: "Aquário" },
  { id: "peixes", name: "Peixes" },
];

const emptyPerson = () => ({
  nome: "",
  data_nascimento: "",
  hora_nascimento: "",
  cidade: "",
  uf: "",
  pais: "Brasil",
});

const inputClass =
  "bg-[#0a0612] border border-[#1f1a35] text-[#f5f0ff] text-sm rounded-xl px-3 py-2.5 focus:border-[#9b30ff] outline-none w-full";

const PersonFields = ({ person, setPerson, idx, t }) => (
  <div className="rounded-xl border border-[#1f1a35] p-4 space-y-3">
    <span className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase">
      {t("horoscope.compat.person", "Pessoa")} {idx}
    </span>
    <input
      className={inputClass}
      placeholder={t("horoscope.compat.name", "Nome")}
      value={person.nome}
      onChange={(e) => setPerson({ ...person, nome: e.target.value })}
      data-testid={`compat-p${idx}-nome`}
    />
    <div className="flex gap-2">
      <input
        type="date"
        className={inputClass}
        value={person.data_nascimento}
        onChange={(e) => setPerson({ ...person, data_nascimento: e.target.value })}
        data-testid={`compat-p${idx}-data`}
        aria-label={t("horoscope.compat.birthdate", "Data de nascimento")}
      />
      <input
        type="time"
        className={inputClass}
        value={person.hora_nascimento}
        onChange={(e) => setPerson({ ...person, hora_nascimento: e.target.value })}
        data-testid={`compat-p${idx}-hora`}
        aria-label={t("horoscope.compat.birthtime", "Hora")}
      />
    </div>
    <div className="flex gap-2">
      <input
        className={inputClass}
        placeholder={t("horoscope.compat.city", "Cidade")}
        value={person.cidade}
        onChange={(e) => setPerson({ ...person, cidade: e.target.value })}
        data-testid={`compat-p${idx}-cidade`}
      />
      <input
        className={`${inputClass} max-w-[80px]`}
        placeholder="UF"
        maxLength={2}
        value={person.uf}
        onChange={(e) => setPerson({ ...person, uf: e.target.value.toUpperCase() })}
        data-testid={`compat-p${idx}-uf`}
      />
    </div>
  </div>
);

const CompatibilityCard = () => {
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState("sign");
  const [sign1, setSign1] = useState("aries");
  const [sign2, setSign2] = useState("leao");
  const [p1, setP1] = useState(emptyPerson());
  const [p2, setP2] = useState(emptyPerson());
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const lang = () => (i18n.resolvedLanguage || "pt").split("-")[0];

  const analyseSign = async () => {
    setLoading(true);
    setError(false);
    setResult(null);
    try {
      const res = await fetch(
        `${API}/horoscope/compat?sign1=${sign1}&sign2=${sign2}&lang=${lang()}`,
      );
      if (!res.ok) throw new Error("bad status");
      setResult(await res.json());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const analyseFull = async () => {
    setLoading(true);
    setError(false);
    setResult(null);
    try {
      const res = await fetch(`${API}/horoscope/compat/full`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pessoas: [p1, p2],
          foco_analise: "relacionamento",
          lang: lang(),
        }),
      });
      if (!res.ok) throw new Error("bad status");
      const data = await res.json();
      setResult({ ...data, name1: p1.nome || "Pessoa 1", name2: p2.nome || "Pessoa 2" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    "bg-[#0a0612] border border-[#1f1a35] text-[#f5f0ff] text-sm font-serif rounded-xl px-4 py-3 focus:border-[#9b30ff] outline-none w-full";

  const tabClass = (active) =>
    `px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase transition-colors ${
      active
        ? "bg-[#9b30ff] text-white"
        : "border border-[#1f1a35] text-[#a89fc4] hover:text-[#f5f0ff]"
    }`;

  const reading = result?.reading;

  return (
    <div
      className="mt-16 rounded-2xl border border-[#1f1a35] bg-[#0b0812] p-7 md:p-10"
      data-testid="compatibility-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-4 h-4 text-[#d4af37]" />
        <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase">
          {t("horoscope.compat.tag", "Combinação dos signos")}
        </span>
      </div>
      <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0ff] mb-6">
        {t("horoscope.compat.title", "Compatibilidade amorosa")}
      </h2>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          className={tabClass(mode === "sign")}
          onClick={() => {
            setMode("sign");
            setResult(null);
          }}
          data-testid="compat-mode-sign"
        >
          {t("horoscope.compat.mode_sign", "Por signo")}
        </button>
        <button
          type="button"
          className={tabClass(mode === "birth")}
          onClick={() => {
            setMode("birth");
            setResult(null);
          }}
          data-testid="compat-mode-birth"
        >
          {t("horoscope.compat.mode_birth", "Sinastria completa")}
        </button>
      </div>

      {mode === "sign" ? (
        <div className="flex flex-col sm:flex-row items-stretch gap-4 mb-6">
          <select
            value={sign1}
            onChange={(e) => setSign1(e.target.value)}
            className={selectClass}
            data-testid="compat-sign1"
            aria-label={t("horoscope.compat.sign1", "Primeiro signo")}
          >
            {SIGN_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <span className="hidden sm:flex items-center text-[#d4af37] font-serif text-2xl">
            +
          </span>
          <select
            value={sign2}
            onChange={(e) => setSign2(e.target.value)}
            className={selectClass}
            data-testid="compat-sign2"
            aria-label={t("horoscope.compat.sign2", "Segundo signo")}
          >
            {SIGN_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={analyseSign}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#9b30ff] text-white text-[10px] tracking-[0.25em] uppercase hover:bg-[#8420e8] transition-colors disabled:opacity-60 whitespace-nowrap"
            data-testid="compat-analyse-btn"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {t("horoscope.compat.action", "Ver combinação")}
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <PersonFields person={p1} setPerson={setP1} idx={1} t={t} />
            <PersonFields person={p2} setPerson={setP2} idx={2} t={t} />
          </div>
          <button
            type="button"
            onClick={analyseFull}
            disabled={loading || !p1.data_nascimento || !p2.data_nascimento}
            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#9b30ff] text-white text-[10px] tracking-[0.25em] uppercase hover:bg-[#8420e8] transition-colors disabled:opacity-50"
            data-testid="compat-full-btn"
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {t("horoscope.compat.action_full", "Ver sinastria")}
          </button>
        </div>
      )}

      {error && (
        <p className="text-[#a89fc4] text-sm" role="alert" data-testid="compat-error">
          {t("horoscope.ai.error")}
        </p>
      )}

      {result && (result.text || reading) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-2 space-y-5"
          data-testid="compat-result"
        >
          <div className="flex items-center gap-4">
            <span className="font-serif text-2xl text-[#f5f0ff]">
              {result.name1} <span className="text-[#d4af37]">+</span> {result.name2}
            </span>
            {reading && (
              <span
                className="ml-auto font-serif text-3xl text-[#d4af37]"
                data-testid="compat-score"
              >
                {reading.score}%
              </span>
            )}
          </div>

          {reading && (
            <div className="h-2 rounded-full bg-[#1b1427] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9b30ff] to-[#d4af37] transition-[width] duration-500"
                style={{ width: `${reading.score}%` }}
              />
            </div>
          )}

          {result.official && result.text ? (
            <p
              className="text-[#cfc5e8] text-[15px] leading-[1.8] font-light whitespace-pre-line"
              data-testid="compat-official-text"
            >
              {result.text}
            </p>
          ) : (
            reading && (
              <>
                <p className="text-[#cfc5e8] text-[15px] leading-[1.8] font-light">
                  {reading.summary}
                </p>
                <div className="grid sm:grid-cols-2 gap-5 pt-2 border-t border-[#1f1a35]">
                  <div>
                    <span className="text-[9px] tracking-[0.3em] text-[#7c7893] uppercase block mb-1">
                      {t("horoscope.compat.strengths", "Pontos fortes")}
                    </span>
                    <p className="text-[#a89fc4] text-sm leading-relaxed">
                      {reading.strengths}
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] tracking-[0.3em] text-[#7c7893] uppercase block mb-1">
                      {t("horoscope.compat.challenges", "Desafios")}
                    </span>
                    <p className="text-[#a89fc4] text-sm leading-relaxed">
                      {reading.challenges}
                    </p>
                  </div>
                </div>
                <p className="text-[#f5f0ff] text-sm italic font-serif">
                  “{reading.advice}”
                </p>
              </>
            )
          )}

          <div className="pt-4 border-t border-[#1f1a35] flex items-center gap-3">
            <img
              src={AGNES_LOGO}
              alt="Mestre Agnes"
              className="w-8 h-8 rounded-full object-cover border border-[#d4af37]/40"
            />
            <span className="text-[10px] tracking-[0.25em] text-[#7c7893] uppercase">
              {result.official
                ? t("horoscope.compat.official_badge", "Sinastria oficial · Mestre Agnes")
                : t("horoscope.agnes.updated_by", "Atualizado por Mestre Agnes")}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CompatibilityCard;
