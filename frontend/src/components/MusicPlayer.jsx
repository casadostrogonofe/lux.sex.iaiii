import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Music2, Volume2, VolumeX } from "lucide-react";
import { SOUNDCLOUD_URL } from "../mock/mockData";

const WIDGET_SRC = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  SOUNDCLOUD_URL
)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false`;

const MusicPlayer = () => {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [track, setTrack] = useState({ title: "Lux Sessions", artist: "Massive Jack" });

  // Load SC Widget API script once
  useEffect(() => {
    const SCRIPT_ID = "sc-widget-api";
    if (document.getElementById(SCRIPT_ID)) return;
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://w.soundcloud.com/player/api.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Initialize widget when iframe and SC are ready
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const init = () => {
      if (cancelled) return;
      const SC = window.SC;
      const iframe = iframeRef.current;
      if (!SC || !iframe) {
        if (attempts++ < 60) {
          setTimeout(init, 250);
        }
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
        widget.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
          // refresh current sound title only once
          if (!widget._trackLoaded) {
            widget._trackLoaded = true;
            widget.getCurrentSound((sound) => {
              if (!sound) return;
              setTrack({
                title: sound.title || "Lux Sessions",
                artist: sound.user?.username || "Massive Jack",
              });
            });
          }
        });
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

  return (
    <div className="flex items-center gap-2 md:gap-3 bg-black/60 backdrop-blur-md border border-[#2b2b2b] hover:border-[#d4af37]/50 transition-colors duration-500 pl-2 pr-3 py-1.5 group">
      <button
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? "Pausar música" : "Tocar música"}
        className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#d4af37] hover:bg-[#e6c25a] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
      >
        {playing ? (
          <Pause className="w-3.5 h-3.5 text-black fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 text-black fill-current ml-0.5" />
        )}
      </button>

      <div className="hidden sm:flex flex-col leading-tight min-w-0 max-w-[160px]">
        <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase flex items-center gap-1">
          <Music2 className="w-2.5 h-2.5" /> Lux Radio
        </span>
        <span className="text-[11px] text-[#f5f0e6] truncate font-light">
          {ready ? track.title : "Carregando..."}
        </span>
      </div>

      <button
        onClick={toggleMute}
        disabled={!ready}
        aria-label={muted ? "Tirar mudo" : "Mutar"}
        className="text-[#a0998a] hover:text-[#d4af37] disabled:opacity-40 transition-colors hidden md:block"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Hidden iframe used only as audio source */}
      <iframe
        ref={iframeRef}
        title="Lux Radio"
        width="1"
        height="1"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={WIDGET_SRC}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
};

export default MusicPlayer;
