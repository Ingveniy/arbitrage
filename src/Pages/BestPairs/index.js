import React, { useEffect, useState, useCallback } from "react";
import { Typography, Select, Button, Divider } from "antd";
import { filter, includes } from "lodash";
import { BestPairsTable } from "../../Components/BestPairsTable";
import { useCCXT } from "../../hook";
import "./index.scss";

const { Title } = Typography;

export const BestPairs = ({}) => {
  const [appIsStartup, setAppIsStartup] = useState(false);
  const [exchangesSelector, setExchangeSelector] = useState([]);
  const [dataForTabel, setDataForTabel] = useState([]);

  const [availablePairs, setAvailablePairs] = useState([]);
  const [availableExchanges, setAvailableExchanges] = useState([]);

  const [intervalId, setIntervalId] = useState("");
  const {
    getAllExchanges,
    getAvailablePairsFromExchange,
    getTickersFromExchange,
  } = useCCXT({});

  useEffect(() => {
    // setAvailableExchanges(getAllExchanges());
  }, []);

  useEffect(() => {
    if (appIsStartup) {
      const interval = setInterval(() => getAllTickersFromExchanges(), 5000);
      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
    }
  }, [appIsStartup]);

  const handleSelectExchange = async (selectedExchanges) => {
    //
    if (appIsStartup) {
      setAppIsStartup(false);
    }

    setExchangeSelector(selectedExchanges);

    if (selectedExchanges.length < 2) {
      return false;
    }

    //Парсинг доступных пар для выбранных бирж
    const allPairs = [];

    for (const exchangeName of selectedExchanges) {
      const symbols = await getAvailablePairsFromExchange({ exchangeName });
      allPairs.push(...symbols);
    }

    const allCompairedPairs = await filter(allPairs, (value, index, iteratee) =>
      includes(iteratee, value, index + 1)
    );

    // Удаляем фиат из общих пар
    const fiatCurrencies = ["EUR", "USD", "GBP", "RUB", "UAH"];
    const allAvailablePairs = [];
    for (const pairName of allCompairedPairs) {
      const [tickerOfPair, makerOfPair] = pairName.split("/");

      // Выбиваем из цикла если есть фиат
      for (const [index, currencyName] of fiatCurrencies.entries()) {
        if (tickerOfPair === currencyName || makerOfPair === currencyName) {
          break;
        }

        // Если нас не выбило из цикла до последнего элемента в массиве фиата, то это не фиат
        if (index + 1 === fiatCurrencies.length) {
          allAvailablePairs.push(pairName);
        }
      }
    }
    setAvailablePairs(allAvailablePairs);
  };

  //Получение данных для таблицы пар
  const getAllTickersFromExchanges = useCallback(async () => {
    const resultData = {};

    for (const exchangeName of exchangesSelector) {
      resultData[exchangeName] = {};

      const response = await getTickersFromExchange({
        exchangeName,
        pairNames: availablePairs,
      });

      console.log(response, "response");

      Object.keys(response).map((pairName) => {
        resultData[exchangeName] = {
          ...resultData[exchangeName],
          ...{
            [pairName]: {
              lastPrice: response[pairName].last,
              avgPrice: response[pairName].average,
            },
          },
        };
      });
    }

    setDataForTabel(resultData);
  }, [exchangesSelector, availablePairs]);

  const exchangeOptions = availableExchanges.map((value) => {
    return {
      label: value,
      value,
      disabled: false,
    };
  });

  console.log(dataForTabel, "dataForTabel");
  return (
    <React.Fragment>
      <Title level={2}>Поиск лучших арбитражных пар</Title>
      <Divider />

      <Title level={5}>Выберите биржы</Title>
      <Select
        mode="multiple"
        style={{ width: "40%" }}
        placeholder="Please select 2 or more exchanges"
        defaultValue={null}
        onChange={handleSelectExchange}
        options={exchangeOptions}
        value={exchangesSelector}
        listHeight={150}
      />

      <br />
      <br />
      <br />

      {appIsStartup ? (
        <React.Fragment>
          <BestPairsTable dataForTable={dataForTabel} />
          <br />
          <Button type="primary" onClick={() => setAppIsStartup(false)}>
            Остановить отслеживание
          </Button>
        </React.Fragment>
      ) : (
        <Button
          type="primary"
          onClick={() => setAppIsStartup(true)}
          disabled={availablePairs.length <= 0}
        >
          Начать отслеживание
        </Button>
      )}
    </React.Fragment>
  );
};
