// GROQ queries for Lux Novo editorial content

export const SITE_SETTINGS_QUERY = `
*[_id == "siteSettings" && _type == "siteSettings"][0]{
  soundcloudUrl
}
`;

// All articles, ordered by date desc
export const ARTICLES_QUERY = `
*[_type == "article" && defined(publishedAt)] | order(publishedAt desc) [0...50]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "path": path,
  "author": coalesce(editor->name, authorName, "Lux Society"),
  "editorSlug": editor->slug.current,
  "editorPhoto": editor->photo.asset->url,
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
  "author": coalesce(editor->name, authorName, "Lux Society"),
  "editorSlug": editor->slug.current,
  "editorPhoto": editor->photo.asset->url,
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
  "author": coalesce(editor->name, authorName, "Lux Society"),
  "editorSlug": editor->slug.current,
  "editorPhoto": editor->photo.asset->url,
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
  "author": coalesce(editor->name, authorName, "Lux Society"),
  "editorSlug": editor->slug.current,
  "editorPhoto": editor->photo.asset->url,
  "editorInstagram": editor->instagram,
  "editorRole": editor->role,
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
