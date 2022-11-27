import { WechatOutlined } from "@ant-design/icons";
import { Divider, List, Space, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
const { Title, Text } = Typography;

const SendingInfo = () => {
  const receivers = useSelector((state) => state.receivers);
  return (
    <>
      <Title level={5}>Sending info</Title>
      <Divider />

      <div className="sendingInfo">
        <WechatOutlined className="icon" />
        <h1>{receivers.smsCount}</h1>
        <p strong>Total email count</p>
      </div>
      <List size="small">
        <List.Item className="listItem">
          Customer count <span>{receivers.data?.length}</span>
        </List.Item>
        <List.Item className="listItem">
          Feedback balance <span>{receivers.feedbackBalance}</span>
        </List.Item>
      </List>
    </>
  );
};

export default SendingInfo;
