import React from "react";
import { Table } from "antd";
import "./index.scss";

export const AllPairsTable = ({
  dataForTable = {
    binance: {
      "BTC/USDT": {
        lastPrice: 10,
        avgPrice: 20,
      },
    },
    exmo: {
      "BTC/USDT": {
        lastPrice: 11,
        avgPrice: 21,
      },
    },
  },
}) => {
  const allExhanges = Object.keys(dataForTable) || [];
  const allPairs =
    allExhanges.length > 0 ? Object.keys(dataForTable[allExhanges[0]]) : [];

  const dataSource = allPairs.map((pairName, index) => {
    const rowData = {
      key: index,
      pair: pairName,
    };

    allExhanges.map((exchangeName) => {
      rowData[exchangeName] = dataForTable[exchangeName][pairName].lastPrice;
    });

    return rowData;
  });

  const allExhangesColumns = Object.keys(dataForTable).map((exchangeName) => {
    return {
      title: exchangeName,
      key: [exchangeName],
      dataIndex: [exchangeName],
    };
  });

  const columns = [
    { title: "Пара", dataIndex: "pair", key: "pair" },
    ...allExhangesColumns,
  ];

  return <Table dataSource={dataSource} columns={columns} pagination={false} />;
};
