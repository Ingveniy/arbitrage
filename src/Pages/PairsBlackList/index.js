import React, { useEffect, useState, useCallback } from "react";
import { Typography, Select, Button, Divider } from "antd";
import "./index.scss";

const { Title } = Typography;

export const PairsBlackList = ({}) => {
  return (
    <React.Fragment>
      <Title level={2}>Поиск лучших арбитражных пар</Title>
      <Divider />

      {/* <BlackListTable dataForTable={[]} /> */}
    </React.Fragment>
  );
};
