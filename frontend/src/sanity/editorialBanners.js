import { sanityClient } from "./client";

const EDITORIAL_BANNERS_QUERY = `
*[_type == "editorialBanner"
  && active != false
  && ($section in sections || section == $section)
] | order(priority desc){
  _id,
  name,
  "image": image.asset->url,
  alt,
  headline,
  eyebrow,
  link,
  priority
}`;

export const fetchEditorialBanners = async (section) => {
  try {
    const docs = await sanityClient.fetch(EDITORIAL_BANNERS_QUERY, { section });
    return (docs || [])
      .filter((item) => item.image)
      .map((item) => ({
        id: item._id,
        image: item.image,
        alt: item.alt || item.name || "Banner editorial",
        title: item.headline || "",
        eyebrow: item.eyebrow || "",
        href: item.link || null,
        priority: item.priority || 0,
      }));
  } catch {
    return [];
  }
};