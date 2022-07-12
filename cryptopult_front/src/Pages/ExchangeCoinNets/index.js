import React from "react";
import { Typography, Divider } from "antd";
import { NetsTable } from "../../Components/NetsTable";
import "./index.scss";

const { Title } = Typography;

export const ExchangeCoinNets = ({}) => {
  return (
    <React.Fragment>
      <Title level={2}>Сети</Title>
      <Divider />

      <NetsTable dataForTable={[]} />
    </React.Fragment>
  );
};
