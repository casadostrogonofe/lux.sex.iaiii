// Lux Novo — Sanity Partner schema (sidebar de parceiros nas matérias)
// Cole este arquivo em: <seu-projeto-sanity>/schemaTypes/partner.js

export default {
  name: "partner",
  title: "Parceiro (Sidebar)",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Link de destino",
      type: "url",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "backgroundColor",
      title: "Cor de fundo do logo (hex)",
      type: "string",
      description: "Ex: #ffffff (branco) ou #1c4eaa (azul)",
      initialValue: "#ffffff",
    },
    {
      name: "active",
      title: "Ativo",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "priority",
      title: "Ordem de exibição",
      type: "number",
      initialValue: 50,
    },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
  orderings: [
    {
      title: "Ordem",
      name: "priorityDesc",
      by: [{ field: "priority", direction: "desc" }],
    },
  ],
};
