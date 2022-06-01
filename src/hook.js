import ccxt from "ccxt";

export const useCCXT = ({}) => {
  const getAllExchanges = () => {
    return ccxt.exchanges;
  };

  const getAvailablePairsFromExchange = async ({ exchangeName }) => {
    let exchange = new ccxt[exchangeName]();

    const markets = await exchange.loadMarkets();
    const symbols = await Object.keys(markets);
    return symbols;
  };

  const getTickersFromExchange = async ({ exchangeName, pairName }) => {
    let exchange = new ccxt[exchangeName]();
    const response = await exchange.fetchTicker(pairName);

    return response;
  };

  return {
    getAllExchanges,
    getTickersFromExchange,
    getAvailablePairsFromExchange,
  };
};
