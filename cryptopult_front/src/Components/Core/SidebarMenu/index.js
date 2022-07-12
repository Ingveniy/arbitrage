import React, { useState, useEffect } from "react";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { MAIN_ROUTES } from "../../../const";
import "./index.scss";

export const SidebarMenu = ({}) => {
  const [currentRoutes, setCurrentRoutes] = useState([]);
  const [openedSubMenus, setOpenedSubMenus] = useState([]);

  const navigate = useNavigate();

  const handleNavigate = ({ key }) => {
    let navigateRoute = key;
    if (
      [
        MAIN_ROUTES.nets,
        MAIN_ROUTES.commissions,
        MAIN_ROUTES.blackList,
      ].includes(key)
    ) {
      navigateRoute = `${MAIN_ROUTES.settings}${key}`;
    }

    navigate(navigateRoute);
  };

  const getCurrentRoutes = () => {
    const routes = window.location.pathname.match(/\/+[A-z]+/g);

    setCurrentRoutes(
      routes && routes.length > 0 ? routes : [MAIN_ROUTES.mainPage]
    );

    // Открываем submenu
    if (
      routes &&
      routes.includes(
        MAIN_ROUTES.settings,
        MAIN_ROUTES.nets,
        MAIN_ROUTES.commissions,
        MAIN_ROUTES.blackList
      )
    ) {
      setOpenedSubMenus([MAIN_ROUTES.settings]);
    }
  };

  useEffect(() => {
    getCurrentRoutes();
  }, [window.location.pathname]);

  const handleToogleSubMenu = (value) => {
    setOpenedSubMenus(value);
  };
  const MENU_ITEMS = [
    {
      label: "Поиск лучших пар",
      key: MAIN_ROUTES.mainPage,
      icon: <SearchOutlined />,
    },
    {
      label: "Настройки",
      key: MAIN_ROUTES.settings,
      icon: <SettingOutlined />,
      children: [
        {
          label: "Черный список",
          key: MAIN_ROUTES.blackList,
        },
        { label: "Сети", key: MAIN_ROUTES.nets },
        {
          label: "Комиссии",
          key: MAIN_ROUTES.commissions,
        },
      ],
    },
  ];

  return (
    <Menu
      className="menu"
      onClick={handleNavigate}
      selectedKeys={currentRoutes}
      openKeys={openedSubMenus}
      onOpenChange={(value) => handleToogleSubMenu(value)}
      mode="inline"
      items={MENU_ITEMS}
    />
  );
};
