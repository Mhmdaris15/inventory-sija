import React, {useEffect, useState} from "react";
import { Form, Input, Button, Modal, Select, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import {ButtonGua} from "../Component/Button";

export const EditPrasarana = observer(({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formPrasarana] = Form.useForm();
  const {infrastructure: infrastructureStore} = useStore()
  const isAdmin = localStorage.getItem('role')

  useEffect(()=>{
    const init = async () =>{
      await infrastructureStore.getPrasarana()
      await console.log(infrastructureStore.data , "siap")
      await formPrasarana.setFieldsValue({
        nama_ruang: data.nama_ruang,
        status: data.status
      })
    }
    init();
  },[])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const updatePrasarana = async () => {
    setLoading(true);
    try {
      const input = await formPrasarana.validateFields();
      await infrastructureStore.UpdateDetail(data.id, input)
      message.success("berhasil menambah data");
      setIsModalVisible(false);
      setLoading(false)
    } catch (err) {
      console.log({ err }, "Created Failed");
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonGua disabled={isAdmin === "viewer" || null ? true : false} onclick={showModal} loading={loading} icon={<EditOutlined style={{fontSize: 18}}/>} type={"link"}/>
      <Modal title="Form Edit Ruangan" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}> Batal </Button>,
          <Button loading={loading} key="submit" type="primary" onClick={updatePrasarana}> Kirim </Button>,
        ]}>
        <Form {...layout} name="nest-messages" form={formPrasarana} validateMessages={validateMessages}>
          <Form.Item name={"nama_ruang"}  label="Nama Ruangan">
            <Input disabled placeholder="isi nama ruangan" />
          </Form.Item>
          <Form.Item name={"status"} label="Status Ruangan">
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


const layout = {labelCol: { span: 8},wrapperCol: {span: 16}};
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
