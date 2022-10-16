import React, { useState } from "react";
import { Form, Input, Button, Modal, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import {ButtonGua} from "../Component/Button";

export const FormInfrastructure = observer(({ onCreate }) => {
  const store = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formPrasarana] = Form.useForm();

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
    createPrasarana()
    setIsModalVisible(false);
  };

  const createPrasarana = async () => {
    setLoading(true);

    try {
      const input = await formPrasarana.validateFields();
      await onCreate(input);
      await store.infrastructure.getPrasarana();
      await message.success("berhasil menambah data");
      setIsModalVisible(false);
      formPrasarana.resetFields();
      setLoading(false)
    } catch (err) {
      console.log({ err }, "Created Failed");
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonGua onclick={showModal} loading={loading} icon={<PlusOutlined />} title={"Tambah Ruangan"}/>
      <Modal title="Form Tambah Ruangan" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}> Batal </Button>,
          <Button loading={loading} key="submit" type="primary" onClick={onFinish}> Kirim</Button>,
        ]}>
        <Form {...layout} name="nest-messages" form={formPrasarana} validateMessages={validateMessages}>
          <Form.Item name={"nama_ruang"} label="Nama Ruangan" rules={[{required: true}]}>
            <Input placeholder="isi nama ruangan" />
          </Form.Item>
          <Form.Item name={"status"} label="Status Ruangan" rules={[{required: true}]}>
            <Select placeholder="pilih kondisi ruangan saat ini">
              <Select.Option value={"Dipakai"}>Dipakai</Select.Option>
              <Select.Option value={"Tidak Dipakai"}> Tidak Dipakai</Select.Option>
              <Select.Option value={"Perbaikan"}>Perbaikan</Select.Option>
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
