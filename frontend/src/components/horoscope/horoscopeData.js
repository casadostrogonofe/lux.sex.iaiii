// Zodiac data + art (from the Mestre Agnes project) used by the Lux horoscope.
const CDN =
  "https://cdn.enter.pro/visual_resources/100512101/112a6ab6f56c4968bc9aec1c6c8a8357";

const AGNES_SITE = "https://frontend-nu-opal-d1fi47s48v.vercel.app";
export const AGNES_PLANS = `${AGNES_SITE}/#pagamento`;
export const AGNES_LOGO = "/agnes-logo.jpeg";

export const WESTERN_SIGNS = [
  { id: "aries", name: "Áries", range: "21.03 – 19.04", img: `${CDN}/e1dd0fc9.png` },
  { id: "touro", name: "Touro", range: "20.04 – 20.05", img: `${CDN}/cd81cb3a.png` },
  { id: "gemeos", name: "Gêmeos", range: "21.05 – 20.06", img: `${CDN}/487bb828.png` },
  { id: "cancer", name: "Câncer", range: "21.06 – 22.07", img: `${CDN}/5a31ebd4.png` },
  { id: "leao", name: "Leão", range: "23.07 – 22.08", img: `${CDN}/65d06543.png` },
  { id: "virgem", name: "Virgem", range: "23.08 – 22.09", img: `${CDN}/8f0ad340.png` },
  { id: "libra", name: "Libra", range: "23.09 – 22.10", img: `${CDN}/78a58020.png` },
  { id: "escorpiao", name: "Escorpião", range: "23.10 – 21.11", img: `${CDN}/ab3a0e1e.png` },
  { id: "sagitario", name: "Sagitário", range: "22.11 – 21.12", img: `${CDN}/eeba4feb.png` },
  { id: "capricornio", name: "Capricórnio", range: "22.12 – 19.01", img: `${CDN}/b285da56.png` },
  { id: "aquario", name: "Aquário", range: "20.01 – 18.02", img: `${CDN}/40b14292.png` },
  { id: "peixes", name: "Peixes", range: "19.02 – 20.03", img: `${CDN}/5c0eba40.png` },
];

export const CHINESE_SIGNS = [
  { id: "rato", name: "Rato", glyph: "鼠", years: [2020, 2008, 1996] },
  { id: "boi", name: "Boi", glyph: "牛", years: [2021, 2009, 1997] },
  { id: "tigre", name: "Tigre", glyph: "虎", years: [2022, 2010, 1998] },
  { id: "coelho", name: "Coelho", glyph: "兔", years: [2023, 2011, 1999] },
  { id: "dragao", name: "Dragão", glyph: "龍", years: [2024, 2012, 2000] },
  { id: "serpente", name: "Serpente", glyph: "蛇", years: [2025, 2013, 2001] },
  { id: "cavalo", name: "Cavalo", glyph: "馬", years: [2026, 2014, 2002] },
  { id: "cabra", name: "Cabra", glyph: "羊", years: [2027, 2015, 2003] },
  { id: "macaco", name: "Macaco", glyph: "猴", years: [2028, 2016, 2004] },
  { id: "galo", name: "Galo", glyph: "雞", years: [2029, 2017, 2005] },
  { id: "cao", name: "Cão", glyph: "狗", years: [2030, 2018, 2006] },
  { id: "porco", name: "Porco", glyph: "豬", years: [2031, 2019, 2007] },
];

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

export async function fetchAgnesReading(system, sign, lang) {
  const res = await fetch(
    `${API}/horoscope/agnes?system=${system}&sign=${sign}&lang=${lang}`,
  );
  if (!res.ok) throw new Error("bad status");
  const data = await res.json();
  return data.reading;
}
