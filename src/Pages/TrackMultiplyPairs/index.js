import React, { useEffect, useState, useCallback } from "react";
import { Typography, Select, Button } from "antd";
import { filter, includes } from "lodash";
import { AllPairsTable } from "../../Components/AllPairsTable";
import { BestPairsTable } from "../../Components/BestPairsTable";
import { useCCXT } from "../../hook";
import "./index.scss";

const { Title } = Typography;

export const TrackMultiplyPairs = () => {
  const [appIsStartup, setAppIsStartup] = useState(false);
  const [exchangesSelector, setExchangeSelector] = useState([]);
  const [dataForTabel, setDataForTabel] = useState([]);

  const [availablePairs, setAvailablePairs] = useState([]);
  const [availableExchanges, setAvailableExchanges] = useState([]);

  const {
    getAllExchanges,
    getAvailablePairsFromExchange,
    getTickersFromExchange,
  } = useCCXT({});

  useEffect(() => {
    setAvailableExchanges(getAllExchanges());
  }, []);

  let currentInterval = "";
  useEffect(() => {
    if (appIsStartup) {
      currentInterval = setInterval(() => getAllTickersFromExchanges(), 5000);
    } else {
    }
  }, [appIsStartup]);

  const handleSelectExchange = async (selectedExchanges) => {
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

    const allAvailablePairs = await filter(allPairs, (val, i, iteratee) =>
      includes(iteratee, val, i + 1)
    );

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
    <div className="root">
      <Title level={4}>Выберите биржы</Title>
      <Select
        mode="multiple"
        style={{ width: "40%" }}
        placeholder="Please select 2 or more exchanges"
        defaultValue={null}
        onChange={handleSelectExchange}
        options={exchangeOptions}
        value={exchangesSelector}
      />

      <br />

      {appIsStartup ? (
        <React.Fragment>
          <Button type="primary" onClick={() => setAppIsStartup(false)}>
            Остановить отслеживание
          </Button>
          <br />
          <Title level={4}>Топ 10 пар по профиту</Title>
          <BestPairsTable dataForTable={dataForTabel} />
          <br />
          <br />
          <br />
          <Title level={4}>Все доступные пары для всех выбранных бирж</Title>
          <AllPairsTable dataForTable={dataForTabel} />
          <br />
          <br />
          <br />
          <Title level={4}>Черный список пар</Title>
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
    </div>
  );
};
