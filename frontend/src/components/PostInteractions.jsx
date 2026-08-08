import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Heart, MessageCircle, Share2, Send, Loader2, X, Link2, Check, MoreHorizontal } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaXTwitter, FaFacebookF, FaTelegram } from "react-icons/fa6";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LIKED_KEY = "luxsex_liked_posts";
const COMMENTER_KEY = "luxsex_commenter_name";

const getLikedSet = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(LIKED_KEY) || "[]"));
  } catch {
    return new Set();
  }
};
const saveLikedSet = (set) =>
  localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));

const shareTargets = (url, title) => ({
  whatsapp: `https://wa.me/?text=${encodeURIComponent(title + " — " + url)}`,
  x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
});

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  }
};

const PostInteractions = ({ postId, postTitle, postUrl, compact = false }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({ likes: 0, comments: 0 });
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [author, setAuthor] = useState(
    localStorage.getItem(COMMENTER_KEY) || ""
  );
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setLiked(getLikedSet().has(postId));
    (async () => {
      try {
        const { data } = await axios.get(`${API}/posts/${postId}/stats`);
        setStats(data);
      } catch (e) {
        // ignore
      }
    })();
  }, [postId]);

  const toggleLike = async () => {
    if (busy) return;
    setBusy(true);
    const nextLiked = !liked;
    setLiked(nextLiked);
    setStats((s) => ({ ...s, likes: s.likes + (nextLiked ? 1 : -1) }));
    const set = getLikedSet();
    if (nextLiked) set.add(postId);
    else set.delete(postId);
    saveLikedSet(set);
    try {
      await axios.post(`${API}/posts/${postId}/${nextLiked ? "like" : "unlike"}`);
    } catch (e) {
      // revert on error
      setLiked(!nextLiked);
      setStats((s) => ({ ...s, likes: s.likes + (nextLiked ? -1 : 1) }));
    } finally {
      setBusy(false);
    }
  };

  const openComments = async () => {
    setShowComments(true);
    if (comments.length > 0) return;
    setLoadingComments(true);
    try {
      const { data } = await axios.get(`${API}/posts/${postId}/comments`);
      setComments(Array.isArray(data) ? data : []);
    } catch (e) {
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const a = author.trim() || "Anônimo";
    const t = text.trim();
    if (!t) return;
    setSending(true);
    try {
      const { data } = await axios.post(`${API}/posts/${postId}/comments`, {
        author: a,
        text: t,
      });
      setComments((prev) => [data, ...prev]);
      setStats((s) => ({ ...s, comments: s.comments + 1 }));
      setText("");
      localStorage.setItem(COMMENTER_KEY, a);
    } catch (e) {
      // ignore
    } finally {
      setSending(false);
    }
  };

  const url =
    postUrl || (typeof window !== "undefined" ? window.location.href : "");
  const sharing = shareTargets(url, postTitle);

  const shareInstagram = async () => {
    await copyText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    window.open("https://www.instagram.com/", "_blank", "noopener");
    setShowShare(false);
  };

  const handleCopy = async () => {
    await copyText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShare(false);
    }, 1200);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: postTitle, url });
    } catch {
      // user cancelled
    }
    setShowShare(false);
  };

  const shareItemCls =
    "flex items-center gap-3 w-full text-left px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase text-[#f5f0ff] hover:text-[#9b30ff] hover:bg-[#110e1a] transition-colors";

  return (
    <div className={`flex items-center gap-1 ${compact ? "text-xs" : "text-sm"}`}>
      <button
        onClick={toggleLike}
        disabled={busy}
        aria-label="Curtir"
        className={`group flex items-center gap-1.5 px-3 py-2 transition-colors duration-300 ${
          liked
            ? "text-[#ff6568]"
            : "text-[#7c7893] hover:text-[#ff6568]"
        }`}
      >
        <Heart
          className={`w-4 h-4 ${liked ? "fill-current" : ""} transition-transform group-hover:scale-110`}
        />
        <span className="text-xs tabular-nums">{stats.likes}</span>
      </button>

      <button
        onClick={openComments}
        className="group flex items-center gap-1.5 px-3 py-2 text-[#7c7893] hover:text-[#9b30ff] transition-colors duration-300"
        aria-label="Comentar"
      >
        <MessageCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span className="text-xs tabular-nums">{stats.comments}</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowShare((v) => !v)}
          className="group flex items-center gap-1.5 px-3 py-2 text-[#7c7893] hover:text-[#9b30ff] transition-colors duration-300"
          aria-label="Compartilhar"
          data-testid="share-button"
        >
          <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
        </button>
        {showShare && (
          <div
            className="absolute right-0 top-full mt-2 bg-[#0b0812] border border-[#1a1526] shadow-2xl shadow-black/60 z-30 min-w-[190px] rounded-lg overflow-hidden"
            data-testid="share-menu"
          >
            <a
              href={sharing.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowShare(false)}
              className={shareItemCls}
              data-testid="share-whatsapp"
            >
              <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
              {t("share.whatsapp")}
            </a>
            <button onClick={shareInstagram} className={shareItemCls} data-testid="share-instagram">
              <FaInstagram className="w-4 h-4 text-[#E1306C]" />
              {t("share.instagram")}
            </button>
            <a
              href={sharing.x}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowShare(false)}
              className={shareItemCls}
            >
              <FaXTwitter className="w-4 h-4" />
              X
            </a>
            <a
              href={sharing.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowShare(false)}
              className={shareItemCls}
            >
              <FaFacebookF className="w-4 h-4 text-[#1877F2]" />
              Facebook
            </a>
            <a
              href={sharing.telegram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowShare(false)}
              className={shareItemCls}
            >
              <FaTelegram className="w-4 h-4 text-[#26A5E4]" />
              Telegram
            </a>
            <button onClick={handleCopy} className={shareItemCls} data-testid="share-copy-link">
              {copied ? (
                <Check className="w-4 h-4 text-[#4ade80]" />
              ) : (
                <Link2 className="w-4 h-4 text-[#d4af37]" />
              )}
              {copied ? t("share.copied") : t("share.copy")}
            </button>
            {typeof navigator !== "undefined" && !!navigator.share && (
              <button onClick={nativeShare} className={shareItemCls} data-testid="share-native">
                <MoreHorizontal className="w-4 h-4 text-[#9b30ff]" />
                {t("share.more")}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Comments modal */}
      {showComments && (
        <div
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowComments(false)}
        >
          <div
            className="w-full max-w-lg bg-[#0b0812] border border-[#1a1526] max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1526]">
              <span className="text-[11px] tracking-[0.3em] text-[#9b30ff] uppercase">
                {stats.comments} comentário{stats.comments !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setShowComments(false)}
                className="text-[#7c7893] hover:text-[#9b30ff] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {loadingComments ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 text-[#9b30ff] animate-spin" />
                </div>
              ) : comments.length === 0 ? (
                <p className="text-center text-[#7c7893] text-sm py-8">
                  Seja o primeiro a comentar.
                </p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="border-b border-[#1a1526] pb-4 last:border-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-serif text-base text-[#f5f0ff]">
                        {c.author}
                      </span>
                      <span className="text-[10px] tracking-widest text-[#5a5470] uppercase">
                        {new Date(c.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <p className="text-[#7c7893] text-sm leading-relaxed font-light whitespace-pre-wrap">
                      {c.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={submitComment} className="p-5 border-t border-[#1a1526] space-y-3">
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Seu nome (opcional)"
                className="w-full bg-[#0f0c18] border border-[#1a1526] focus:border-[#9b30ff] text-[#f5f0ff] placeholder:text-[#5a5470] px-4 py-2.5 text-sm outline-none transition-colors"
              />
              <div className="flex gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escreva seu comentário..."
                  required
                  className="flex-1 bg-[#0f0c18] border border-[#1a1526] focus:border-[#9b30ff] text-[#f5f0ff] placeholder:text-[#5a5470] px-4 py-2.5 text-sm outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={sending || !text.trim()}
                  className="px-4 py-2.5 bg-[#9b30ff] hover:bg-[#b15aff] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostInteractions;
