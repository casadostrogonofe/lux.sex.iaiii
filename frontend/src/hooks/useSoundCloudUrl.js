import { useCallback, useEffect, useState } from "react";
import { sanityClient } from "../sanity/client";
import { SITE_SETTINGS_QUERY } from "../sanity/queries";

const envFallback = process.env.REACT_APP_SOUNDCLOUD_URL?.trim() || null;

export const isAllowedSoundCloudUrl = (value) => {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();
    return (
      parsed.protocol === "https:" &&
      (host === "soundcloud.com" ||
        host.endsWith(".soundcloud.com") ||
        host === "on.soundcloud.com")
    );
  } catch {
    return false;
  }
};

export const useSoundCloudUrl = () => {
  const [reloadKey, setReloadKey] = useState(0);
  const [state, setState] = useState({ url: null, loading: true, error: false });
  const retry = useCallback(() => setReloadKey((value) => value + 1), []);

  useEffect(() => {
    let active = true;
    setState((current) => ({ ...current, loading: true, error: false }));

    sanityClient
      .withConfig({ useCdn: false })
      .fetch(SITE_SETTINGS_QUERY)
      .then((settings) => {
        if (!active) return;
        const cmsUrl = settings?.soundcloudUrl;
        const url = isAllowedSoundCloudUrl(cmsUrl)
          ? cmsUrl.trim()
          : isAllowedSoundCloudUrl(envFallback)
            ? envFallback
            : null;
        setState({ url, loading: false, error: false });
      })
      .catch(() => {
        if (!active) return;
        setState({
          url: isAllowedSoundCloudUrl(envFallback) ? envFallback : null,
          loading: false,
          error: true,
        });
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  return { ...state, retry };
};