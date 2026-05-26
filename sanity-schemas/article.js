# Lux Novo — Sanity Article schema (versão 2 com Vídeo)
# Cole este arquivo em: <seu-projeto-sanity>/schemaTypes/article.js
# Substitui o anterior. Os novos campos `videoUrl` e `videoFile` aparecem
# como uma seção "VÍDEO" no editor.

export default {
  name: "article",
  title: "Matéria",
  type: "document",
  fields: [
    { name: "title", title: "Título", type: "string", validation: (Rule) => Rule.required().max(140) },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() },
    {
      name: "path",
      title: "Editoria",
      type: "string",
      options: {
        list: [
          { title: "Turismo · Motéis", value: "turismo/moteis" },
          { title: "Turismo · Hotéis", value: "turismo/hoteis" },
          { title: "Turismo · Pousadas", value: "turismo/pousadas" },
          { title: "Bem Estar · Beleza", value: "bem-estar/beleza" },
          { title: "Bem Estar · Cultura", value: "bem-estar/cultura" },
          { title: "Bem Estar · Saúde", value: "bem-estar/saude" },
          { title: "Bem Estar · Horóscopo", value: "bem-estar/horoscopo" },
          { title: "Bem Estar · Contos Eróticos", value: "bem-estar/contos" },
          { title: "Vida Noturna · Locais", value: "vida-noturna/locais" },
          { title: "Vida Noturna · Vinhos", value: "vida-noturna/vinhos" },
          { title: "Vida Noturna · Charutos", value: "vida-noturna/charutos" },
          { title: "Gastronomia · Culinária", value: "gastronomia/culinaria" },
          { title: "Gastronomia · Arte", value: "gastronomia/arte" },
          { title: "Gastronomia · Sabor", value: "gastronomia/sabor" }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    { name: "excerpt", title: "Chamada", type: "text", rows: 3, validation: (Rule) => Rule.max(280) },
    {
      name: "mainImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
      description: "Aparece como capa quando não houver vídeo."
    },

    // ============== VÍDEO ==============
    {
      name: "videoUrl",
      title: "Vídeo de capa (link YouTube / Vimeo / MP4)",
      type: "url",
      description: "Cole a URL do YouTube, Vimeo ou um link direto .mp4.",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["http", "https"] }).optional()
    },
    {
      name: "videoFile",
      title: "Vídeo de capa (upload — alternativa ao link)",
      type: "file",
      description:
        "Faça upload de um arquivo .mp4 / .webm (recomendado <100MB). Se preencher os dois, o upload tem prioridade.",
      options: { accept: "video/mp4,video/webm,video/quicktime" }
    },
    // ===================================

    { name: "body", title: "Corpo", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] },
    { name: "authorName", title: "Autor", type: "string" },
    { name: "publishedAt", title: "Publicado em", type: "datetime", initialValue: () => new Date().toISOString() },
    { name: "readTime", title: "Tempo de leitura (min)", type: "number", initialValue: 6, validation: (Rule) => Rule.min(1).max(60) },
    { name: "featured", title: "Destacar em capa", type: "boolean", initialValue: false },
    { name: "sign", title: "Signo (Horóscopo)", type: "string" },
    { name: "adult", title: "Adulto 18+", type: "boolean", initialValue: false }
  ],
  preview: { select: { title: "title", subtitle: "path", media: "mainImage" } }
};
