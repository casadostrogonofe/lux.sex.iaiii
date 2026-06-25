import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import EditorialHome from "./pages/EditorialHome";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import SexualidadePage from "./pages/SexualidadePage";
import HoroscopePage from "./pages/HoroscopePage";
import ArtistsPage from "./pages/ArtistsPage";
import EditorProfile from "./pages/EditorProfile";
import Shop from "./pages/Shop";
import Marketplace from "./pages/Marketplace";
import Apostas from "./pages/Apostas";
import ShopHub from "./pages/ShopHub";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<EditorialHome />} />

            {/* Shop hub + sub-pages */}
            <Route path="shop" element={<ShopHub />} />
            <Route path="shop/sex-shop" element={<Shop />} />
            <Route path="shop/marketplace" element={<Marketplace />} />
            <Route path="shop/apostas" element={<Apostas />} />

            {/* Special editorial sub-pages — declared BEFORE generic to win the match */}
            <Route path="bem-estar/sexualidade" element={<SexualidadePage />} />
            <Route path="bem-estar/horoscopo" element={<HoroscopePage />} />
            <Route path="vida-noturna/artistas" element={<ArtistsPage />} />
            <Route
              path="vida-noturna/artistas/:label"
              element={<ArtistsPage />}
            />
            <Route path="editores/:slug" element={<EditorProfile />} />

            {/* Editorial blog routes — generic */}
            <Route path=":section" element={<BlogPage />} />
            <Route path=":section/:sub" element={<BlogPage />} />
            <Route path=":section/:sub/:slug" element={<ArticlePage />} />

            <Route path="*" element={<Navigate to="/turismo" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
