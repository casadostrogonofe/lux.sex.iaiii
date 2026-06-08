// Maps internal menu hrefs/paths to i18n keys so we can translate labels dynamically.
// The original menuConfig (in mockData.js) keeps Portuguese labels as the fallback.

export const MENU_I18N = {
  "/": "menu.home",
  "https://lux-novo.lux.sex/": "menu.home",
  "/turismo": "menu.tourism",
  "/turismo/moteis": "menu.motels",
  "/turismo/hoteis": "menu.hotels",
  "/turismo/pousadas": "menu.lodging",
  "/bem-estar": "menu.wellness",
  "/bem-estar/beleza": "menu.beauty",
  "/bem-estar/cultura": "menu.culture",
  "/bem-estar/saude": "menu.health",
  "/bem-estar/horoscopo": "menu.horoscope",
  "/bem-estar/sexualidade": "menu.sexuality",
  "/bem-estar/contos": "menu.erotic_tales",
  "/vida-noturna": "menu.nightlife",
  "/vida-noturna/locais": "menu.venues",
  "/vida-noturna/vinhos": "menu.wines",
  "/vida-noturna/charutos": "menu.cigars",
  "/vida-noturna/musica": "menu.music",
  "/vida-noturna/artistas": "menu.artists",
  "/vida-noturna/artistas/zetta-records": "menu.zetta_records",
  "/gastronomia": "menu.gastronomy",
  "/gastronomia/culinaria": "menu.cooking",
  "/gastronomia/arte": "menu.art",
  "/gastronomia/sabor": "menu.flavor",
  "/shop": "menu.shop",
  "/shop/sex-shop": "menu.sex_shop",
  "/shop/marketplace": "menu.marketplace",
  "/shop/apostas": "menu.bets",
};

export const menuLabel = (t, href, fallback) =>
  MENU_I18N[href] ? t(MENU_I18N[href]) : fallback;
