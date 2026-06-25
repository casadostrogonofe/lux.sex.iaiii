// Lux Novo — Sanity Editor schema (v2: todas as editorias suportadas)
// Cole em: <studio>/schemaTypes/editor.js
// Substitui o anterior. Depois rode `npx sanity deploy`.

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
      description:
        "Foto principal — usada no card de Reels e no perfil do editor.",
      options: { hotspot: true },
    },
    {
      name: "banner",
      title: "Banner editorial",
      type: "image",
      description:
        "Imagem horizontal 2100×700 (proporção 3:1) — aparece no carrossel do topo da editoria escolhida abaixo.",
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
      description: "Ex: https://www.instagram.com/seu_perfil",
    },
    {
      name: "instagramReelUrl",
      title: "Link do Reels mais recente (opcional)",
      type: "url",
      description:
        "Se preencher, este reel específico é mostrado dentro do card. Se vazio, mostra a foto + link para o perfil.",
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
      name: "youtube",
      title: "YouTube (URL)",
      type: "url",
    },
    {
      name: "site",
      title: "Site/portfolio (URL)",
      type: "url",
    },
    // ============= SEÇÕES =============
    {
      name: "sections",
      title: "Editorias (onde o banner aparece)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Selecione todas as editorias em que este editor deve aparecer (banner + card de Reels).",
      options: {
        list: [
          { title: "Turismo (geral)", value: "turismo" },
          { title: "Turismo · Motéis", value: "turismo/moteis" },
          { title: "Turismo · Hotéis", value: "turismo/hoteis" },
          { title: "Turismo · Pousadas", value: "turismo/pousadas" },
          { title: "Bem Estar (geral)", value: "bem-estar" },
          { title: "Bem Estar · Beleza", value: "bem-estar/beleza" },
          { title: "Bem Estar · Cultura", value: "bem-estar/cultura" },
          { title: "Bem Estar · Saúde", value: "bem-estar/saude" },
          { title: "Bem Estar · Horóscopo", value: "bem-estar/horoscopo" },
          { title: "Bem Estar · Sexualidade", value: "bem-estar/sexualidade" },
          { title: "Bem Estar · Contos Eróticos", value: "bem-estar/contos" },
          { title: "Vida Noturna (geral)", value: "vida-noturna" },
          { title: "Vida Noturna · Locais", value: "vida-noturna/locais" },
          { title: "Vida Noturna · Vinhos", value: "vida-noturna/vinhos" },
          { title: "Vida Noturna · Charutos", value: "vida-noturna/charutos" },
          { title: "Vida Noturna · Música", value: "vida-noturna/musica" },
          { title: "Vida Noturna · Artistas", value: "vida-noturna/artistas" },
          { title: "Gastronomia (geral)", value: "gastronomia" },
          { title: "Gastronomia · Culinária", value: "gastronomia/culinaria" },
          { title: "Gastronomia · Arte", value: "gastronomia/arte" },
          { title: "Gastronomia · Sabor", value: "gastronomia/sabor" },
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
      title: "Ordem (maior = aparece primeiro)",
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
