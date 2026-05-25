// Lux Novo — Sanity Article schema
// Cole este arquivo em: <seu-projeto-sanity>/schemaTypes/article.js

export default {
  name: "article",
  title: "Matéria",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().max(140),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "path",
      title: "Editoria (path)",
      description:
        'Use o formato "secao/subsecao" — ex: turismo/moteis · bem-estar/cultura · vida-noturna/vinhos · gastronomia/culinaria',
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
          { title: "Gastronomia · Sabor", value: "gastronomia/sabor" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Chamada / Resumo",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(280),
    },
    {
      name: "mainImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "body",
      title: "Corpo (texto rico)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    },
    {
      name: "authorName",
      title: "Autor (nome simples)",
      type: "string",
      description:
        "Atalho: digite o nome do autor sem criar um documento Author. Ex: Felipe Castel",
    },
    {
      name: "publishedAt",
      title: "Publicado em",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "readTime",
      title: "Tempo de leitura (min)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(60),
      initialValue: 6,
    },
    {
      name: "featured",
      title: "Destacar em capa",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "sign",
      title: "Signo (somente Horóscopo)",
      type: "string",
      description: "Ex: ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓",
    },
    {
      name: "adult",
      title: "Conteúdo adulto (18+)",
      type: "boolean",
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: "Mais recente",
      name: "publishDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "path", media: "mainImage" },
  },
};
