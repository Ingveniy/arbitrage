import {
  wsEmitGetAvailableExchanges,
  wsEmitGetAllExchangePairs,
  wsEmitGetExchangeMarketByPairs,
} from "./api/wsEvents/ccxt";

export const useCCXT = ({}) => {
  const getAllExchanges = async () => {
    const allExchanges = await wsEmitGetAvailableExchanges();
    return allExchanges;
  };

  const getAvailablePairsFromExchange = ({ exchangeName }) => {
    const allPairs = wsEmitGetAllExchangePairs({ exchangeName });

    return allPairs;
  };

  const getTickersFromExchange = ({ exchangeName, pairNames }) => {
    const pairs = wsEmitGetExchangeMarketByPairs({
      exchangeName,
      pairNames,
    });

    return pairs;
  };

  return {
    getAllExchanges,
    getTickersFromExchange,
    getAvailablePairsFromExchange,
  };
};
