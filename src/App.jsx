import React, { useState } from "react";
import RenderMap from "./components/Map";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<RenderMap />} />
      <Route path="/user/:id/map" element={<RenderMap />} />
    </Routes>
  )

};

export default App;
