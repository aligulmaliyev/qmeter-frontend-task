import { Col, Layout, Row } from "antd";
import React from "react";
import SendingInfo from "./components/SendingInfo";
import ThreadForm from "./components/ThreadForm";
const { Sider, Content } = Layout;

const Threads = () => {
  return (
    <Layout
      style={{
        padding: "20px",
        margin: "20px",
      }}
    >
      <Content style={{ backgroundColor: "white", padding: "0 0px 20px 20px" }}>
        <ThreadForm />
      </Content>
      <Sider style={{ backgroundColor: "white" }}>
        <SendingInfo />
      </Sider>
    </Layout>
  );
};

export default Threads;
