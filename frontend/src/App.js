import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Lifestyle from "./pages/Lifestyle";
import CategoryPage from "./pages/CategoryPage";
import Shop from "./pages/Shop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Lifestyle />} />
            <Route path="lifestyle" element={<Lifestyle />} />
            <Route path="lifestyle/:category" element={<CategoryPage />} />
            <Route path="shop" element={<Shop />} />
            <Route path="*" element={<Navigate to="/lifestyle" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
