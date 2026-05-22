import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import BlogPage from "./pages/BlogPage";
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
            <Route index element={<Navigate to="/turismo" replace />} />

            {/* Shop hub + sub-pages */}
            <Route path="shop" element={<ShopHub />} />
            <Route path="shop/sex-shop" element={<Shop />} />
            <Route path="shop/marketplace" element={<Marketplace />} />
            <Route path="shop/apostas" element={<Apostas />} />

            {/* Editorial blog routes — generic */}
            <Route path=":section" element={<BlogPage />} />
            <Route path=":section/:sub" element={<BlogPage />} />

            <Route path="*" element={<Navigate to="/turismo" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
