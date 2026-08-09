import React, { useState } from "react";
import { Play, X } from "lucide-react";
import { videoContent } from "../mock/mockData";

const VideoSection = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-[#070707] border-y border-[#1a1526] py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <span className="text-[10px] tracking-[0.5em] text-[#9b30ff] uppercase block mb-3">
              L.S Filmes
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f5f0ff] leading-tight">
              Vídeos & Ensaios
            </h2>
          </div>
          <p className="text-[#7c7893] text-sm md:text-base max-w-md font-light leading-relaxed">
            Curtas autorais, entrevistas íntimas e ensaios sensoriais produzidos pela equipe Lux Society.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoContent.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v)}
              className="group text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-[#1a1526] group-hover:border-[#9b30ff]/60 transition-colors duration-300">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-[#9b30ff] bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:bg-[#9b30ff] group-hover:scale-110 transition-[background-color,transform] duration-300">
                    <Play className="w-6 h-6 text-[#9b30ff] group-hover:text-black ml-1 fill-current" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute top-4 right-4 text-[10px] tracking-widest text-[#f5f0ff] bg-black/70 backdrop-blur-sm px-2.5 py-1">
                  {v.duration}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[9px] tracking-[0.4em] text-[#9b30ff] uppercase block mb-2">
                    {v.category}
                  </span>
                  <h4 className="font-serif text-lg text-[#f5f0ff] leading-tight">
                    {v.title}
                  </h4>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Player modal */}
      {active && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-6 right-6 text-[#f5f0ff] hover:text-[#9b30ff] transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="w-full max-w-5xl aspect-video border border-[#9b30ff]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;
