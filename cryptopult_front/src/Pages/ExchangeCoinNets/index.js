import React, { useEffect } from "react";
import {
  wsConnect,
  wsEmitGetAvailableExchanges,
} from "../../api/wsEvents/ccxt";

import "./index.scss";

export const ExchangeCoinNets = ({}) => {
  useEffect(() => {
    wsConnect();
  }, []);

  return (
    <div>
      <button onClick={wsEmitGetAvailableExchanges}>
        Получить список бирж
      </button>
      <button>Получить список монет на бирже</button>
    </div>
  );
};
