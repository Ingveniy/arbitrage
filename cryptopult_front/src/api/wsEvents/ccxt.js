import { io } from "socket.io-client";
import { PRODUCTION_WS, DEV_WS } from "./const";

const socket = io(
  process.env.NODE_ENV === "development" ? DEV_WS : PRODUCTION_WS,
  {
    reconnectionDelayMax: 5000,
  }
);

// Сконектится с socket.io
export const wsConnect = () => {
  socket.emit("connection");
};

// Получить список доступных бир
export const wsEmitGetAvailableExchanges = async () => {
  const responce = await socket.emit(
    "getAvailableExchanges",
    {},
    (response) => {
      console.log(response, "response getAvailableExchanges");

      return responce;
    }
  );

  return responce;
};

// Получить список пар для биржи
export const wsEmitGetAllExchangePairs = ({ exchangeName }) => {
  const responce = socket.emit(
    "getAllExchangePairs",
    { exchangeName },
    (response) => {
      console.log(response, "response getAllExchangePairs");

      return responce;
    }
  );

  return responce;
};

// Получить информацию по массиву пар
export const wsEmitGetExchangeMarketByPairs = ({ exchangeName, pairs }) => {
  const responce = socket.emit(
    "getExchangeMarketByPairs",
    { exchangeName, pairs },
    (response) => {
      console.log(response, "response getExchangeMarketByPairs");
      return responce;
    }
  );

  return responce;
};
