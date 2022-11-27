import React from "react";
import { Descriptions, List, Modal } from "antd";
import { formatDate } from "../../utils/formatDate";

const CampaignView = ({ open, onCancel, data }) => {
  const { threadName, date, to } = data;
  return (
    <div>
      <Modal width={1000} open={open} onCancel={onCancel} footer={null}>
        <Descriptions title="Campaign view" layout="vertical">
          <Descriptions.Item label="Thread Name">
            {threadName}
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            <span>{date && formatDate(date)}</span>
          </Descriptions.Item>
          <Descriptions.Item label="To">
            <List dataSource={to} renderItem={(item) => <div>{item}</div>} />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default CampaignView;
