import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export async function fetchBanners(slot) {
  try {
    const params = slot ? { slot } : {};
    const { data } = await axios.get(`${API}/banners`, { params });
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("fetchBanners error:", err?.message || err);
    return [];
  }
}

export async function fetchBannerBySlot(slot) {
  const list = await fetchBanners(slot);
  return list[0] || null;
}
