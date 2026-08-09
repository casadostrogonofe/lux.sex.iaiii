import React, { lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MotionConfig } from "motion/react";
import Layout from "./components/Layout";

const EditorialHome = lazy(() => import("./pages/EditorialHome"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const SexualidadePage = lazy(() => import("./pages/SexualidadePage"));
const HoroscopePage = lazy(() => import("./pages/HoroscopePage"));
const ArtistsPage = lazy(() => import("./pages/ArtistsPage"));
const EditorProfile = lazy(() => import("./pages/EditorProfile"));
const Shop = lazy(() => import("./pages/Shop"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const Apostas = lazy(() => import("./pages/Apostas"));
const ShopHub = lazy(() => import("./pages/ShopHub"));

function App() {
  return (
    <div className="App">
      <MotionConfig reducedMotion="user">
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
      </MotionConfig>
    </div>
  );
}

export default App;
