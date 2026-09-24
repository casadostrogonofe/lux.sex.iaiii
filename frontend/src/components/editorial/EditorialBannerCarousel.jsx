import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const EditorialBannerCarousel = ({ section, slides, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => setActiveIndex(0), [section, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % slides.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return (
      <div
        className="aspect-[6/1] w-full border border-[#1f1a35] bg-[#0a0612]"
        data-testid={`editorial-banner-loading-${section}`}
        role="status"
        aria-label="Carregando banner editorial"
      />
    );
  }

  if (slides.length === 0) {
    return (
      <div
        className="aspect-[6/1] w-full border border-dashed border-[#3b3150] bg-[#0a0612] flex items-center justify-center"
        data-testid={`editorial-banner-empty-${section}`}
      >
        <span className="font-serif text-sm sm:text-lg md:text-2xl text-[#756987]">
          Anuncie aqui
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[6/1] w-full overflow-hidden border border-[#1f1a35] bg-[#0a0612]"
      data-testid={`editorial-banner-carousel-${section}`}
    >
      {slides.map((slide, index) => {
        const Slide = slide.href ? "a" : "div";
        return (
          <Slide
            key={slide.id}
            href={slide.href || undefined}
            target={slide.href ? "_blank" : undefined}
            rel={slide.href ? "noopener noreferrer" : undefined}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            data-testid={`editorial-banner-slide-${section}-${index}`}
          >
            <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
            {(slide.eyebrow || slide.title) && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#050208]/80 via-transparent to-transparent" />
            )}
            {(slide.eyebrow || slide.title) && (
              <div className="absolute inset-y-0 left-0 flex max-w-[55%] flex-col justify-center px-4 sm:px-7 md:px-10">
                {slide.eyebrow && (
                  <span className="hidden text-[9px] uppercase tracking-[0.35em] text-[#d4af37] sm:block">
                    {slide.eyebrow}
                  </span>
                )}
                {slide.title && (
                  <h2 className="font-serif text-sm text-[#f5f0ff] sm:mt-1 sm:text-xl md:text-3xl">
                    {slide.title}
                  </h2>
                )}
              </div>
            )}
          </Slide>
        );
      })}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
            }
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors duration-150 hover:bg-[#9b30ff]"
            aria-label="Banner anterior"
            data-testid={`editorial-banner-previous-${section}`}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((index) => (index + 1) % slides.length)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors duration-150 hover:bg-[#9b30ff]"
            aria-label="Próximo banner"
            data-testid={`editorial-banner-next-${section}`}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
};