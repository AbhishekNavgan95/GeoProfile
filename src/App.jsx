import React, { useState } from "react";
import RenderMap from "./components/Map";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { SelectedProfileProvider } from "./hooks/useSelectedProfile";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<RenderMap />} />
      <Route path="/user/:id" element={<RenderMap />} />
    </Routes>
  )

};

export default App;
