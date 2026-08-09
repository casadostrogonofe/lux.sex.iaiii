import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const PersonalReading = () => {
  const { t, i18n } = useTranslation();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [focus, setFocus] = useState("");
  const [gender, setGender] = useState("");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState(false);
  const outputRef = useRef(null);

  const generate = async (e) => {
    e.preventDefault();
    if (streaming || !name.trim() || !birthdate) return;
    setStreaming(true);
    setOutput("");
    setError(false);
    try {
      const lang = (i18n.resolvedLanguage || "pt").split("-")[0];
      const res = await fetch(`${API}/horoscope/personal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          birthdate,
          lang,
          focus: focus.trim() || null,
          gender: gender || null,
        }),
      });
      if (!res.ok || !res.body) throw new Error("bad status");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data: ")) continue;
          try {
            const payload = JSON.parse(line.slice(6));
            if (payload.t) setOutput((prev) => prev + payload.t);
            if (payload.error) setError(true);
          } catch {
            // skip malformed chunk
          }
        }
      }
    } catch {
      setError(true);
    } finally {
      setStreaming(false);
    }
  };

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
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase">
              {t("horoscope.ai.personal_tag")}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5f0ff] mb-3">
            {t("horoscope.ai.personal_title")}
          </h2>
          <p className="text-[#a89fc4] text-sm md:text-base font-light leading-[1.7] max-w-xl mb-8">
            {t("horoscope.ai.personal_subtitle")}
          </p>

          <div className="mb-6">
            <span className="text-[9px] tracking-[0.3em] text-[#7c7893] uppercase block mb-2">
              {t("horoscope.ai.gender_label")}
            </span>
            <div className="flex gap-2">
              {[
                { id: "male", label: t("horoscope.ai.gender_male") },
                { id: "female", label: t("horoscope.ai.gender_female") },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGender(gender === g.id ? "" : g.id)}
                  className={`px-6 py-2.5 rounded-full border text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${
                    gender === g.id
                      ? "border-[#9b30ff] text-[#9b30ff] bg-[#9b30ff]/10"
                      : "border-[#1f1a35] text-[#7c7893] hover:border-[#9b30ff]/40 hover:text-[#f5f0ff]"
                  }`}
                  data-testid={`personal-gender-${g.id}`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={generate} className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-[9px] tracking-[0.3em] text-[#7c7893] uppercase block mb-2">
                {t("horoscope.ai.name_label")}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={80}
                className="w-full bg-[#0f0c18] border border-[#1f1a35] focus:border-[#9b30ff] text-[#f5f0ff] placeholder:text-[#5a5470] px-4 py-3 text-sm outline-none transition-colors rounded-lg"
                data-testid="personal-name-input"
              />
            </div>
            <div>
              <label className="text-[9px] tracking-[0.3em] text-[#7c7893] uppercase block mb-2">
                {t("horoscope.ai.birth_label")}
              </label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="w-full bg-[#0f0c18] border border-[#1f1a35] focus:border-[#9b30ff] text-[#f5f0ff] px-4 py-3 text-sm outline-none transition-colors rounded-lg [color-scheme:dark]"
                data-testid="personal-birthdate-input"
              />
            </div>
            <div>
              <label className="text-[9px] tracking-[0.3em] text-[#7c7893] uppercase block mb-2">
                {t("horoscope.ai.focus_label")}
              </label>
              <input
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                maxLength={200}
                placeholder={t("horoscope.ai.focus_placeholder")}
                className="w-full bg-[#0f0c18] border border-[#1f1a35] focus:border-[#9b30ff] text-[#f5f0ff] placeholder:text-[#5a5470] px-4 py-3 text-sm outline-none transition-colors rounded-lg"
                data-testid="personal-focus-input"
              />
            </div>
          </form>

          <button
            onClick={generate}
            disabled={streaming || !name.trim() || !birthdate}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#9b30ff] hover:bg-[#b15aff] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] tracking-[0.3em] uppercase transition-colors rounded-full"
            data-testid="personal-generate-btn"
          >
            {streaming ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("horoscope.ai.generating")}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                {t("horoscope.ai.generate")}
              </>
            )}
          </button>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-6 text-[#a89fc4] text-sm"
                data-testid="personal-reading-error"
                role="alert"
              >
                {t("horoscope.ai.error")}
              </motion.p>
            )}
          </AnimatePresence>

          {streaming && (
            <p
              className="mt-5 text-[10px] uppercase tracking-[0.2em] text-[#7c7893]"
              data-testid="personal-reading-progress"
              role="status"
              aria-live="polite"
            >
              {t("horoscope.ai.generating")}
              {output.length > 0 ? ` · ${output.length}` : ""}
            </p>
          )}

          {output && (
            <motion.div
              ref={outputRef}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              className="mt-8 pt-8 border-t border-[#1f1a35] max-w-2xl"
              data-testid="personal-reading-output"
              aria-live="polite"
            >
              {output.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="text-[#cfc5e8] text-[15px] leading-[1.85] font-light mb-5">
                  {para}
                </p>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalReading;
