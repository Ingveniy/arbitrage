import React from "react";
import { Typography, Divider } from "antd";
import { CommissionsTable } from "../../Components/CommissionsTable";
import "./index.scss";

const { Title } = Typography;

export const ExchangeCoinComissions = ({}) => {
  return (
    <React.Fragment>
      <Title level={2}>Комиссии</Title>
      <Divider />

      <CommissionsTable dataForTable={[]} />
    </React.Fragment>
  );
};
