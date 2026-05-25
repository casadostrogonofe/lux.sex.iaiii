// Lux Novo — Sanity Ad/Banner schema
// Cole este arquivo em: <seu-projeto-sanity>/schemaTypes/ad.js

export default {
  name: "ad",
  title: "Publicidade (Banner)",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nome interno",
      description: "Para você identificar (ex: 'Make Life — Janeiro')",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "format",
      title: "Formato (tamanho IAB)",
      description:
        "Escolha o tamanho. Cada formato aparece em posições específicas do site.",
      type: "string",
      options: {
        list: [
          { title: "Arranha-céu · 120 × 600", value: "skyscraper" },
          { title: "Arranha-céu Largo · 160 × 600", value: "wide-skyscraper" },
          { title: "Banner · 468 × 60", value: "banner" },
          { title: "Banner Grande Mobile · 320 × 100", value: "large-mobile-banner" },
          { title: "Banner Vertical · 120 × 240", value: "vertical-banner" },
          { title: "Botão · 125 × 125", value: "button" },
          { title: "Cabeçalho · 728 × 90", value: "leaderboard" },
          { title: "Cabeçalho Grande · 970 × 90", value: "large-leaderboard" },
          { title: "Cabeçalho Mobile · 320 × 50", value: "mobile-leaderboard" },
          { title: "Meia-página · 300 × 600", value: "half-page" },
          { title: "Meio-banner · 234 × 60", value: "half-banner" },
          { title: "Outdoor · 970 × 250", value: "billboard" },
          { title: "Quadrado · 250 × 250", value: "square" },
          { title: "Quadrado Pequeno · 200 × 200", value: "small-square" },
          { title: "Retângulo Pequeno · 180 × 150", value: "small-rectangle" },
          { title: "Retângulo Médio · 300 × 250", value: "medium-rectangle" },
          { title: "Retângulo Grande · 336 × 280", value: "large-rectangle" },
          { title: "Retrato · 300 × 1050", value: "portrait" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "placement",
      title: "Onde aparece no site",
      description:
        "Posição na página. O sistema escolhe automaticamente, mas você pode forçar.",
      type: "string",
      options: {
        list: [
          { title: "Sidebar de Parceiros (direita)", value: "sidebar" },
          { title: "Entre matérias da Timeline (Home)", value: "timeline_inline" },
          { title: "Início da editoria (faixa horizontal)", value: "section_inline" },
          { title: "Fim da editoria (faixa antes do Newsletter)", value: "section_footer" },
          { title: "Topo do Shop", value: "shop_top" },
          { title: "Dentro da grade do Shop", value: "shop_grid" },
          { title: "Lifestyle · destaque grande", value: "lifestyle_premium" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Imagem do banner",
      description: "Faça upload da peça já no formato escolhido acima.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sponsor",
      title: "Anunciante",
      type: "string",
      description: "Nome do parceiro/empresa",
    },
    {
      name: "headline",
      title: "Título",
      type: "string",
    },
    {
      name: "description",
      title: "Descrição curta",
      type: "text",
      rows: 2,
    },
    {
      name: "cta",
      title: "Texto do botão (CTA)",
      type: "string",
      initialValue: "Saiba mais",
    },
    {
      name: "link",
      title: "Link de destino (URL completa)",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "active",
      title: "Ativo (mostrar no site)",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "priority",
      title: "Prioridade",
      description:
        "Quanto maior, mais cedo aparece (ex: 100 vem antes de 50). Empate é aleatório.",
      type: "number",
      initialValue: 50,
      validation: (Rule) => Rule.min(0).max(1000),
    },
    {
      name: "startsAt",
      title: "Começa em (opcional)",
      type: "datetime",
    },
    {
      name: "endsAt",
      title: "Termina em (opcional)",
      type: "datetime",
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "placement",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Banner sem nome",
        subtitle: subtitle ? `→ ${subtitle}` : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Prioridade (alta → baixa)",
      name: "priorityDesc",
      by: [{ field: "priority", direction: "desc" }],
    },
  ],
};
