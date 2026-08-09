import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId =
  process.env.REACT_APP_SANITY_PROJECT_ID || "8um1375u";
const dataset = process.env.REACT_APP_SANITY_DATASET || "production";
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION || "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export const sanityEnabled = Boolean(projectId);

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);
