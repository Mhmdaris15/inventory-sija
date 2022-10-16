import React, { useState } from "react";
import { Form, Input, Button, Modal, Select, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import {ButtonGua} from "../Component/Button";

export const PengembalianBarang = observer(({ data }) => {
  console.log(data, 'sdadsadas')
  const store = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formPinjam] = Form.useForm();
  const { TextArea } = Input;
  const [isRusak, setType] = useState(false);
  const [isAlat, setAlat] = useState(true);

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
    message.success("Barang Dikembalikan");
    createPengembalian()
    setIsModalVisible(false);
  };

  const createPengembalian = async () => {
    setLoading(true);

    try {
      const input = await formPinjam.validateFields();
      // console.log(data.id, {isRusak,...input}, "ini cek ya");
      await store.uses.UpdateDetail(data.id, {isRusak,...input});
      formPinjam.resetFields();
      // await message.success("Success")
      setLoading(false)
    } catch (err) {
      // message.error("Fail");
      console.log({ err }, "Created Failed");
      setLoading(false);
    }
  };

    const onTypeChange = (value) => {
        if(value === "Normal") {
          formPinjam.setFieldsValue({jumlahPengembalianBaik: data.jumlahPenggunaan})
          setType(false)
        } else {
          formPinjam.setFieldsValue({jumlahPengembalianBaik: 0})
          setType(true)
        }
    };

    const OnChangeItems = (value)=>{
      if(value === "Alat"){
        setAlat(true);
      } else {
        setAlat(false);
      }
    };

  return (
    <>
      <ButtonGua onclick={showModal} loading={loading} icon={<EditOutlined />} title={"Pengembalian Barang"}/>
      <Modal title="Form Pengembalian Barang" width={650} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}> Batal </Button>,
          <Button loading={loading} key="submit" type="primary" onClick={onFinish}> Kirim</Button>,
        ]}
      >
        <Form {...layout} name="nest-messages" form={formPinjam} validateMessages={validateMessages}>
          <Form.Item label={"Tipe Barang"} name={"tipe"} rules={[{required: true}]}>
            <Select onChange={OnChangeItems} placeholder="Pilih Jenis Barang">
              <Select.Option value={"Alat"}>Alat</Select.Option>
              <Select.Option value={"Bahan"}>Bahan</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={isRusak ? "Jumlah Bagus" : "Jumlah Pengembalian"} name="jumlahPengembalianBaik">
            <Input placeholder={isRusak? "Masukkan Jumlah Bagus":"Masukkan Jumlah Pengembalian"} disabled={!isRusak && isAlat}/>
          </Form.Item>
          {isRusak &&
          <Form.Item initialValue={0} label="Jumlah Rusak" name='jumlahPengembalianRusak' rules={[{required: true}]}>
            <Input placeholder="Masukan Jumlah Rusak"/>
          </Form.Item> }
          <Form.Item label="Kondisi Akhir" name="kondisiAkhir" rules={[{required: true}]} >
            <Select onChange={onTypeChange} placeholder="Pilih Kondisi">
                <Select.Option value={"Normal"}>Kondisi Baik</Select.Option>
                <Select.Option value={"Rusak"}>Kondisi Rusak</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name={"keteranganPengguna"} initialValue={null} label="Keterangan">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});


const layout = { labelCol: {span: 8}, wrapperCol: {span: 16}};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: { email: "${label} is not a valid email!", number: "${label} is not a valid number!"},
  number: { range: "${label} must be between ${min} and ${max}"},
};
/* eslint-enable no-template-curly-in-string */
