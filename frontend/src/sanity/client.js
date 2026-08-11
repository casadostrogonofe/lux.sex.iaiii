import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;
const dataset = process.env.REACT_APP_SANITY_DATASET;
const apiVersion = process.env.REACT_APP_SANITY_API_VERSION;

if (!projectId || !dataset || !apiVersion) {
  throw new Error("Configuração Sanity incompleta.");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);
