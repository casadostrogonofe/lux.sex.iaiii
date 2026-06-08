// Mock data for LUX.SEX — Dynamic menu, blog posts and partner stores

export const LOGO_IAIII = "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/ldcghd33_luxsex.png";

export const SOUNDCLOUD_URL = "https://soundcloud.com/massivejackmusic/sets/unreleased?secret_token=s-xH8mqZ5tU1d";

// =============================================================
// DYNAMIC MENU CONFIG
// =============================================================
export const menuConfig = [
  { label: "Início", href: "https://lux-novo.lux.sex/", external: true },
  {
    label: "Turismo",
    href: "/turismo",
    children: [
      { label: "Motéis", href: "/turismo/moteis" },
      { label: "Hotéis", href: "/turismo/hoteis" },
      { label: "Pousadas", href: "/turismo/pousadas" },
    ],
  },
  {
    label: "Bem Estar",
    href: "/bem-estar",
    children: [
      { label: "Beleza", href: "/bem-estar/beleza" },
      { label: "Cultura", href: "/bem-estar/cultura" },
      { label: "Saúde", href: "/bem-estar/saude" },
      { label: "Horóscopo", href: "/bem-estar/horoscopo" },
      { label: "Sexualidade", href: "/bem-estar/sexualidade" },
      { label: "Contos Eróticos", href: "/bem-estar/contos" },
    ],
  },
  {
    label: "Vida Noturna",
    href: "/vida-noturna",
    children: [
      { label: "Locais", href: "/vida-noturna/locais" },
      { label: "Vinhos", href: "/vida-noturna/vinhos" },
      { label: "Charutos", href: "/vida-noturna/charutos" },
      { label: "Música", href: "/vida-noturna/musica" },
      {
        label: "Artistas",
        href: "/vida-noturna/artistas",
        children: [
          { label: "Zetta Records", href: "/vida-noturna/artistas/zetta-records" },
        ],
      },
    ],
  },
  {
    label: "Gastronomia",
    href: "/gastronomia",
    children: [
      { label: "Culinária", href: "/gastronomia/culinaria" },
      { label: "Arte", href: "/gastronomia/arte" },
      { label: "Sabor", href: "/gastronomia/sabor" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "Sex Shop", href: "/shop/sex-shop" },
      { label: "Marketplace", href: "/shop/marketplace" },
      { label: "Apostas & Bets", href: "/shop/apostas" },
    ],
  },
];

// =============================================================
// PARTNERS (right sidebar on article pages)
// =============================================================
export const articleSidebarPartners = [
  {
    id: "make-life",
    name: "Make Life",
    logo: "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/dzixwjjq_Captura%20de%20Tela%202026-05-23%20a%CC%80s%2018.25.28.png",
    link: "https://loja.makelife.com.br/",
    bg: "#ffffff",
  },
  {
    id: "farma-ponte",
    name: "Farma Ponte",
    logo: "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/h76q9da4_FARMA%20PONTE.jpg",
    link: "https://www.farmaponte.com.br/",
    bg: "#004b96",
  },
  {
    id: "spicy-club",
    name: "Spicy Club",
    logo: "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/c1t5dads_SPICY.jpg",
    link: "https://www.spicyclub.com.br/",
    bg: "#000000",
  },
  {
    id: "strogos-house",
    name: "Strogo's House",
    logo: "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/otdgkkpa_strogos.jpg",
    link: "https://www.instagram.com/strogos_house",
    bg: "#000000",
  },
  {
    id: "vivence-odontologia",
    name: "Vivence Odontologia",
    logo: "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/nghc5pzj_WhatsApp%20Image%202026-06-02%20at%2010.36.21.jpeg",
    link: "https://www.vivenceodontologia.com.br/",
    bg: "#ffffff",
  },
];

// =============================================================
// FALLBACK EDITORS (shown until Sanity has data)
// =============================================================
export const fallbackEditors = {
  "bem-estar/sexualidade": [
    {
      id: "darlene-zeferina",
      name: "Darlene Barbosa | Dra. Zeferina",
      role: "Especialista em sexualidade e comportamento humano",
      photo:
        "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/mxnnm2nx_banner%20editorial%201%20-%20darlene.jpg",
      banner:
        "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/mxnnm2nx_banner%20editorial%201%20-%20darlene.jpg",
      instagram: "https://www.instagram.com/darlenebarbosa",
      section: "bem-estar/sexualidade",
    },
  ],
};

// =============================================================
// SECTION METADATA (for hero of each category/subcategory page)
// =============================================================
export const sectionMeta = {
  turismo: {
    title: "Turismo",
    tagline: "Refúgios para quem sabe viajar",
    description: "Endereços discretos, suítes editoriais e mapas que nenhum guia revela.",
  },
  "turismo/moteis": {
    title: "Motéis",
    tagline: "A arquitetura do encontro",
    description: "Suítes temáticas, hidromassagens privativas e o renascimento do motel-conceito.",
  },
  "turismo/hoteis": {
    title: "Hotéis",
    tagline: "Hospedagem com assinatura",
    description: "Boutique hotels, retiros urbanos e endereços que sabem o significado de privacidade.",
  },
  "turismo/pousadas": {
    title: "Pousadas",
    tagline: "O charme do interior",
    description: "Refúgios em Trancoso, Búzios, Petrópolis — onde a paisagem ainda é programa.",
  },
  "bem-estar": {
    title: "Bem Estar",
    tagline: "O corpo como templo",
    description: "Beleza, cultura e saúde — três pilares do estilo de vida contemporâneo.",
  },
  "bem-estar/beleza": {
    title: "Beleza",
    tagline: "A estética do cuidado",
    description: "Skincare de autor, rituais de beleza e o renascimento da cosmética artesanal.",
  },
  "bem-estar/cultura": {
    title: "Cultura",
    tagline: "Arte, literatura e desejo",
    description: "Cinema, livros, exposições e curadorias que tratam o erotismo como linguagem.",
  },
  "bem-estar/saude": {
    title: "Saúde",
    tagline: "Longevidade sexual e vitalidade",
    description: "Hormônios, suplementação e os protocolos da nova ciência do prazer sustentável.",
  },
  "vida-noturna": {
    title: "Vida Noturna",
    tagline: "A geometria da madrugada",
    description: "Locais, vinhos e charutos — o tripé da noite contemporânea brasileira.",
  },
  "vida-noturna/locais": {
    title: "Locais",
    tagline: "Bares, clubes e endereços de fim de noite",
    description: "Speakeasies, jazz clubs e os bastidores da noite paulistana e carioca.",
  },
  "vida-noturna/vinhos": {
    title: "Vinhos",
    tagline: "Adegas privadas e safras raras",
    description: "Brancos naturais, Bordeaux históricos e os novos rótulos brasileiros premiados.",
  },
  "vida-noturna/charutos": {
    title: "Charutos",
    tagline: "O ritual lento",
    description: "Cohibas, dominicanos e o renascimento da charutaria de autor em São Paulo.",
  },
  gastronomia: {
    title: "Gastronomia",
    tagline: "Da cozinha ao desejo",
    description: "Culinária autoral, performance artística e o sabor como linguagem sensorial.",
  },
  "gastronomia/culinaria": {
    title: "Culinária",
    tagline: "Cozinhar é seduzir",
    description: "Chefs, receitas e a nova cozinha brasileira contemporânea.",
  },
  "gastronomia/arte": {
    title: "Arte",
    tagline: "Quando a mesa vira palco",
    description: "Dining experiences, performances gastronômicas e jantares-instalação.",
  },
  "gastronomia/sabor": {
    title: "Sabor",
    tagline: "A inteligência do paladar",
    description: "Degustações às cegas, harmonizações ousadas e o mapa dos novos ingredientes.",
  },
  "bem-estar/horoscopo": {
    title: "Horóscopo",
    tagline: "Os astros e o desejo",
    description: "Previsões diárias com curadoria astrológica — afetiva, sensual, sem filtros.",
  },
  "bem-estar/contos": {
    title: "Contos Eróticos",
    tagline: "Literatura para a madrugada",
    description: "Ficções breves de autores convidados. Leitura adulta, sem pressa.",
    adult: true,
  },
};

// =============================================================
// BLOG POSTS (lean mock — 2-3 per subcategory)
// =============================================================
const IMG = {
  motel: "https://images.pexels.com/photos/7567725/pexels-photo-7567725.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  hotel: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwwfHx8fDE3NzkyOTI1MDJ8MA&ixlib=rb-4.1.0&q=85",
  pousada: "https://images.pexels.com/photos/25189157/pexels-photo-25189157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  beleza: "https://images.pexels.com/photos/3818315/pexels-photo-3818315.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  cultura: "https://images.pexels.com/photos/1066171/pexels-photo-1066171.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  saude: "https://images.pexels.com/photos/3868895/pexels-photo-3868895.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  noite: "https://images.pexels.com/photos/32628115/pexels-photo-32628115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  vinho: "https://images.unsplash.com/photo-1778548646491-8afb9849e1df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHw0fHx3aW5lJTIwY2lnYXJ8ZW58MHx8fHwxNzc5MzEzMzEyfDA&ixlib=rb-4.1.0&q=85",
  charuto: "https://images.pexels.com/photos/7403/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  gastro: "https://images.pexels.com/photos/34769660/pexels-photo-34769660.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  fashion: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHw0fHxmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDB8fHx8MTc3OTMxMzMyMHww&ixlib=rb-4.1.0&q=85",
  editorial: "https://images.unsplash.com/photo-1645996830739-8fe3df27c33f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwzfHxmYXNoaW9uJTIwZWRpdG9yaWFsfGVufDB8fHx8MTc3OTMxMzMyMHww&ixlib=rb-4.1.0&q=85",
};

export const blogPosts = [
  // TURISMO / MOTÉIS
  { id: "m-1", path: "turismo/moteis", title: "O Renascimento do Motel-Conceito", excerpt: "Como os novos motéis paulistanos abandonaram o kitsch e abraçaram o design autoral.", author: "Felipe Castel", date: "18 Maio, MMXXVI", readTime: "9 min", image: IMG.motel, featured: true },
  { id: "m-2", path: "turismo/moteis", title: "Suítes Temáticas: Da Provocação ao Sofisticado", excerpt: "Hidromassagem, fogo de chão e arquitetura cinematográfica — o motel virou destino editorial.", author: "Marina Rezende", date: "12 Maio, MMXXVI", readTime: "7 min", image: IMG.noite },
  { id: "m-3", path: "turismo/moteis", title: "Mapa dos Motéis Premium do Brasil", excerpt: "De São Paulo a Brasília — onze endereços que entendem o luxo da intimidade.", author: "Camila Vasconcelos", date: "06 Maio, MMXXVI", readTime: "11 min", image: IMG.motel },

  // TURISMO / HOTÉIS
  { id: "h-1", path: "turismo/hoteis", title: "Boutique Hotels: A Nova Geração Brasileira", excerpt: "Pequenos hotéis-galeria estão reescrevendo o conceito de hospitalidade no país.", author: "Felipe Castel", date: "15 Maio, MMXXVI", readTime: "10 min", image: IMG.hotel, featured: true },
  { id: "h-2", path: "turismo/hoteis", title: "Retiros Urbanos: Hospedagem com NDA", excerpt: "Por que executivos preferem hotéis com check-in discreto e sem registro público de hóspedes.", author: "Eduardo Setúbal", date: "09 Maio, MMXXVI", readTime: "8 min", image: IMG.pousada },
  { id: "h-3", path: "turismo/hoteis", title: "Lisboa, Tóquio, Trancoso: 9 Endereços", excerpt: "Os hotéis preferidos da curadoria Lux Society — e por que cada um deles importa.", author: "Camila Vasconcelos", date: "03 Maio, MMXXVI", readTime: "13 min", image: IMG.hotel },

  // TURISMO / POUSADAS
  { id: "p-1", path: "turismo/pousadas", title: "Trancoso Depois da Lua Nova", excerpt: "A vila baiana segue ditando o tom — e suas pousadas seguem sendo as mais cobiçadas.", author: "Marina Rezende", date: "14 Maio, MMXXVI", readTime: "11 min", image: IMG.pousada, featured: true },
  { id: "p-2", path: "turismo/pousadas", title: "Petrópolis: O Interior do Desejo", excerpt: "Quatro pousadas serra-acima onde o tempo passa em outra cadência.", author: "Felipe Castel", date: "08 Maio, MMXXVI", readTime: "9 min", image: IMG.pousada },
  { id: "p-3", path: "turismo/pousadas", title: "Búzios: As Casas Privadas de Fim de Tarde", excerpt: "Refúgios discretos em ruelas que poucos turistas conhecem.", author: "Camila Vasconcelos", date: "02 Maio, MMXXVI", readTime: "8 min", image: IMG.hotel },

  // BEM ESTAR / BELEZA
  { id: "b-1", path: "bem-estar/beleza", title: "Skincare de Autor: O Novo Luxo Brasileiro", excerpt: "Pequenos laboratórios resgatam fórmulas centenárias e elevam a cosmética ao status de joalheria.", author: "Rafaela Mont'Serrat", date: "16 Maio, MMXXVI", readTime: "8 min", image: IMG.beleza, featured: true },
  { id: "b-2", path: "bem-estar/beleza", title: "Cabelo, Pele, Aroma: A Trindade Sensorial", excerpt: "Como os três cuidados básicos podem virar ritual erótico individual.", author: "Beatriz Aboumrad", date: "10 Maio, MMXXVI", readTime: "7 min", image: IMG.fashion },
  { id: "b-3", path: "bem-estar/beleza", title: "O Renascimento da Manicure Discreta", excerpt: "Tons nude profundos, formato amêndoa e o adeus às extensões agressivas.", author: "Rafaela Mont'Serrat", date: "04 Maio, MMXXVI", readTime: "5 min", image: IMG.editorial },

  // BEM ESTAR / CULTURA
  { id: "c-1", path: "bem-estar/cultura", title: "Erotismo na Literatura Brasileira Contemporânea", excerpt: "Cinco autores que devolvem ao desejo seu lugar legítimo na narrativa nacional.", author: "Pedro Antunes", date: "13 Maio, MMXXVI", readTime: "9 min", image: IMG.cultura, featured: true },
  { id: "c-2", path: "bem-estar/cultura", title: "Cinema do Desejo: A Nova Onda", excerpt: "Quatro diretores brasileiros filmando o sexo como linguagem, não como tabu.", author: "Pedro Antunes", date: "07 Maio, MMXXVI", readTime: "12 min", image: IMG.editorial },
  { id: "c-3", path: "bem-estar/cultura", title: "Arte Privada: Obras que Vivem em Quartos", excerpt: "Colecionadores escolhem peças pelo poder evocativo, não pelo valor de leilão.", author: "Camila Vasconcelos", date: "01 Maio, MMXXVI", readTime: "10 min", image: IMG.cultura },

  // BEM ESTAR / SAÚDE
  { id: "s-1", path: "bem-estar/saude", title: "Longevidade Sexual: A Nova Fronteira", excerpt: "Hormônios bioidênticos, suplementação personalizada e o protocolo dos 40+.", author: "Dra. Helena Brizola", date: "17 Maio, MMXXVI", readTime: "11 min", image: IMG.saude, featured: true },
  { id: "s-2", path: "bem-estar/saude", title: "Sono, Sexo e Performance", excerpt: "Por que dormir 8 horas é o afrodisíaco mais subestimado do século XXI.", author: "Dra. Helena Brizola", date: "11 Maio, MMXXVI", readTime: "10 min", image: IMG.saude },
  { id: "s-3", path: "bem-estar/saude", title: "Imersão Gélida & Sauna Finlandesa", excerpt: "O novo ritual matinal dos executivos que entendem o corpo como ativo de longo prazo.", author: "Felipe Castel", date: "05 Maio, MMXXVI", readTime: "7 min", image: IMG.beleza },

  // VIDA NOTURNA / LOCAIS
  { id: "vn-1", path: "vida-noturna/locais", title: "Speakeasies de São Paulo: Mapa Atualizado", excerpt: "Onze bares clandestinos onde a senha ainda importa e a coquetelaria é arte.", author: "Eduardo Setúbal", date: "16 Maio, MMXXVI", readTime: "9 min", image: IMG.noite, featured: true },
  { id: "vn-2", path: "vida-noturna/locais", title: "Rio: Os Clubes Após as 2h", excerpt: "Lapa, Botafogo e os endereços que só ganham vida quando os outros fecham.", author: "Pedro Antunes", date: "09 Maio, MMXXVI", readTime: "8 min", image: IMG.noite },
  { id: "vn-3", path: "vida-noturna/locais", title: "Jazz Clubs: O Retorno do Charme Discreto", excerpt: "Casas com 30 lugares e couvert artístico voltam ao centro da cena noturna.", author: "Marina Rezende", date: "02 Maio, MMXXVI", readTime: "7 min", image: IMG.editorial },

  // VIDA NOTURNA / VINHOS
  { id: "vw-1", path: "vida-noturna/vinhos", title: "Brancos Naturais: A Revolução Silenciosa", excerpt: "Vinhos de baixa intervenção conquistam adegas privadas e cartas de autor.", author: "Eduardo Setúbal", date: "15 Maio, MMXXVI", readTime: "8 min", image: IMG.vinho, featured: true },
  { id: "vw-2", path: "vida-noturna/vinhos", title: "Bordeaux 2015: A Safra para Esperar", excerpt: "Por que esta colheita pode ser a mais elegante da década.", author: "Eduardo Setúbal", date: "08 Maio, MMXXVI", readTime: "10 min", image: IMG.vinho },
  { id: "vw-3", path: "vida-noturna/vinhos", title: "Rótulos Brasileiros que Surpreendem", excerpt: "Da Serra Gaúcha ao Vale do São Francisco — sete vinhos para colocar na cabeceira.", author: "Pedro Antunes", date: "01 Maio, MMXXVI", readTime: "9 min", image: IMG.charuto },

  // VIDA NOTURNA / CHARUTOS
  { id: "ch-1", path: "vida-noturna/charutos", title: "Cohiba e Bordeaux: Geometria do Prazer Lento", excerpt: "O ritual masculino que atravessa séculos — e segue intacto em MMXXVI.", author: "Eduardo Setúbal", date: "14 Maio, MMXXVI", readTime: "10 min", image: IMG.charuto, featured: true },
  { id: "ch-2", path: "vida-noturna/charutos", title: "Dominicanos vs. Cubanos: O Debate Eterno", excerpt: "Características, terroir e por que a resposta nunca é definitiva.", author: "Eduardo Setúbal", date: "07 Maio, MMXXVI", readTime: "11 min", image: IMG.charuto },
  { id: "ch-3", path: "vida-noturna/charutos", title: "Charutarias de Autor em São Paulo", excerpt: "Três endereços com humidor próprio, lounge e curadoria de whisky japonês.", author: "Pedro Antunes", date: "30 Abril, MMXXVI", readTime: "8 min", image: IMG.vinho },

  // GASTRONOMIA / CULINÁRIA
  { id: "g-1", path: "gastronomia/culinaria", title: "A Nova Cozinha Brasileira Contemporânea", excerpt: "Quatro chefs reinventando o que significa cozinhar com identidade nacional.", author: "Marina Rezende", date: "16 Maio, MMXXVI", readTime: "12 min", image: IMG.gastro, featured: true },
  { id: "g-2", path: "gastronomia/culinaria", title: "Receitas Que Seduzem", excerpt: "Três pratos curtos pensados para a madrugada — preparo de até 30 minutos.", author: "Beatriz Aboumrad", date: "10 Maio, MMXXVI", readTime: "8 min", image: IMG.beleza },
  { id: "g-3", path: "gastronomia/culinaria", title: "Cozinhar a Dois: O Ritual Esquecido", excerpt: "Por que a cozinha voltou a ser o lugar mais sensual da casa.", author: "Camila Vasconcelos", date: "04 Maio, MMXXVI", readTime: "7 min", image: IMG.gastro },

  // GASTRONOMIA / ARTE
  { id: "ga-1", path: "gastronomia/arte", title: "Dining Experiences: Quando a Mesa Vira Palco", excerpt: "Jantares-instalação que cruzam performance, gastronomia e provocação.", author: "Pedro Antunes", date: "15 Maio, MMXXVI", readTime: "10 min", image: IMG.editorial, featured: true },
  { id: "ga-2", path: "gastronomia/arte", title: "A Arte do Empratamento Sensorial", excerpt: "Pratos que invocam memórias afetivas — e por que isso virou tendência.", author: "Marina Rezende", date: "09 Maio, MMXXVI", readTime: "8 min", image: IMG.gastro },
  { id: "ga-3", path: "gastronomia/arte", title: "Jantares Secretos em Apartamentos Privados", excerpt: "O novo formato dos chefs que recusam restaurante e cozinham para 12.", author: "Eduardo Setúbal", date: "03 Maio, MMXXVI", readTime: "9 min", image: IMG.noite },

  // GASTRONOMIA / SABOR
  { id: "sa-1", path: "gastronomia/sabor", title: "Degustações às Cegas: O Treino do Paladar", excerpt: "Por que tirar a visão é o atalho para reaprender a sentir.", author: "Eduardo Setúbal", date: "14 Maio, MMXXVI", readTime: "9 min", image: IMG.vinho, featured: true },
  { id: "sa-2", path: "gastronomia/sabor", title: "Harmonizações Ousadas Que Funcionam", excerpt: "Chocolate amargo com mezcal, ostra com sake — combinações para mesa íntima.", author: "Marina Rezende", date: "08 Maio, MMXXVI", readTime: "7 min", image: IMG.gastro },
  { id: "sa-3", path: "gastronomia/sabor", title: "O Mapa dos Novos Ingredientes Brasileiros", excerpt: "Frutos amazônicos, ervas do cerrado e por que eles estão no centro da alta gastronomia.", author: "Camila Vasconcelos", date: "01 Maio, MMXXVI", readTime: "11 min", image: IMG.beleza },

  // MAIS / HORÓSCOPO (12 signs as posts)
  { id: "ho-aries", path: "bem-estar/horoscopo", title: "Áries — A Semana do Impulso", excerpt: "Marte favorece encontros breves e decisões instintivas. Cuidado com promessas feitas na madrugada.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.editorial, featured: true, sign: "♈" },
  { id: "ho-touro", path: "bem-estar/horoscopo", title: "Touro — Sensorial e Estratégico", excerpt: "Vênus em casa: aproveite para investir no boudoir, na adega e no descanso.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.beleza, sign: "♉" },
  { id: "ho-gemeos", path: "bem-estar/horoscopo", title: "Gêmeos — Conversas Longas", excerpt: "Mercúrio direto traz clareza. Diálogos íntimos rendem mais que encontros físicos esta semana.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.cultura, sign: "♊" },
  { id: "ho-cancer", path: "bem-estar/horoscopo", title: "Câncer — A Lua e o Lar", excerpt: "Convide para casa. A intimidade neste ciclo se constrói no doméstico, não no público.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.pousada, sign: "♋" },
  { id: "ho-leao", path: "bem-estar/horoscopo", title: "Leão — A Atenção do Mundo", excerpt: "Sol em casa 5: visibilidade total. Use a luz com elegância — não com excesso.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.fashion, sign: "♌" },
  { id: "ho-virgem", path: "bem-estar/horoscopo", title: "Virgem — Detalhes que Importam", excerpt: "Refinamento estético em alta. É o momento de redecorar o quarto e refinar o guarda-roupa.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.editorial, sign: "♍" },
  { id: "ho-libra", path: "bem-estar/horoscopo", title: "Libra — Equilíbrio Voluptuoso", excerpt: "Vênus rege: jantares a dois, perfumes e roupa íntima de seda. Sem moderação.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.gastro, sign: "♎" },
  { id: "ho-escorpiao", path: "bem-estar/horoscopo", title: "Escorpião — Intensidade Sem Pedir Licença", excerpt: "Plutão favorece ligações profundas. Evite o flerte superficial — não é seu jogo agora.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.noite, sign: "♏" },
  { id: "ho-sagitario", path: "bem-estar/horoscopo", title: "Sagitário — A Aventura Necessária", excerpt: "Júpiter pede viagem. Reserve um motel-conceito, um hotel discreto ou um voo curto.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.hotel, sign: "♐" },
  { id: "ho-capricornio", path: "bem-estar/horoscopo", title: "Capricórnio — Disciplina Sensual", excerpt: "Saturno cobra rotina, inclusive a íntima. Marque o encontro no calendário.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.charuto, sign: "♑" },
  { id: "ho-aquario", path: "bem-estar/horoscopo", title: "Aquário — O Imprevisto Provocador", excerpt: "Urano traz alguém inesperado. Diga sim ao convite estranho — com discernimento.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.vinho, sign: "♒" },
  { id: "ho-peixes", path: "bem-estar/horoscopo", title: "Peixes — A Magia do Difuso", excerpt: "Netuno em fase poética. Música, banho longo e uma carta escrita à mão são afrodisíacos.", author: "Maga de Vênus", date: "Semana 21", readTime: "3 min", image: IMG.saude, sign: "♓" },

  // MAIS / CONTOS ERÓTICOS
  { id: "co-1", path: "bem-estar/contos", title: "A Carta que Nunca Foi Enviada", excerpt: "Ela escrevia toda quinta-feira. Nunca colocava no correio. Até a quinta em que ele apareceu na porta.", author: "Helena V.", date: "Maio MMXXVI", readTime: "9 min", image: IMG.editorial, featured: true, adult: true },
  { id: "co-2", path: "bem-estar/contos", title: "Três Notas no Atelier", excerpt: "Bergamota, fumo e algo de almíscar — assim ela definia o cheiro dele. Mas faltava uma quarta nota.", author: "Bruno Tellini", date: "Maio MMXXVI", readTime: "11 min", image: IMG.fashion, adult: true },
  { id: "co-3", path: "bem-estar/contos", title: "Quinta-feira Depois das 23h", excerpt: "Era o único horário que combinavam. Não por necessidade, mas por estética. Tudo neles era cuidado.", author: "Helena V.", date: "Abril MMXXVI", readTime: "8 min", image: IMG.noite, adult: true },
  { id: "co-4", path: "bem-estar/contos", title: "O Vinho que Eles Não Beberam", excerpt: "A garrafa ficou na mesa. Eles disseram que abririam depois. Nenhum dos dois pensava em vinho.", author: "Bruno Tellini", date: "Abril MMXXVI", readTime: "10 min", image: IMG.vinho, adult: true },
  { id: "co-5", path: "bem-estar/contos", title: "A Coleira de Veludo", excerpt: "Foi presente. Não falaram sobre o que significava. Mas ela usou no jantar de aniversário dele.", author: "Helena V.", date: "Abril MMXXVI", readTime: "12 min", image: IMG.beleza, adult: true },
  { id: "co-6", path: "bem-estar/contos", title: "Suíte 1407", excerpt: "Não havia nome de hóspede. Não havia câmera. Havia apenas uma chave magnética e um intervalo de 4 horas.", author: "Bruno Tellini", date: "Março MMXXVI", readTime: "9 min", image: IMG.motel, adult: true },
];

// =============================================================
// SHOP — Partner stores (used in /shop/sex-shop)
// =============================================================
export const shopCategories = [
  { id: "todos", name: "Todos" },
  { id: "lingerie", name: "Lingerie" },
  { id: "brinquedos", name: "Brinquedos" },
  { id: "cosmeticos", name: "Cosméticos & Óleos" },
  { id: "fetiche", name: "Fetiche & BDSM" },
  { id: "casal", name: "Casal" },
  { id: "bem-estar-intimo", name: "Bem-estar Íntimo" },
  { id: "acessorios", name: "Acessórios" },
  { id: "fragrancias", name: "Fragrâncias" },
];

export const partnerStores = [
  { id: "make-life", name: "Make Life", category: "bem-estar-intimo", tagline: "Higiene Íntima Premium", description: "Higienizador íntimo Chuka Pop — solução discreta, prática e desenvolvida com aprovação do orgulho LGBTQIA+.", cover: "https://customer-assets.emergentagent.com/job_premium-space-2/artifacts/i7t09s3t_WhatsApp%20Image%202026-05-23%20at%2012.54.53.jpeg", link: "https://loja.makelife.com.br/product/chuka-pop-lgbt/", badge: "Parceiro Oficial", rating: 5.0 },
  { id: "s1", name: "Velvet Noire", category: "lingerie", tagline: "Lingerie Couture", description: "Peças numeradas, feitas à mão em São Paulo. Selo L.S Premium.", cover: IMG.fashion, link: "https://example.com/velvet-noire", badge: "Editor's Pick", rating: 4.9 },
  { id: "s2", name: "Obsidian Toys", category: "brinquedos", tagline: "Design Erótico de Autor", description: "Objetos de luxo em vidro borossilicato e obsidiana negra.", cover: IMG.beleza, link: "https://example.com/obsidian", badge: "Premium", rating: 4.8 },
  { id: "s3", name: "Maison Aurélia", category: "fragrancias", tagline: "Perfumaria do Boudoir", description: "Coleção oud, almiscar e baunilha — frascos numerados a mão.", cover: IMG.cultura, link: "https://example.com/maison-aurelia", badge: "Edição Limitada", rating: 5.0 },
  { id: "s4", name: "Domaine Privé", category: "casal", tagline: "Champagne & Sentidos", description: "Kits boudoir com champagne, taluna e essências afrodisíacas.", cover: IMG.vinho, link: "https://example.com/domaine-prive", badge: "Curadoria L.S", rating: 4.9 },
  { id: "s5", name: "Tabu Atelier", category: "fetiche", tagline: "Couro & Sob Medida", description: "Ateliê carioca de peças em couro vegetal sob encomenda.", cover: IMG.noite, link: "https://example.com/tabu-atelier", badge: "Sob Encomenda", rating: 4.7 },
  { id: "s6", name: "Izílda Botanicals", category: "cosmeticos", tagline: "Óleos Sensoriais", description: "Botânica brasileira convertida em rituais de pele e prazer.", cover: IMG.saude, link: "https://example.com/izilda", badge: "Orgânico", rating: 4.8 },
  { id: "s7", name: "Clinique Volupté", category: "bem-estar-intimo", tagline: "Saúde Íntima Premium", description: "Suplementos, terapias hormonais e protocolos de longevidade sexual.", cover: IMG.hotel, link: "https://example.com/clinique-volupte", badge: "Clínica Verificada", rating: 4.9 },
  { id: "s8", name: "Corallium Jewels", category: "acessorios", tagline: "Joias para a Pele Nua", description: "Correntes finas, anelets e piercings em ouro 18k para uso íntimo.", cover: IMG.editorial, link: "https://example.com/corallium", badge: "Ouro 18k", rating: 4.9 },
  { id: "s9", name: "Sereia Sleepwear", category: "lingerie", tagline: "Seda & Dormir Bem", description: "Camisolas e robes em seda Mulberry. Bordados sob encomenda.", cover: IMG.fashion, link: "https://example.com/sereia", badge: "Seda Mulberry", rating: 4.8 },
  { id: "s10", name: "Nôctua Concept", category: "brinquedos", tagline: "Tecnologia & Prazer", description: "Dispositivos discretos com app criptografado e bateria de 8h.", cover: IMG.charuto, link: "https://example.com/noctua", badge: "Tech", rating: 4.7 },
  { id: "s11", name: "Casa do Charuto", category: "casal", tagline: "Adega & Charutaria", description: "Cubanos, dominicanos e portugueses — entrega refrigerada.", cover: IMG.pousada, link: "https://example.com/casa-charuto", badge: "Tradição", rating: 4.9 },
  { id: "s12", name: "Órion Privacy", category: "acessorios", tagline: "Embalagens Discretas", description: "Caixas, malas e dispositivos para transportar com discrição absoluta.", cover: IMG.gastro, link: "https://example.com/orion", badge: "Discrição", rating: 4.8 },
];

// =============================================================
// MARKETPLACE — Lux's own products (Stripe checkout placeholder)
// =============================================================
export const marketplaceProducts = [
  { id: "p-1", name: "Kit Boudoir Aurélia", category: "Fragrâncias", price: 1490, image: IMG.cultura, description: "Eau de parfum 100ml + sabonete artesanal + difusor de varetas. Edição numerada MMXXVI.", stock: 12 },
  { id: "p-2", name: "Robe de Seda Mulberry", category: "Lingerie", price: 2890, image: IMG.fashion, description: "Seda 19mm Mulberry. Bordado personalizado opcional. 6 cores disponíveis.", stock: 6 },
  { id: "p-3", name: "Caixa Noite Lux — 6 Vinhos", category: "Vinhos", price: 3450, image: IMG.vinho, description: "Curadoria fechada com 6 rótulos de pequenas vinícolas. Inclui caderno de degustação.", stock: 24 },
  { id: "p-4", name: "Velas Sensoriais — Trio", category: "Casa", price: 690, image: IMG.beleza, description: "Três velas (oud, jasmim, fumo) em vidro fumê. Queima de 40h cada.", stock: 30 },
  { id: "p-5", name: "Diário Privado Lux", category: "Papelaria", price: 320, image: IMG.editorial, description: "Caderno em couro com fechadura magnética. 240 páginas, papel marfim 100g.", stock: 48 },
  { id: "p-6", name: "Massageador Obsidiana", category: "Brinquedos", price: 1190, image: IMG.beleza, description: "Vidro borossilicato negro. Embalagem em veludo. Garantia vitalícia.", stock: 8 },
];

// =============================================================
// APOSTAS & BETS — Mocked games for showcase
// =============================================================
export const luxGames = [
  { id: "lr-1", name: "Roleta Boudoir", category: "Roleta", description: "Roleta europeia com prêmios em produtos da boutique Lux.", image: IMG.noite, players: 142, multiplier: "x36" },
  { id: "lr-2", name: "Slot Sensorial", category: "Slot", description: "Combine três frascos de perfume e leve para casa o kit Aurélia.", image: IMG.beleza, players: 287, multiplier: "x500" },
  { id: "lr-3", name: "Raspadinha Velvet", category: "Instantâneo", description: "Revele três cetins iguais. Prêmios entre R$ 50 e R$ 5.000.", image: IMG.fashion, players: 521, multiplier: "x100" },
  { id: "lr-4", name: "Poker Privado L.S", category: "Cartas", description: "Mesa fechada com 6 lugares. Buy-in mínimo R$ 1.000. Apenas convidados.", image: IMG.charuto, players: 6, multiplier: "VIP" },
];

// Legacy exports (kept to avoid breaking older imports)
export const navLinks = menuConfig;
export const lifestyleCategories = [];
export const featuredHero = blogPosts.find((p) => p.featured) || blogPosts[0];
export const featuredArticles = blogPosts.filter((p) => p.featured).slice(0, 3);
export const videoContent = [];
export const categories = [];
export const recentArticles = blogPosts.slice(0, 4);
export const articlesByCategory = {};
export const categoryMeta = sectionMeta;
