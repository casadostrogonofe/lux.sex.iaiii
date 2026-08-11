export default {
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  fields: [
    {
      name: "soundcloudUrl",
      title: "URL da rádio SoundCloud",
      type: "url",
      description: "Cole a URL HTTPS pública da faixa, playlist ou perfil usado na rádio.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["https"], allowRelative: false }).custom((value) => {
          if (!value) return true;
          try {
            const host = new URL(value).hostname.toLowerCase();
            return host === "soundcloud.com" ||
              host.endsWith(".soundcloud.com") ||
              host === "on.soundcloud.com"
              ? true
              : "Use uma URL oficial do SoundCloud.";
          } catch {
            return "URL inválida.";
          }
        }),
    },
  ],
  preview: {
    prepare() {
      return { title: "Configurações do site", subtitle: "Rádio SoundCloud" };
    },
  },
};