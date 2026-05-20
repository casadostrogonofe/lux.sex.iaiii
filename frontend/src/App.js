import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Lifestyle from "./pages/Lifestyle";
import Shop from "./pages/Shop";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lifestyle />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
