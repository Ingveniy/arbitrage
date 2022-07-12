import React from "react";
import { Routes, Route } from "react-router-dom";
import { PairsBlackList } from "./Pages/PairsBlackList";
import { ExchangeCoinComissions } from "./Pages/ExchangeCoinComissions";
import { ExchangeCoinNets } from "./Pages/ExchangeCoinNets";
import { BestPairs } from "./Pages/BestPairs";
import { MainLayout } from "./Components/Core/MainLayout";
import "./index.scss";

const App = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<BestPairs />} />
        <Route path="/settings/blacklist" element={<PairsBlackList />} />
        <Route
          path="/settings/commissions"
          element={<ExchangeCoinComissions />}
        />
        <Route path="/settings/nets" element={<ExchangeCoinNets />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
