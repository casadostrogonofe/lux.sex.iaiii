import React from "react";

// Detect whether a URL is YouTube / Vimeo / direct MP4 / Sanity-hosted file
const ytId = (url) => {
  if (!url) return null;
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{6,})/
  );
  return m ? m[1] : null;
};
const vimeoId = (url) => {
  if (!url) return null;
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
};

const ArticleVideo = ({ url, file, title }) => {
  // Priority: uploaded file > external link
  const src = file || url;
  if (!src) return null;

  // Direct video file (MP4 / WebM / from Sanity CDN)
  const isFile = file || /\.(mp4|webm|mov|m4v)(\?|$)/i.test(src);

  if (isFile) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#1f1a35] mb-12 bg-black">
        <video
          src={src}
          controls
          playsInline
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="article-video-file"
        >
          {title}
        </video>
      </div>
    );
  }

  const yt = ytId(src);
  if (yt) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#1f1a35] mb-12 bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${yt}?rel=0&modestbranding=1`}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          data-testid="article-video-youtube"
        />
      </div>
    );
  }

  const vm = vimeoId(src);
  if (vm) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#1f1a35] mb-12 bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${vm}?title=0&byline=0&portrait=0`}
          title={title || "Video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          data-testid="article-video-vimeo"
        />
      </div>
    );
  }

  // Unknown provider → render as link
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mb-12 px-5 py-3 text-[#9b30ff] border border-[#9b30ff]/40 hover:bg-[#9b30ff]/10 rounded-xl text-sm tracking-wider"
      data-testid="article-video-link"
    >
      Assistir ao vídeo →
    </a>
  );
};

export default ArticleVideo;
