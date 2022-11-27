import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { ExclamationCircleFilled, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { validateEmail } from "../../../utils/validateEmail";
import {
  createCampaign,
  editCampaign,
} from "../../../store/campaigns/campaignsSlice";
import {
  createReceivers,
  postSmsBalance,
} from "../../../store/treads/treadsSlice";

const { Option, OptGroup } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const { confirm } = Modal;

const ThreadForm = () => {
  //Store
  const campaigns = useSelector((state) => state.campaigns.data);
  const receivers = useSelector((state) => state.receivers);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  // Form
  const [form] = Form.useForm();
  const threadName = Form.useWatch("threadName", form);
  const to = Form.useWatch("to", form);
  const date = Form.useWatch("date", form);
  const content = Form.useWatch("content", form);

  //State
  const [receiversEmail, setReceiversEmail] = useState("");
  const [uid, setUid] = useState(Math.ceil(Math.random() * 100));

  const handleSubmit = () => {
    const requestModel = {
      id: uid,
      threadName,
      to,
      date,
      content,
    };
    confirm({
      title: "Do you Want to add these items?",
      icon: <ExclamationCircleFilled />,
      content: `${threadName}`,
      onOk() {
        if (id) {
          requestModel.id = Number(id);
          dispatch(editCampaign(requestModel));
        } else {
          dispatch(createCampaign(requestModel));
        }
        setTimeout(() => {
          navigate("/campaigns");
        }, 1000);
      },
    });
  };

  const addReceivers = (e) => {
    e.preventDefault();
    if (
      validateEmail(receiversEmail) !== null &&
      !receivers.data.includes(receiversEmail)
    ) {
      dispatch(createReceivers(receiversEmail));
    } else {
      console.log("Email not valid");
    }
    setReceiversEmail("");
  };

  const selectAllRecipients = () => {
    form.setFieldValue("to", [...receivers.data, "test@test.com"]);
  };

  useEffect(() => {
    return () => {
      if (threadName && to && date) {
        const draftRequestModel = {
          id: uid,
          threadName,
          to,
          date,
          content: content,
          draft: true,
        };
        if (id) {
          draftRequestModel.id = Number(id);
        }
        dispatch(createCampaign(draftRequestModel));
      }
    };
  });

  useEffect(() => {
    if (id) {
      const values = campaigns?.find((item) => item.id === Number(id));
      console.log(values);
      const { threadName, to, date, content } = values;
      form.setFieldValue("threadName", threadName);
      form.setFieldValue("to", to);
      form.setFieldValue("date", date);
      form.setFieldValue("content", content);
    }
  }, [id]);

  useEffect(() => {
    selectAllRecipients();
  }, [receivers.data]);

  return (
    <>
      <Title level={5}>Mail thread</Title>
      <Divider />
      <Form
        form={form}
        name="basic"
        onFinish={handleSubmit}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        autoComplete="off"
      >
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label="Thread Name"
              name="threadName"
              rules={[
                {
                  required: true,
                  message: "Please input your Thread Name!",
                },
              ]}
            >
              <Input placeholder="Enter thread name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Template" name="template">
              <Select
                placeholder="Enter feedback template"
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="From" name="from">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="To"
              name="to"
              rules={[
                {
                  required: true,
                  message: "Please input your to!",
                },
              ]}
            >
              <Select
                placeholder="Add recipients"
                dropdownRender={(menu) => (
                  <>
                    <Button type="text" onClick={() => selectAllRecipients()}>
                      Choose all
                    </Button>
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        name="receiversEmail"
                        placeholder="Please enter email"
                        value={receiversEmail}
                        onChange={(e) => setReceiversEmail(e.target.value)}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addReceivers}
                      >
                        Add email
                      </Button>
                    </Space>
                  </>
                )}
                mode="tags"
              >
                <OptGroup label="Customer">
                  <Option value="test@test.com">
                    Mesti: Qmeter: test@test.com
                  </Option>
                </OptGroup>
                <OptGroup label="Receivers">
                  {receivers.data.map((receiver) => (
                    <Option key={receiver} value={receiver}>
                      Not Customer: {receiver}
                    </Option>
                  ))}
                </OptGroup>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="If Customer name is empty" name="customerName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Start sending"
              name="date"
              rules={[
                {
                  required: true,
                  message: "Please input your date!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                showTime
                placement="bottomLeft"
                placeholder="Select date"
                format={"MMMM-DD-YYYY"}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Content" name="content">
              <TextArea
                rows={4}
                placeholder="maxLength is 500"
                onChange={(e) =>
                  dispatch(postSmsBalance(e.target.value.length))
                }
                maxLength={500}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default ThreadForm;
