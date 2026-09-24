import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link2, MessageCircle, Check } from "lucide-react";

const ShareRow = ({ shareUrl, shareText }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] uppercase tracking-[0.3em] text-[#7c7893]">
        {t("horoscope.share.label", "Compartilhar")}
      </span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1f1a35] text-[#a89fc4] transition-colors hover:border-[#25d366] hover:text-[#25d366]"
        data-testid="share-whatsapp"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copy}
        className="flex h-8 items-center gap-1.5 rounded-full border border-[#1f1a35] px-3 text-[10px] uppercase tracking-[0.2em] text-[#a89fc4] transition-colors hover:border-[#9b30ff] hover:text-[#f5f0ff]"
        data-testid="share-copy"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[#d4af37]" />
        ) : (
          <Link2 className="h-3.5 w-3.5" />
        )}
        {copied
          ? t("horoscope.share.copied", "Copiado!")
          : t("horoscope.share.copy", "Copiar link")}
      </button>
    </div>
  );
};

export default ShareRow;
