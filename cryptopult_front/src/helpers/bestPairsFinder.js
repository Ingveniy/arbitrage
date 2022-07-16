/*
allSelectedExchanges = ['exmo', 'binance']; 

allPairs = ['ETH/USDT', 'BTC/USDT', 'USDT/USDC'];

allPairsDataFromExhanges = {
  [exchangeName]: {
    [pairName]: {
      ask, // Цена продажи
      askVolume, //  Обьем предложений продажи 
      average, // Средняя цена за свечу
      baseVolume, // Общий обьем торгов
      bid, // Цена покупки
      bidVolume, // Обьем предложений покупки
      high, // Самая большая цена сделки
      last, // Цена при проследней сделке
      low, // Меньшая цена сделки 
      open, // 
      change, // 
      close, // 
      percentage, //
    }
  }
};
*/

export const getPairWithBestPrice = ({
  allSelectedExchanges,
  allPairs,
  allPairsDataFromExhanges,
}) => {
  //Проходимся по массиву с парами
  const bestPairsPrices = allPairs.map((pairName, index) => {
    // Берем пару
    const pairData = {
      key: index + "|" + pairName,
      pair: pairName,
      maxPriceExchangeName: null,
      minPriceExchangeName: null,
      maxPrice: 0,
      minPrice: 999999999,
      bidVolume: 0,
      askVolume: 0,
      rawProfit: 0,
      percentProfit: 0,
    };
    // Ищим биржи с лучшими ценами для этой пары
    allSelectedExchanges.forEach((exchangeName) => {
      // Ищем максимальную цену за которую готовы купить bid

      const currentPairOnExchange =
        allPairsDataFromExhanges[exchangeName][pairName];

      if (!currentPairOnExchange) {
        return;
      }

      if (pairData.maxPrice < currentPairOnExchange.bid) {
        pairData.maxPrice = currentPairOnExchange.bid.toFixed(8);
        pairData.maxPriceExchangeName = exchangeName;

        pairData.bidVolume =
          currentPairOnExchange.bidVolume || currentPairOnExchange.baseVolume;

        pairData.bidVolume = pairData.bidVolume.toFixed(2);
      }
      // Ищем минимальную цену за которую готовы продать ask
      if (pairData.minPrice > currentPairOnExchange.ask) {
        pairData.minPrice = currentPairOnExchange.ask.toFixed(8);
        pairData.minPriceExchangeName = exchangeName;

        pairData.askVolume =
          currentPairOnExchange.askVolume || currentPairOnExchange.baseVolume;

        pairData.askVolume = pairData.askVolume.toFixed(2);
      }
    });

    // Высчитываем сырой профит
    pairData.rawProfit = (pairData.maxPrice - pairData.minPrice).toFixed(8);

    if (!isFinite(pairData.rawProfit)) {
      pairData.rawProfit = 0;
    }

    // Высчитываем профит в процентах
    pairData.percentProfit = (
      ((pairData.maxPrice - pairData.minPrice) / pairData.minPrice) *
      100
    ).toFixed(8);

    // Обнуляем расчет если для пары какой то кривой процентаж
    if (!isFinite(pairData.percentProfit) || pairData.percentProfit > 100) {
      pairData.percentProfit = 0;
    }

    //

    return pairData;
  });

  return bestPairsPrices;
};
