// Lux Novo — Sanity Artist schema (Música & Artistas)
// Cole em: <studio>/schemaTypes/artist.js

export default {
  name: "artist",
  title: "Artista",
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
      name: "label",
      title: "Selo (label)",
      type: "string",
      description: "Ex: Zetta Records, Independente, Sony…",
      options: {
        list: [
          { title: "Zetta Records", value: "zetta-records" },
          { title: "Independente", value: "independente" },
        ],
      },
    },
    {
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "bio",
      title: "Biografia",
      type: "text",
      rows: 4,
    },
    {
      name: "genre",
      title: "Gênero musical",
      type: "string",
    },
    // ============== REDES SOCIAIS ==============
    {
      name: "instagram",
      title: "Instagram (URL)",
      type: "url",
      description: "Ex: https://www.instagram.com/seu_perfil",
    },
    {
      name: "spotify",
      title: "Spotify (URL)",
      type: "url",
    },
    {
      name: "soundcloud",
      title: "SoundCloud (URL)",
      type: "url",
    },
    {
      name: "youtube",
      title: "YouTube (URL)",
      type: "url",
    },
    {
      name: "tiktok",
      title: "TikTok (URL)",
      type: "url",
    },
    {
      name: "site",
      title: "Site oficial (URL)",
      type: "url",
    },
    // ===========================================
    {
      name: "featured",
      title: "Destacar",
      type: "boolean",
      initialValue: false,
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
    select: { title: "name", subtitle: "label", media: "photo" },
  },
  orderings: [
    {
      title: "Prioridade",
      name: "priorityDesc",
      by: [{ field: "priority", direction: "desc" }],
    },
  ],
};
