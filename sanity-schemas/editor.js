// Lux Novo — Sanity Editor schema (Editoras/jornalistas/colunistas)
// Cole em: <studio>/schemaTypes/editor.js

export default {
  name: "editor",
  title: "Editor / Colunista",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Editoria/Cargo",
      type: "string",
      description: "Ex: Editora de Sexualidade, Colunista de Vinhos…",
    },
    {
      name: "photo",
      title: "Foto/avatar",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "banner",
      title: "Banner editorial",
      type: "image",
      description:
        "Imagem horizontal (ex: 1600×500) usada no carrossel da editoria.",
      options: { hotspot: true },
    },
    {
      name: "bio",
      title: "Bio curta",
      type: "text",
      rows: 3,
    },
    {
      name: "instagram",
      title: "Instagram (URL)",
      type: "url",
      description: "Aparece como link nos reels.",
    },
    {
      name: "instagramReelUrl",
      title: "Link do Reels mais recente (opcional)",
      type: "url",
      description:
        "Se preencher, este reel específico é mostrado. Se vazio, mostra a foto + link para o perfil.",
    },
    {
      name: "twitter",
      title: "Twitter/X (URL)",
      type: "url",
    },
    {
      name: "tiktok",
      title: "TikTok (URL)",
      type: "url",
    },
    {
      name: "site",
      title: "Site/portfolio (URL)",
      type: "url",
    },
    {
      name: "section",
      title: "Editoria principal",
      type: "string",
      description: "A editoria onde este editor aparece com destaque.",
      options: {
        list: [
          { title: "Bem Estar · Sexualidade", value: "bem-estar/sexualidade" },
          { title: "Bem Estar · Beleza", value: "bem-estar/beleza" },
          { title: "Bem Estar · Cultura", value: "bem-estar/cultura" },
          { title: "Bem Estar · Saúde", value: "bem-estar/saude" },
          { title: "Vida Noturna", value: "vida-noturna" },
          { title: "Turismo", value: "turismo" },
          { title: "Gastronomia", value: "gastronomia" },
        ],
      },
    },
    {
      name: "active",
      title: "Ativo",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "priority",
      title: "Ordem",
      type: "number",
      initialValue: 50,
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
  orderings: [
    {
      title: "Prioridade",
      name: "priorityDesc",
      by: [{ field: "priority", direction: "desc" }],
    },
  ],
};
