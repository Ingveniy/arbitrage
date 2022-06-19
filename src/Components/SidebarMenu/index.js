import React from "react";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { MAIN_ROUTES } from "../../const";
import "./index.scss";

export const SidebarMenu = ({}) => {
  const navigate = useNavigate();

  const handleNavigate = ({ key }) => {
    navigate(key);
  };

  const MENU_ITEMS = [
    {
      label: "Поиск лучших пар",
      key: MAIN_ROUTES.mainPage,
      icon: <SearchOutlined />,
    },
    {
      label: "Черный список пар",
      key: MAIN_ROUTES.blackList,
      icon: <DeleteOutlined />,
    },
  ];
  return (
    <Menu
      className="menu"
      onClick={handleNavigate}
      defaultSelectedKeys={[MAIN_ROUTES.mainPage]}
      mode="inline"
      items={MENU_ITEMS}
    />
  );
};
