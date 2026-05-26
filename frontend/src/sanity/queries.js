// GROQ queries for Lux Novo editorial content

// All articles, ordered by date desc
export const ARTICLES_QUERY = `
*[_type == "article" && defined(publishedAt)] | order(publishedAt desc) [0...50]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "path": path,
  "author": coalesce(author->name, authorName, "Lux Society"),
  "date": publishedAt,
  "readTime": readTime,
  "image": mainImage.asset->url,
  body,
  featured,
  sign,
  adult
}
`;

// Articles filtered by full path (ex: "turismo/moteis")
export const ARTICLES_BY_PATH_QUERY = `
*[_type == "article" && path == $path] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "path": path,
  "author": coalesce(author->name, authorName, "Lux Society"),
  "date": publishedAt,
  "readTime": readTime,
  "image": mainImage.asset->url,
  body,
  featured,
  sign,
  adult
}
`;

// Articles whose path starts with a given section (ex: "turismo")
export const ARTICLES_BY_SECTION_QUERY = `
*[_type == "article" && path match $section + "/*"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "path": path,
  "author": coalesce(author->name, authorName, "Lux Society"),
  "date": publishedAt,
  "readTime": readTime,
  "image": mainImage.asset->url,
  body,
  featured,
  sign,
  adult
}
`;

// Single article by slug for the detail page
export const ARTICLE_BY_SLUG_QUERY = `
*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "path": path,
  "author": coalesce(author->name, authorName, "Lux Society"),
  "date": publishedAt,
  "readTime": readTime,
  "image": mainImage.asset->url,
  body,
  featured,
  sign,
  adult,
  videoUrl,
  "videoFile": videoFile.asset->url
}
`;
