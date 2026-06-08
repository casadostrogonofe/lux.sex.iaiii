// Editors & Artists service — fetches from Sanity with safe fallbacks
import { sanityClient } from "./client";

const safe = async (promise, fallback) => {
  try {
    return await promise;
  } catch (err) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("[sanity-people]", err?.message || err);
    }
    return fallback;
  }
};

const EDITORS_BY_SECTION_QUERY = `
*[_type == "editor" && active == true && section == $section] | order(priority desc){
  _id,
  name,
  "slug": slug.current,
  role,
  bio,
  "photo": photo.asset->url,
  "banner": banner.asset->url,
  instagram,
  instagramReelUrl,
  twitter,
  tiktok,
  site,
  section,
  priority
}`;

const ARTISTS_BY_LABEL_QUERY = `
*[_type == "artist" && active == true && (!defined($label) || label == $label)] | order(priority desc){
  _id,
  name,
  "slug": slug.current,
  label,
  genre,
  bio,
  "photo": photo.asset->url,
  instagram,
  spotify,
  soundcloud,
  youtube,
  tiktok,
  site,
  priority
}`;

export const fetchEditorsBySection = async (section) => {
  const docs = await safe(
    sanityClient.fetch(EDITORS_BY_SECTION_QUERY, { section }),
    []
  );
  return (docs || []).map((d) => ({ ...d, id: d._id }));
};

export const fetchArtists = async (label = null) => {
  const docs = await safe(
    sanityClient.fetch(ARTISTS_BY_LABEL_QUERY, { label }),
    []
  );
  return (docs || []).map((d) => ({ ...d, id: d._id }));
};
