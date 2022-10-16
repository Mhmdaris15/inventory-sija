import React, {useEffect, useState} from "react";
import {Form, Input, Button, Modal, Select, message, InputNumber} from "antd";
import {EditOutlined} from "@ant-design/icons";
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";

export const EditSarana = observer(({ data }) => {
  const store = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formDetail] = Form.useForm();
  const {facilities: facilitiesStore} = useStore();
  useEffect(()=>{
      const init = async () =>{
          await  formDetail.setFieldsValue({
              nama_sarana: data.nama_sarana,
              tipe: data.tipe,
              kondisi_layak_pakai: data.kondisi_layak_pakai,
              kondisi_rusak: data.kondisi_rusak,
              keterangan: data.keterangan,
              satuan: data.satuan,
              PrasaranaId : data.Prasarana.nama_ruang
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

  const updateSarana = async () => {
    setLoading(true);
    try {
      const input = await formDetail.validateFields();
      await facilitiesStore.UpdateDetail(data.id, input);
      message.success("berhasil memperbarui data");
      setIsModalVisible(false);
      setLoading(false)
    } catch (err) {
      console.log({ err }, "Created Failed");
      setLoading(false);
    }
  };

    return (
        <>
            <Button onClick={showModal} loading={loading}>
                <EditOutlined style={{fontSize: 18}}/>
            </Button>
            <Modal title="Form Edit Alat" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}> Batal</Button>,
                <Button loading={loading} key="submit" type="primary" onClick={updateSarana}> Kirim </Button>
            ]}>
                <Form {...layout} name="nest-messages" validateMessages={validateMessages} form={formDetail}>
                    <Form.Item name={'nama_sarana'} label="Nama Sarana" >
                        <Input placeholder="isi nama barang" disabled/>
                    </Form.Item>
                    <Form.Item name={'tipe'} label="Tipe Barang" >
                        <Select placeholder="pilih Tipe" disabled>
                            <Select.Option value={"Alat"}> Alat </Select.Option>
                            <Select.Option value={"Bahan"}> Bahan </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'kondisi_layak_pakai'} label="Kondisi Bagus" >
                        <InputNumber style={{width:'100%'}} placeholder="isi jumlah barang"/>
                    </Form.Item>
                    <Form.Item name={'kondisi_rusak'} label="Kondisi Rusak" >
                        <InputNumber style={{width:'100%'}} placeholder="isi jumlah barang"/>
                    </Form.Item>
                    <Form.Item name={'keterangan'} label="Keterangan">
                        <Input.TextArea disabled placeholder='masukan keterangan'/>
                    </Form.Item>
                    <Form.Item name={'satuan'} label="Satuan Barang" >
                        <Select disabled placeholder="pilih Tipe">
                            <Select.Option value={"pcs"}> pcs </Select.Option>
                            <Select.Option value={"roll"}> roll </Select.Option>
                            <Select.Option value={"unit"}> unit</Select.Option>
                            <Select.Option value={"pack"}> pack </Select.Option>
                            <Select.Option value={"roll"}> roll </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'PrasaranaId'} label={"Ruangan"} >
                        <Select disabled placeholder="pilih Ruangan">
                            {store.infrastructure.data.map(it => {
                                return <Select.Option value={it.id} key={it.id}> {it.nama_ruang}</Select.Option>
                            })}
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
