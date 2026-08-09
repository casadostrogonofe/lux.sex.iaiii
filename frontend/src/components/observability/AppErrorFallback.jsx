import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export const AppErrorFallback = ({ resetError }) => (
  <main
    className="min-h-screen bg-[#050208] px-6 py-24 text-[#f5f0ff]"
    data-testid="application-error-state"
    role="alert"
  >
    <div className="mx-auto max-w-xl border-l-2 border-[#d4af37] pl-6">
      <AlertTriangle className="mb-5 h-6 w-6 text-[#d4af37]" aria-hidden="true" />
      <h1 className="font-serif text-4xl">Algo interrompeu a experiência.</h1>
      <p className="mt-4 text-sm leading-7 text-[#a89fc4]">
        O incidente foi registrado sem dados pessoais. Tente carregar a interface novamente.
      </p>
      <button
        type="button"
        onClick={resetError}
        className="mt-8 inline-flex items-center gap-2 border border-[#9b30ff] px-5 py-3 text-xs uppercase tracking-[0.2em] text-[#f5f0ff] transition-colors duration-200 hover:bg-[#9b30ff]/15"
        data-testid="application-error-retry-button"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Tentar novamente
      </button>
    </div>
  </main>
);