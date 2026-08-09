import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Music2, Volume2, VolumeX, X, ChevronUp } from "lucide-react";
import { SOUNDCLOUD_URL } from "../mock/mockData";

const WIDGET_SRC = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  SOUNDCLOUD_URL
)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false`;

const FloatingMusicPlayer = () => {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [track, setTrack] = useState({ title: "Lux Sessions", artist: "Massive Jack" });

  useEffect(() => {
    const SCRIPT_ID = "sc-widget-api";
    if (document.getElementById(SCRIPT_ID)) return;
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://w.soundcloud.com/player/api.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const init = () => {
      if (cancelled) return;
      const SC = window.SC;
      const iframe = iframeRef.current;
      if (!SC || !iframe) {
        if (attempts++ < 60) setTimeout(init, 250);
        return;
      }
      try {
        const widget = SC.Widget(iframe);
        widgetRef.current = widget;
        widget.bind(SC.Widget.Events.READY, () => {
          setReady(true);
          widget.getCurrentSound((sound) => {
            if (!sound) return;
            setTrack({
              title: sound.title || "Lux Sessions",
              artist: sound.user?.username || "Massive Jack",
            });
          });
        });
        widget.bind(SC.Widget.Events.PLAY, () => setPlaying(true));
        widget.bind(SC.Widget.Events.PAUSE, () => setPlaying(false));
        widget.bind(SC.Widget.Events.FINISH, () => setPlaying(false));
      } catch (e) {
        console.warn("SC Widget init failed", e);
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = () => {
    const w = widgetRef.current;
    if (!w) return;
    if (playing) w.pause();
    else w.play();
  };

  const toggleMute = () => {
    const w = widgetRef.current;
    if (!w) return;
    if (muted) {
      w.setVolume(80);
      setMuted(false);
    } else {
      w.setVolume(0);
      setMuted(true);
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* Floating widget — fixed bottom-right */}
      <div
        className="fixed bottom-6 right-6 z-40 transition-all duration-500"
        style={{ transform: collapsed ? "translateY(0)" : "translateY(0)" }}
      >
        {collapsed ? (
          // Collapsed: just a circular button
          <button
            onClick={() => setCollapsed(false)}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 group"
            style={{
              background: "linear-gradient(180deg, #b15aff 0%, #9b30ff 50%, #7a18d8 100%)",
              boxShadow:
                "0 0 24px rgba(155, 48, 255, 0.5), 0 6px 20px rgba(155, 48, 255, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            aria-label="Abrir player"
          >
            {playing ? (
              <Pause className="w-5 h-5 text-white fill-current" />
            ) : (
              <Play className="w-5 h-5 text-white fill-current ml-0.5" />
            )}
          </button>
        ) : (
          // Expanded pill
          <div
            className="flex items-center gap-3 bg-[#0a0612]/95 backdrop-blur-xl border border-[#1f1a35] rounded-full pl-2 pr-4 py-2 shadow-2xl shadow-black/60"
            style={{ minWidth: 240, maxWidth: 320 }}
          >
            <button
              onClick={toggle}
              disabled={!ready}
              aria-label={playing ? "Pausar" : "Tocar"}
              className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
              style={{
                background: "linear-gradient(180deg, #b15aff 0%, #9b30ff 50%, #7a18d8 100%)",
                boxShadow:
                  "0 0 16px rgba(155, 48, 255, 0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {playing ? (
                <Pause className="w-4 h-4 text-white fill-current" />
              ) : (
                <Play className="w-4 h-4 text-white fill-current ml-0.5" />
              )}
            </button>

            <div className="flex flex-col leading-tight min-w-0 flex-1">
              <span className="text-[9px] tracking-[0.3em] text-[#9b30ff] uppercase flex items-center gap-1">
                <Music2 className="w-2.5 h-2.5" /> Lux Radio
              </span>
              <span className="text-[12px] text-[#f5f0ff] truncate font-light">
                {ready ? track.title : "Carregando..."}
              </span>
            </div>

            <button
              onClick={toggleMute}
              disabled={!ready}
              aria-label={muted ? "Tirar mudo" : "Mutar"}
              className="text-[#7c7893] hover:text-[#9b30ff] disabled:opacity-40 transition-colors p-1"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setCollapsed(true)}
              aria-label="Minimizar"
              className="text-[#7c7893] hover:text-[#9b30ff] transition-colors p-1"
            >
              <ChevronUp className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        )}
      </div>

      {/* Hidden iframe */}
      <iframe
        ref={iframeRef}
        title="Lux Radio"
        width="1"
        height="1"
        scrolling="no"
        frameBorder="no"
        allow="autoplay; encrypted-media"
        src={WIDGET_SRC}
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
          bottom: 0,
          left: 0,
        }}
      />
    </>
  );
};

export default FloatingMusicPlayer;
