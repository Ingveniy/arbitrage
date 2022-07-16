import React, { useState, useEffect, useRef } from "react";
import { Table, Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { getPairWithBestPrice } from "../../helpers/bestPairsFinder";
import "./index.scss";

export const BestPairsTable = ({ dataForTable }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  const dataSource = getPairWithBestPrice({
    allSelectedExchanges: allExhanges,
    allPairs,
    allPairsDataFromExhanges: dataForTable,
  });

  // Поиск по названию монеты
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Пара",
      dataIndex: "pair",
      key: "pair",
      ...getColumnSearchProps("pair"),
    },
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
      title: "Обьем торгов",
      dataIndex: "volume",
      key: "volume",
      render: (
        _,
        { maxPriceExchangeName, minPriceExchangeName, bidVolume, askVolume }
      ) => {
        return (
          <div>
            <div>
              <b>{minPriceExchangeName}</b>: <span>{askVolume}</span>
            </div>
            <div>
              <b>{maxPriceExchangeName}</b>: <span>{bidVolume}</span>
            </div>
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
