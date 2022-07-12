import React from "react";
import { Typography, Divider } from "antd";
import { BlacklistTable } from "../../Components/BlacklistTable";
import "./index.scss";

const { Title } = Typography;

export const PairsBlackList = ({}) => {
  return (
    <React.Fragment>
      <Title level={2}>Черный список пар</Title>
      <Divider />

      <BlacklistTable dataForTable={[]} />
    </React.Fragment>
  );
};
