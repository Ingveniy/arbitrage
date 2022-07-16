import React, { useEffect, useState } from "react";
import { Typography, Select, Button, Divider, Spin } from "antd";
import { BestPairsTable } from "../../Components/BestPairsTable";
import { useCCXT } from "../../hook";
import "./index.scss";

const { Title } = Typography;

export const BestPairs = () => {
  const [appStep, setAppStep] = useState(1);

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
    initStart();
  }, []);

  // Получаем список всех бирж
  const initStart = async () => {
    const responce = getAllExchanges();
    setAvailableExchanges(await responce);
  };

  //Получение данных для таблицы пар
  const getAllTickersFromExchanges = async () => {
    const resultData = {};

    console.log(availablePairs, "availablePairs");
    for (const exchangeName of exchangesSelector) {
      resultData[exchangeName] = {};

      const response = await getTickersFromExchange({
        exchangeName,
        pairNames: availablePairs,
      });

      console.log(response, `response for ${exchangeName}`);
      Object.keys(response).forEach((pairName) => {
        const {
          ask = 0,
          askVolume = 0,
          average = 0,
          baseVolume = 0,
          bid = 0,
          bidVolume = 0,
          change,
          close,
          high,
          last,
          low,
          open,
          percentage,
        } = response[pairName];

        resultData[exchangeName] = {
          ...resultData[exchangeName],
          ...{
            [pairName]: {
              ask,
              askVolume,
              average,
              baseVolume,
              bid,
              bidVolume,
              change,
              close,
              high,
              last,
              low,
              open,
              percentage,
            },
          },
        };
      });
    }

    setDataForTabel(resultData);
  };

  const exchangeOptions = availableExchanges.map((value) => {
    return {
      label: value,
      value,
      disabled: false,
    };
  });

  const handleGetPairs = async (selectedExchanges) => {
    setAppStep(2);

    //Парсинг доступных пар для выбранных бирж
    const allPairs = [];

    for (const exchangeName of selectedExchanges) {
      const symbols = await getAvailablePairsFromExchange({ exchangeName });
      allPairs.push(...symbols);
    }

    // Пробегаемся по массиву пар и считаем количество совпадений для каждой пары
    const tmpPairCounter = {};
    for (const pairName of allPairs) {
      if (!tmpPairCounter[pairName]) {
        tmpPairCounter[pairName] = 0;
      }

      tmpPairCounter[pairName] = tmpPairCounter[pairName] + 1;
    }

    console.log(tmpPairCounter, "tmpPairCounter");

    // Если пара повторяется столько же раз сколько и бирж в поиске то она нам подходит
    const compairedPairs = Object.keys(tmpPairCounter).filter(
      (pairName) => tmpPairCounter[pairName] === selectedExchanges.length
    );

    // Удаляем фиат из общих пар
    const fiatCurrencies = ["EUR", "USD", "GBP", "RUB", "UAH"];
    const allAvailablePairs = [];

    for (const pairName of compairedPairs) {
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

  const handleStartTracking = async () => {
    setAppStep(3);

    const interval = setInterval(() => getAllTickersFromExchanges(), 5000);
    setIntervalId(interval);
  };

  const handleStopTracking = () => {
    clearInterval(intervalId);
    setAppStep(1);
  };

  const renderStepper = (currentStep) => {
    switch (currentStep) {
      case 1:
        return (
          <React.Fragment>
            <Title level={5}>Выберите биржы</Title>
            <Select
              mode="multiple"
              style={{ width: "40%" }}
              placeholder="Please select 2 or more exchanges"
              defaultValue={null}
              onChange={(selectedExchanges) =>
                setExchangeSelector(selectedExchanges)
              }
              options={exchangeOptions}
              value={exchangesSelector}
              listHeight={150}
            />
            <br />
            <br />
            <Button
              type="primary"
              onClick={() => handleGetPairs(exchangesSelector)}
              disabled={exchangesSelector.length < 2}
            >
              Подобрать общие пары
            </Button>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            {availablePairs.length ? (
              <Title level={5}>
                Найдено {availablePairs.length} общих пар для остелживания
              </Title>
            ) : (
              <React.Fragment>
                <Spin className="pairsSpin" />
                <br />
              </React.Fragment>
            )}

            <br />
            <Button
              type="primary"
              onClick={() => handleStartTracking()}
              disabled={availablePairs.length <= 0}
            >
              Начать отслеживание
            </Button>
          </React.Fragment>
        );
      case 3:
        return (
          <React.Fragment>
            <BestPairsTable dataForTable={dataForTabel} />
            <br />
            <Button type="primary" onClick={() => handleStopTracking()}>
              Остановить отслеживание
            </Button>
          </React.Fragment>
        );

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <Title level={2}>Поиск лучших арбитражных пар</Title>
      <Divider />

      {renderStepper(appStep)}
    </React.Fragment>
  );
};
