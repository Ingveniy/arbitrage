import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "./index.scss";

export const BestPairsTable = ({ dataForTable }) => {
  const allExhanges = Object.keys(dataForTable) || [];
  const allPairs =
    allExhanges.length > 0 ? Object.keys(dataForTable[allExhanges[0]]) : [];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allPairs.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [dataForTable]);

  const dataSource = allPairs.map((pairName, index) => {
    const rowData = {
      key: index,
      pair: pairName,
      maxPriceExchangeName: null,
      minPriceExchangeName: null,
      maxPrice: 0,
      minPrice: 999999999,
      rawProfit: 0,
      percentProfit: 0,
    };

    // Выбираем для каждой валюты max и min предложения
    allExhanges.map((exchangeName) => {
      // Ищем максимальную цену
      if (dataForTable[exchangeName][pairName].lastPrice >= rowData.maxPrice) {
        rowData.maxPrice = dataForTable[exchangeName][pairName].lastPrice;
        rowData.maxPriceExchangeName = exchangeName;
      }

      if (dataForTable[exchangeName][pairName].lastPrice <= rowData.minPrice) {
        rowData.minPrice = dataForTable[exchangeName][pairName].lastPrice;
        rowData.minPriceExchangeName = exchangeName;
      }
    });

    // Высчитываем сырой профит
    rowData.rawProfit = (rowData.maxPrice - rowData.minPrice).toFixed(9);

    if (!isFinite(rowData.rawProfit)) {
      rowData.rawProfit = 0;
    }

    // Высчитываем профит в процентах
    rowData.percentProfit = (
      ((rowData.maxPrice - rowData.minPrice) / rowData.minPrice) *
      100
    ).toFixed(9);

    if (!isFinite(rowData.percentProfit) || rowData.percentProfit > 100) {
      rowData.percentProfit = 0;
    }

    return rowData;
  });

  const columns = [
    { title: "Пара", dataIndex: "pair", key: "pair" },
    {
      title: "Цена покупки",
      dataIndex: "minPrice",
      key: "minPrice",
      render: (_, { minPrice, minPriceExchangeName }) => {
        return (
          <div>
            <div>
              <b>{minPriceExchangeName}</b>
            </div>
            <div>{minPrice}</div>
          </div>
        );
      },
    },
    {
      title: "Цена продажи",
      dataIndex: "maxPrice",
      key: "maxPrice",
      render: (_, { maxPrice, maxPriceExchangeName }) => {
        return (
          <div>
            <div>
              <b>{maxPriceExchangeName}</b>
            </div>
            <div>{maxPrice}</div>
          </div>
        );
      },
    },
    {
      title: "Профит",
      dataIndex: "rawProfit",
      key: "rawProfit",
      defaultSortOrder: "descend",
    },
    {
      title: "Профит в %",
      dataIndex: "percentProfit",
      key: "percentProfit",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.percentProfit - b.percentProfit,
    },
  ];

  return (
    <Table
      className="table"
      dataSource={dataSource}
      scroll={{ y: 300 }}
      columns={columns}
      pagination={false}
      loading={isLoading}
    />
  );
};
