import React, { useState } from "react";
import { Form, Input, Button, Modal, Select} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";

export const FormUSer = observer(({ onCreate }) => {
  const store = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formUser] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = () => {
    createUser()
    setIsModalVisible(false);
  };

  const createUser = async () => {
    setLoading(true);

    try {
      const input = await formUser.validateFields();
      await onCreate(input);
      await store.user.getUser();
      setIsModalVisible(false);
      formUser.resetFields();
      setLoading(false)
    } catch (err) {
      console.log({ err }, "Created Failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={showModal} loading={loading} >
        <PlusOutlined />Tambah User
      </Button>
      <Modal title="Form Tambah User" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
          <Button key="back" onClick={handleCancel}> Batal</Button>,
          <Button loading={loading} key="submit" type="primary" onClick={onFinish}> Kirim</Button>,
        ]}>
        <Form {...layout} name="nest-messages" form={formUser} validateMessages={validateMessages}>
          <Form.Item name={"username"} label="Nama User" rules={[{required: true}]}>
            <Input placeholder="masukan username" />
          </Form.Item>
          <Form.Item name={"password"} label="password" rules={[{required: true}]}>
            <Input placeholder="masukan password" />
          </Form.Item>
          <Form.Item name={"role"} label="Roles" rules={[{required: true}]}>
            <Select placeholder="pilih roles">
              <Select.Option value={"admin"}>Admin</Select.Option>
              <Select.Option value={"viewer"}>Viewer</Select.Option>
              <Select.Option value={"manager"}>Manager</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

const layout = {labelCol: {span: 8},wrapperCol: {span: 16}};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
