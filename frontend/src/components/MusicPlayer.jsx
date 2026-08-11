import React, { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, VolumeX, Music2, RefreshCw } from "lucide-react";
import { useSoundCloudUrl } from "../hooks/useSoundCloudUrl";

// Autoplay + loop entire playlist with minimal UI (single mute button).
// Strategy:
//  • Start muted (volume 0) so browsers allow autoplay.
//  • On user click → setVolume(80), play() and keep retrying play() if widget pauses.
//  • Bind FINISH event to advance to next track (mod total).
const MusicPlayer = () => {
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const userGestureRef = useRef(false);
  const { url, loading, error, retry } = useSoundCloudUrl();
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [trackInfo, setTrackInfo] = useState({ title: "", artist: "" });
  const widgetSrc = useMemo(
    () =>
      url
        ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(
            url,
          )}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&buying=false&sharing=false&download=false&single_active=false`
        : "",
    [url],
  );

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

  // Inject SoundCloud Widget API script
  useEffect(() => {
    const SCRIPT_ID = "sc-widget-api";
    if (document.getElementById(SCRIPT_ID)) return;
    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.src = "https://w.soundcloud.com/player/api.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  // Wire up the widget once script + iframe are ready
  useEffect(() => {
    if (!widgetSrc) return undefined;
    let cancelled = false;
    let attempts = 0;
    setReady(false);
    setMuted(true);
    setTrackInfo({ title: "", artist: "" });
    const init = () => {
      if (cancelled) return;
      const SC = window.SC;
      const iframe = iframeRef.current;
      if (!SC || !iframe) {
        if (attempts++ < 80) setTimeout(init, 250);
        return;
      }
      const widget = SC.Widget(iframe);
      widgetRef.current = widget;

      widget.bind(SC.Widget.Events.READY, () => {
        if (cancelled) return;
        setReady(true);
        widget.setVolume(0);
        widget.skip(0);
        if (userGestureRef.current) widget.play();
        setTimeout(() => updateCurrentTrack(widget), 800);
      });

      widget.bind(SC.Widget.Events.PLAY, () => updateCurrentTrack(widget));

      // Advance through playlist, loop at the end
      widget.bind(SC.Widget.Events.FINISH, () => {
        widget.getCurrentSoundIndex((index) => {
          widget.getSounds((sounds) => {
            const total = (sounds || []).length || 1;
            const next = (index + 1) % total;
            widget.skip(next);
            widget.play();
            setTimeout(() => updateCurrentTrack(widget), 600);
          });
        });
      });
    };
    init();
    return () => {
      cancelled = true;
      widgetRef.current = null;
    };
  }, [widgetSrc]);

  useEffect(() => {
    const startAfterGesture = () => {
      userGestureRef.current = true;
      const widget = widgetRef.current;
      if (!widget) return;
      widget.setVolume(0);
      widget.play();
    };
    window.addEventListener("luxsex:user-gesture", startAfterGesture);
    return () => window.removeEventListener("luxsex:user-gesture", startAfterGesture);
  }, []);

  const toggleMute = () => {
    const w = widgetRef.current;
    if (!w) return;
    if (muted) {
      setMuted(false);
      w.setVolume(80);
      // Force play on user gesture
      w.play();
      setTimeout(() => {
        w.isPaused((paused) => {
          if (paused) w.play();
        });
        updateCurrentTrack(w);
      }, 400);
    } else {
      setMuted(true);
      w.setVolume(0);
    }
  };

  if (loading) {
    return (
      <div
        className="h-9 w-9 border border-[#1f1a35] bg-[#0a0612]"
        data-testid="music-player-loading"
        role="status"
        aria-label="Carregando rádio"
      />
    );
  }

  if (!widgetSrc) {
    return (
      <button
        type="button"
        onClick={retry}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#4a2632] text-[#d4af37] transition-colors duration-150 hover:border-[#d4af37]"
        aria-label="Rádio indisponível. Tentar novamente"
        data-testid="music-player-unavailable-retry"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
      </button>
    );
  }

  return (
    <div
      className="relative flex items-center gap-3"
      data-testid="music-player"
      data-sanity-fallback={error ? "true" : "false"}
    >
      {/* Neon "now playing" — visible when unmuted */}
      {ready && trackInfo.artist && !muted && (
        <div
          className="hidden md:flex items-center gap-2 max-w-[180px] overflow-hidden"
          data-testid="now-playing-neon"
          aria-live="polite"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff2bd6] opacity-45" />
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
        className={`relative w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-300 ${
          muted
            ? "border-[#1f1a35] text-[#7c7893] hover:border-[#9b30ff] hover:text-[#9b30ff]"
            : "border-[#9b30ff]/50 text-[#9b30ff] bg-[#9b30ff]/10"
        }`}
        aria-label={muted ? "Tirar mudo" : "Mudo"}
        data-testid="music-mute-toggle"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {muted && ready && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#9b30ff] shadow-[0_0_6px_#9b30ff]" />
        )}
        {!muted && (
          <Music2
            className="absolute -bottom-1 -right-1 w-2.5 h-2.5 text-[#ff2bd6]"
            style={{ filter: "drop-shadow(0 0 4px #ff2bd6)" }}
          />
        )}
      </button>

      {/* Hidden iframe — off-screen, kept mounted so audio survives navigation */}
      <iframe
        key={widgetSrc}
        ref={iframeRef}
        title="Lux Radio"
        width="300"
        height="80"
        scrolling="no"
        frameBorder="no"
        allow="autoplay; encrypted-media"
        src={widgetSrc}
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
