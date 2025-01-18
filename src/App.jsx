import React, { useState } from "react";
import RenderMap from "./components/Map";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<RenderMap />} />
      <Route path="/user/:id">
        <Route index element={<UserDetails />} />
        <Route path="map" element={<RenderMap />} />
      </Route>
    </Routes>
  )

};

export default App;
