import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Input,
  Layout,
  Modal,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { deleteCampaign } from "../../store/campaigns/campaignsSlice";
import { formatDate } from "../../utils/formatDate";
import CampaignView from "./ViewCampaigns";

const { confirm } = Modal;
const { Content } = Layout;

const Campaigns = () => {
  // Store
  const dispatch = useDispatch();
  const campaigns = useSelector((store) => store.campaigns.data);

  // State
  const [campaign, setCampaign] = useState({});
  const [dataSource, setDataSource] = useState(campaigns);
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (_, item, index) => <span>{index + 1}</span>,
    },
    {
      title: "Thread Name",
      dataIndex: "threadName",
      key: "threadName",
      render: (value, item) => (
        <>
          {item?.draft ? <Tag color="#f50">Draft </Tag> : null}
          {value}
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value) => <span>{formatDate(value)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Space size="middle">
          {item.draft ? (
            <Link to={`/campaign-edit/${item.id}`}>
              <Button type="primary">Edit</Button>
            </Link>
          ) : (
            <Button onClick={() => campaignView(item.id)} type="primary">
              View
            </Button>
          )}
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(item.id, item.threadName)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (e) => {
    const filteredData = campaigns.filter((entry) =>
      entry.threadName.includes(e.target.value)
    );
    setTimeout(() => {
      setDataSource(filteredData);
    }, 500);
  };

  const campaignView = (id) => {
    const viewData = campaigns.find((campaign) => campaign.id == id);
    setCampaign(viewData);
    setOpen(true);
  };

  const handleDelete = (id, name) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: `${name}`,
      onOk() {
        dispatch(deleteCampaign(id));
      },
    });
  };

  useEffect(() => {
    setDataSource(campaigns);
  }, [campaigns]);

  return (
    <>
      <Row>
        <Col offset={22} span={2}>
          <Link to="/new-thread">
            <Button style={{ margin: " 0 0 10px 0" }} type="primary">
              New Thread
            </Button>
          </Link>
        </Col>
      </Row>
      <Layout
        style={{
          padding: "20px",
          margin: "10px 20px",
        }}
      >
        <Content style={{ backgroundColor: "white", padding: "20px" }}>
          <Input
            placeholder="Search Name"
            style={{ width: "200px", float: "right", margin: "0 0 10px 0" }}
            onChange={(e) => handleSearch(e)}
          />
          <Table rowKey="id" columns={columns} dataSource={dataSource} />
        </Content>
      </Layout>
      <CampaignView
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        data={campaign}
      />
    </>
  );
};

export default Campaigns;
