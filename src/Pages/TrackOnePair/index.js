import React, { useState, useEffect } from "react";
import { Select, Typography, Divider, Button } from "antd";
import { filter, includes } from "lodash";
import { useCCXT } from "../../hook";
import "./index.scss";

const { Title } = Typography;

const App = () => {
  const [exchangesSelector, setExchangeSelector] = useState([]);
  const [pairSelector, setPairSelector] = useState("");

  const [availablePairs, setAvailablePairs] = useState([]);
  const [availableExchanges, setAvailableExchanges] = useState([]);

  const [tickerFromExchanges, setTickerFromExchanges] = useState({});
  const [pairsPriceForAllExchanges, setPairsPriceForAllExchanges] = useState(
    {}
  );

  const {
    getAllExchanges,
    getAvailablePairsFromExchange,
    getTickersFromExchange,
  } = useCCXT({});

  const handleSelectExchange = async (selectedExchanges) => {
    setExchangeSelector(selectedExchanges);

    if (selectedExchanges.length < 2) {
      return false;
    }

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

  const handleSelectPair = (selectedPair) => {
    setPairSelector(selectedPair);
  };

  const updateTickersExchangeData = async (exchangeName) => {
    const response = await getTickersFromExchange({
      exchangeName: exchangeName,
      pairName: pairSelector,
    });

    setTickerFromExchanges((oldTickerData) => {
      const newData = { ...oldTickerData, [exchangeName]: response };
      return newData;
    });
  };

  const handleStartup = () => {
    for (const exchangeName of exchangesSelector) {
      setInterval(() => updateTickersExchangeData(exchangeName), 5000);
    }
  };

  useEffect(() => {
    setAvailableExchanges(getAllExchanges());
  }, []);

  const pairOptions = availablePairs.map((value) => {
    return {
      label: value,
      value,
      disabled: false,
    };
  });

  const exchangeOptions = availableExchanges.map((value) => {
    return {
      label: value,
      value,
      disabled: false,
    };
  });

  useEffect(() => {
    let serrializedData = {};

    Object.keys(tickerFromExchanges).map((item) => {
      serrializedData = {
        ...pairsPriceForAllExchanges,
        [item]: {
          lastPrice: tickerFromExchanges[item].last,
          avgPrice: tickerFromExchanges[item].average,
        },
      };
    });

    setPairsPriceForAllExchanges(serrializedData);
  }, [tickerFromExchanges]);

  console.log(tickerFromExchanges, "tickerFromExchanges");
  console.log(pairsPriceForAllExchanges, "pairsPriceForAllExchanges");

  return (
    <>
      <Title level={3}>Step 1: Select exhanges </Title>
      <Select
        mode="multiple"
        style={{ width: "40%" }}
        placeholder="Please select 2 or more exchanges"
        defaultValue={null}
        onChange={handleSelectExchange}
        options={exchangeOptions}
        value={exchangesSelector}
      />

      <Divider />
      <Title level={3}>Step 2: Select available pair</Title>
      <Select
        style={{ width: "40%" }}
        placeholder="Please select pair"
        defaultValue={null}
        onChange={handleSelectPair}
        options={pairOptions}
        value={pairSelector}
      />
      <Divider />
      <Button type="primary" onClick={handleStartup}>
        Start
      </Button>
      <Divider />
      {Object.keys(pairsPriceForAllExchanges).length > 1 ? (
        <div className="textResults">
          <Title className="title" level={3}>
            Results statistics
          </Title>
          <div className="textResultsContainer">
            <div className="content">
              <div className="lable">Exchange</div>
              <div className="lastPrice">Last price</div>
              <div className="avgPrice">Avg price</div>
            </div>
            {Object.keys(pairsPriceForAllExchanges).map((item) => {
              return (
                <div className="content">
                  <div className="lable">{item}</div>
                  <div className="lastPrice">
                    {pairsPriceForAllExchanges[item].lastPrice}
                  </div>
                  <div className="avgPrice">
                    {pairsPriceForAllExchanges[item].avgPrice}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
