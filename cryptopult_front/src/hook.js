// import ccxt from "ccxt";

export const useCCXT = ({}) => {
  const getAllExchanges = () => {
    // return ccxt.exchanges;
  };

  const getAvailablePairsFromExchange = async ({ exchangeName }) => {
    // let exchange = new ccxt[exchangeName]();
    // const markets = await exchange.loadMarkets();
    // const symbols = await Object.keys(markets);
    // return symbols;
  };

  const getTickerFromExchange = async ({ exchangeName, pairName }) => {
    // let exchange = new ccxt[exchangeName]();
    // const response = await exchange.fetchTicker(pairName);
    // return response;
  };

  const getTickersFromExchange = async ({ exchangeName, pairNames }) => {
    // let exchange = new ccxt[exchangeName]();
    // const response = await exchange.fetchTickers(pairNames);
    // return response;
  };

  return {
    getAllExchanges,
    getTickerFromExchange,
    getTickersFromExchange,
    getAvailablePairsFromExchange,
  };
};
