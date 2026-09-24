const SECTION_OPTIONS = [
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
  {
    title: "Vida Noturna · Artistas · Zetta Records",
    value: "vida-noturna/artistas/zetta-records",
  },
  { title: "Gastronomia (geral)", value: "gastronomia" },
  { title: "Gastronomia · Culinária", value: "gastronomia/culinaria" },
  { title: "Gastronomia · Arte", value: "gastronomia/arte" },
  { title: "Gastronomia · Sabor", value: "gastronomia/sabor" },
];
export default {
  name: "editorialBanner",
  title: "Banner editorial",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nome interno",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Imagem 2100 × 350",
      type: "image",
      description: "Envie uma imagem horizontal 2100×350 (proporção 6:1).",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "headline",
      title: "Título sobre a imagem (opcional)",
      type: "string",
    },
    {
      name: "eyebrow",
      title: "Linha superior (opcional)",
      type: "string",
    },
    {
      name: "link",
      title: "Link de destino (opcional)",
      type: "url",
    },
    {
      name: "sections",
      title: "Editorias e submenus",
      type: "array",
      description: "Selecione todos os espaços onde este banner deve aparecer.",
      of: [{ type: "string" }],
      options: { list: SECTION_OPTIONS },
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "active",
      title: "Ativo",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "priority",
      title: "Ordem (maior aparece primeiro)",
      type: "number",
      initialValue: 50,
      validation: (Rule) => Rule.min(0).max(1000),
    },
  ],
  preview: {
    select: { title: "name", subtitle: "sections.0", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle || "Sem editoria", media };
    },
  },
  orderings: [
    {
      title: "Prioridade",
      name: "priorityDesc",
      by: [{ field: "priority", direction: "desc" }],
    },
  ],
};
