import React from "react";
import { Instagram, Play } from "lucide-react";

const extractReelId = (url) => {
  if (!url) return null;
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([\w-]+)/);
  return match ? match[1] : null;
};

export const EditorReelGrid = ({ editors, label }) => {
  const items = editors.slice(0, 4);
  if (items.length === 0) return null;

  return (
    <div className="mb-12 mt-10">
      <span className="mb-4 block text-[10px] uppercase tracking-[0.5em] text-[#9b30ff]">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {items.map((editor) => {
          const reelId = extractReelId(editor.instagramReelUrl);
          return (
            <a
              key={editor._id || editor.id}
              href={editor.instagramReelUrl || editor.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[9/16] overflow-hidden rounded-2xl border border-[#1f1a35] transition-colors duration-300 hover:border-[#9b30ff]/60"
              data-testid={`editor-reel-${editor.slug || editor.id}`}
            >
              {reelId ? (
                <iframe
                  src={`https://www.instagram.com/p/${reelId}/embed`}
                  className="absolute inset-0 h-full w-full"
                  title={editor.name}
                  scrolling="no"
                  frameBorder="0"
                />
              ) : (
                <>
                  {editor.photo ? (
                    <img
                      src={editor.photo}
                      alt={editor.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a0d2e] to-[#0a0612] font-serif text-6xl text-[#9b30ff]/40">
                      {editor.name?.charAt(0) || "?"}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#9b30ff]">
                    <Play className="h-4 w-4 fill-white text-white" aria-hidden="true" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-1.5 flex items-center gap-1.5 text-[#ff2bd6]">
                      <Instagram className="h-3 w-3" aria-hidden="true" />
                      <span className="text-[8px] uppercase tracking-[0.3em]">Reels</span>
                    </div>
                    <p className="font-serif text-base leading-tight text-[#f5f0ff]">{editor.name}</p>
                  </div>
                </>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};