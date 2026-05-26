import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music2 } from "lucide-react";
import { SOUNDCLOUD_URL } from "../mock/mockData";

// Autoplay + loop playlist with minimal controls (mute + volume only)
const WIDGET_SRC = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  SOUNDCLOUD_URL
)}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false&single_active=false`;

const MusicPlayer = () => {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const playlistRef = useRef([]);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true); // browsers block sound autoplay
  const [volume, setVolume] = useState(50);
  const [showVolume, setShowVolume] = useState(false);
  const [trackInfo, setTrackInfo] = useState({ title: "", artist: "" });
  const volumeTimeout = useRef(null);

  const updateCurrentTrack = (widget) => {
    if (!widget) return;
    widget.getCurrentSound((sound) => {
      if (!sound) return;
      const fullTitle = sound.title || "";
      const parts = fullTitle.split(/[-–—]/);
      let artist = sound.user?.username || "";
      let title = fullTitle;
      if (parts.length >= 2) {
        artist = parts[0].trim();
        title = parts.slice(1).join(" - ").trim();
      }
      setTrackInfo({ title, artist });
    });
  };

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
        if (attempts++ < 80) setTimeout(init, 250);
        return;
      }
      try {
        const widget = SC.Widget(iframe);
        widgetRef.current = widget;

        widget.bind(SC.Widget.Events.READY, () => {
          setReady(true);
          widget.setVolume(0);
          widget.getSounds((sounds) => {
            playlistRef.current = sounds || [];
          });
          // Start from first track and play through the set
          widget.skip(0);
          widget.play();
          updateCurrentTrack(widget);
        });

        widget.bind(SC.Widget.Events.PLAY, () => {
          updateCurrentTrack(widget);
        });
        widget.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
          // Cheap throttle: only update if title is empty (first load)
          if (!widgetRef.current?._trackKnown) {
            updateCurrentTrack(widget);
            widgetRef.current._trackKnown = true;
          }
        });

        // Advance through the playlist and loop back to the start at the end
        widget.bind(SC.Widget.Events.FINISH, () => {
          widget.getCurrentSoundIndex((index) => {
            widget.getSounds((sounds) => {
              const total = (sounds || []).length || 1;
              const next = (index + 1) % total;
              widget.skip(next);
              widget.play();
              setTimeout(() => updateCurrentTrack(widget), 800);
            });
          });
        });
      } catch (e) {
        // ignore
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, []);

  const applyVolume = (v) => {
    const w = widgetRef.current;
    if (!w) return;
    w.setVolume(v);
  };

  const onVolumeChange = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (v === 0) {
      setMuted(true);
      applyVolume(0);
    } else {
      setMuted(false);
      applyVolume(v);
    }
  };

  const toggleMute = () => {
    const w = widgetRef.current;
    if (!w) return;
    if (muted) {
      setMuted(false);
      const v = volume === 0 ? 50 : volume;
      setVolume(v);
      applyVolume(v);
      // Force a play() on user gesture — browser allows audible playback now
      w.play();
      setTimeout(() => {
        w.isPaused((paused) => {
          if (paused) w.play();
        });
        updateCurrentTrack(w);
      }, 400);
    } else {
      setMuted(true);
      applyVolume(0);
    }
  };

  const handleEnter = () => {
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
    setShowVolume(true);
  };
  const handleLeave = () => {
    volumeTimeout.current = setTimeout(() => setShowVolume(false), 400);
  };

  return (
    <div
      className="relative flex items-center gap-3"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Neon "now playing" marquee — visible when ready and not muted */}
      {ready && trackInfo.artist && !muted && (
        <div
          className="hidden md:flex items-center gap-2 max-w-[180px] overflow-hidden"
          data-testid="now-playing-neon"
          aria-live="polite"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff2bd6] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff2bd6]" />
          </span>
          <div className="flex flex-col leading-[1.1] overflow-hidden">
            <span
              className="font-serif text-[9px] uppercase tracking-[0.28em] whitespace-nowrap truncate"
              style={{
                color: "#ff2bd6",
                textShadow:
                  "0 0 3px #ff2bd6, 0 0 7px rgba(255,43,214,0.85)",
              }}
              title={trackInfo.artist}
            >
              {trackInfo.artist}
            </span>
            {trackInfo.title && (
              <span
                className="text-[8px] tracking-[0.2em] text-[#b48cff]/80 uppercase whitespace-nowrap truncate"
                title={trackInfo.title}
              >
                {trackInfo.title}
              </span>
            )}
          </div>
        </div>
      )}

      <button
        onClick={toggleMute}
        disabled={!ready}
        aria-label={muted ? "Tirar mudo" : "Mutar"}
        className="flex items-center gap-2 px-3 py-2 border border-[#1f1a35] hover:border-[#9b30ff]/50 text-[#7c7893] hover:text-[#9b30ff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 rounded-full"
      >
        <Music2 className="w-3 h-3 text-[#9b30ff]" />
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Vertical volume slider */}
      {showVolume && ready && (
        <div
          className="absolute top-full right-0 mt-3 z-50 bg-[#0a0612]/97 backdrop-blur-xl border border-[#1f1a35] rounded-2xl px-3 py-5 flex flex-col items-center gap-3 shadow-2xl shadow-black/60"
          style={{ minWidth: 56 }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <span className="text-[9px] tracking-[0.3em] text-[#9b30ff] uppercase">
            {volume}
          </span>
          <div className="h-32 flex items-center justify-center">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={volume}
              onChange={onVolumeChange}
              aria-label="Volume"
              className="lux-volume"
            />
          </div>
          <span className="text-[8px] tracking-[0.3em] text-[#5a5470] uppercase">
            Lux
          </span>
        </div>
      )}

      {/* Hidden iframe with autoplay — kept rendered (visibility hidden, off-screen) so SoundCloud doesn't pause */}
      <iframe
        ref={iframeRef}
        title="Lux Radio"
        width="300"
        height="80"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={WIDGET_SRC}
        style={{
          position: "fixed",
          width: 300,
          height: 80,
          opacity: 0,
          pointerEvents: "none",
          bottom: -200,
          left: -2000,
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default MusicPlayer;
