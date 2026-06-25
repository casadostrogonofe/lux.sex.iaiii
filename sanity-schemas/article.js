// Lux Novo — Sanity Article schema (v3 com Vídeo + Referência ao Editor)
// Cole este arquivo em: <seu-projeto-sanity>/schemaTypes/article.js
// Substitui o anterior. Depois rode `npx sanity deploy` no Studio.

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
          { title: "Bem Estar · Sexualidade", value: "bem-estar/sexualidade" },
          { title: "Bem Estar · Contos Eróticos", value: "bem-estar/contos" },
          { title: "Vida Noturna · Locais", value: "vida-noturna/locais" },
          { title: "Vida Noturna · Vinhos", value: "vida-noturna/vinhos" },
          { title: "Vida Noturna · Charutos", value: "vida-noturna/charutos" },
          { title: "Vida Noturna · Música", value: "vida-noturna/musica" },
          { title: "Vida Noturna · Artistas", value: "vida-noturna/artistas" },
          { title: "Vida Noturna · Zetta Records", value: "vida-noturna/artistas/zetta-records" },
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
      description: "Cole a URL do YouTube, Vimeo ou um link direto .mp4."
    },
    {
      name: "videoFile",
      title: "Vídeo de capa (upload — alternativa ao link)",
      type: "file",
      description:
        "Faça upload de um arquivo .mp4 / .webm. Se preencher os dois, o upload tem prioridade.",
      options: { accept: "video/mp4,video/webm,video/quicktime" }
    },

    { name: "body", title: "Corpo", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] },

    // ============== AUTOR — escolhe do banco de Editores ==============
    {
      name: "editor",
      title: "Autor (escolha do banco de Editores)",
      type: "reference",
      to: [{ type: "editor" }],
      description:
        "Selecione um Editor já cadastrado. Para criar novo, vá em \"Editor / Colunista\" e crie. Esse autor passa a ser exibido na matéria."
    },
    {
      name: "authorName",
      title: "Autor (texto livre — fallback)",
      type: "string",
      description:
        "OPCIONAL. Use somente se quiser sobrescrever o autor sem cadastrar um Editor."
    },

    { name: "publishedAt", title: "Publicado em", type: "datetime", initialValue: () => new Date().toISOString() },
    { name: "readTime", title: "Tempo de leitura (min)", type: "number", initialValue: 6, validation: (Rule) => Rule.min(1).max(60) },
    { name: "featured", title: "Destacar em capa", type: "boolean", initialValue: false },
    { name: "sign", title: "Signo (Horóscopo)", type: "string" },
    { name: "adult", title: "Adulto 18+", type: "boolean", initialValue: false }
  ],
  preview: { select: { title: "title", subtitle: "path", media: "mainImage" } }
};
