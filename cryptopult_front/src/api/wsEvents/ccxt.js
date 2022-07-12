import { io } from "socket.io-client";
import { PRODUCTION_WS, DEV_WS } from "./const";

const isDev = process.env.NODE_ENV === "development";

const socket = io(isDev ? DEV_WS : PRODUCTION_WS, {
  secure: isDev ? false : true,
  reconnectionDelayMax: 5000,
  path: "/api",
});

// Получить список доступных бир
export async function wsEmitGetAvailableExchanges() {
  console.log(socket, "socket");
  const responce = await new Promise((resolve) => {
    socket.emit("getAvailableExchanges", {}, ({ data }) => {
      resolve(data);
    });
  });

  return responce;
}

// Получить список пар для биржи
export const wsEmitGetAllExchangePairs = async ({ exchangeName }) => {
  const responce = await new Promise((resolve) => {
    socket.emit("getAllExchangePairs", { exchangeName }, ({ data }) => {
      resolve(data);
    });
  });

  return responce;
};

// Получить информацию по массиву пар
export const wsEmitGetExchangeMarketByPairs = async ({
  exchangeName,
  pairNames,
}) => {
  const responce = await new Promise((resolve) => {
    socket.emit(
      "getExchangeMarketByPairs",
      { exchangeName, pairNames },
      ({ data }) => {
        resolve(data);
      }
    );
  });

  return responce;
};
