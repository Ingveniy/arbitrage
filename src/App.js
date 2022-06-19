import React from "react";
import { Routes, Route } from "react-router-dom";
import { PairsBlackList } from "./Pages/PairsBlackList";
import { BestPairs } from "./Pages/BestPairs";
import { MainLayout } from "./Components/MainLayout";
import "./index.scss";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<BestPairs />} />
        <Route path="/blacklist" element={<PairsBlackList />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
