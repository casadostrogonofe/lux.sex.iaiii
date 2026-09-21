import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

const VisitorCounter = () => {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const alreadyCounted = sessionStorage.getItem("luxsex_visited") === "1";
    (async () => {
      try {
        const res = await fetch(`${API}/stats/visits`, {
          method: alreadyCounted ? "GET" : "POST",
        });
        const data = await res.json();
        if (!cancelled) setCount(data.count ?? 0);
        if (!alreadyCounted) sessionStorage.setItem("luxsex_visited", "1");
      } catch {
        /* counter unavailable */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  const locale = (i18n.resolvedLanguage || "pt").startsWith("pt")
    ? "pt-BR"
    : i18n.resolvedLanguage || "en";

  return (
    <div
      className="flex items-center gap-2 text-[10px] tracking-[0.35em] text-[#5a5470] uppercase"
      data-testid="visitor-counter"
    >
      <Eye className="w-3.5 h-3.5 text-[#9b30ff]" />
      <span className="text-[#9b30ff] font-serif tracking-normal text-sm" data-testid="visitor-count">
        {Number(count).toLocaleString(locale)}
      </span>
      <span>{t("footer.visits", "acessos")}</span>
    </div>
  );
};

export default VisitorCounter;
