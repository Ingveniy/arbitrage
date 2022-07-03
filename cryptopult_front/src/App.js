import React from "react";
import { Routes, Route } from "react-router-dom";
import { PairsBlackList } from "./Pages/PairsBlackList";
import { ExchangeCoinComissions } from "./Pages/ExchangeCoinComissions";
import { ExchangeCoinNets } from "./Pages/ExchangeCoinNets";
import { BestPairs } from "./Pages/BestPairs";
import { MainLayout } from "./Components/MainLayout";
import "./index.scss";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<BestPairs />} />
        <Route path="/blacklist" element={<PairsBlackList />} />
        <Route path="/commissions" element={<ExchangeCoinComissions />} />
        <Route path="/nets" element={<ExchangeCoinNets />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
