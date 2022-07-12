import { Layout } from "antd";
import React from "react";
import { SidebarMenu } from "../SidebarMenu";
import "./index.scss";

const { Sider, Content } = Layout;

export const MainLayout = ({ children }) => {
  return (
    <Layout hasSider className="mainLayout">
      <Sider
        theme={"light"}
        width={"256px"}
        className="siderLayout"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <SidebarMenu />
      </Sider>

      <Layout className="layout">
        <Content className="contentLayout">{children}</Content>
      </Layout>
    </Layout>
  );
};
