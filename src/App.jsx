import React, { useState } from "react";
import RenderMap from "./components/Map";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import LoadingBar from "react-top-loading-bar";
import { useloadingProgress } from "./stores/loadingProgressStore";
import Admin from "./pages/Admin";

const App = () => {

  const { progress, setLoadingProgress } = useloadingProgress();
  return (
    <>
      <LoadingBar
        color="#509163"
        progress={progress}
        height={5}
        onLoaderFinished={() => setLoadingProgress(0)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user/:id">
          <Route index element={<UserDetails />} />
          <Route path="map" element={<RenderMap />} />
        </Route>
      </Routes>
    </>
  )

};

export default App;
