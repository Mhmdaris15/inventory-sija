import React, { useEffect, useState } from 'react';
import {Form, Input, Button, Modal, message, Select, InputNumber} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import {useStore} from "../../utils/useStore";

export const FormFacilities = observer(({onCreate}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading]= useState(false)
    const [formSarana] = Form.useForm();
    const store = useStore();

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
        createSarana()
        setIsModalVisible(false)
    };

    const createSarana = async() =>{
        setLoading(true);

        try {
            const input = await formSarana.validateFields();
            await onCreate(input);
            await store.brand.getAllData();
            await message.success("berhasil menambahkan data")
            setIsModalVisible(false);
            setLoading(false);
        } catch(e){
            setLoading(false);
            throw e
        }
    }

    return (
        <>
            <Button onClick={showModal} loading={loading}><PlusOutlined/> Tambah Alat</Button>
            <Modal title="Form Tambah Alat" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}> Batal</Button>,
                <Button loading={loading} key="submit" type="primary" onClick={onFinish}> Kirim </Button>
            ]}>
                <Form {...layout} name="nest-messages" validateMessages={validateMessages} form={formSarana}>
                    <Form.Item name={'nama_merek'} label="Nama Barang" rules={[{required: true}]}>
                        <Input placeholder="Isi Nama Barang"/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});

export const FormDetailFacilities = observer(({onCreate}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading]= useState(false)
    const [formDetailSarana] = Form.useForm();
    const store = useStore();

    useEffect( ()=>{
        const init= async()=>{
            await store.infrastructure.getPrasarana()
            await store.brand.getAllData()
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
        formDetailSarana.resetFields();
    };

    const onFinish = () => {
        createDetailSarana()
        setIsModalVisible(false)
    };

    const createDetailSarana = async() =>{
        setLoading(true);

        try {
            const input = await formDetailSarana.validateFields();
            await onCreate(input);
            await store.brand.getAllData();
            await message.success("berhasil menambahkan data")
            setIsModalVisible(false);
            setLoading(false);
        } catch(e){
            setLoading(false);
            console.log(e, "ini error")
            throw e
        }
    }

    return (
        <>
            <Button onClick={showModal} loading={loading}>
                <PlusOutlined/> Tambah Jumlah
            </Button>
            <Modal title="Form Tambah Alat" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}> Batal </Button>,
                <Button loading={loading} key="submit" type="primary" onClick={onFinish}> Kirim </Button>
            ]}>
                <Form {...layout} name="nest-messages" validateMessages={validateMessages} form={formDetailSarana}>
                    <Form.Item name={'nama_sarana'} label="Nama Sarana" rules={[{ required: true,disable: true }]}>
                        <Input placeholder="isi nama barang"/>
                    </Form.Item>
                    <Form.Item name={'tipe'} label="Tipe Barang" rules={[{ required: true}]}>
                        <Select placeholder="pilih Tipe">
                            <Select.Option value={"Alat"}> Alat </Select.Option>
                            <Select.Option value={"Bahan"}> Bahan </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'kondisi_layak_pakai'} label="Kondisi Bagus" rules={[{required: true}]}>
                        <InputNumber style={{width:'100%'}} placeholder="isi jumlah barang"/>
                    </Form.Item>
                    <Form.Item name={'kondisi_rusak'} label="Kondisi Rusak">
                        <InputNumber style={{width:'100%'}} placeholder="isi jumlah barang"/>
                    </Form.Item>
                    <Form.Item name={'keterangan'} label="Keterangan">
                        <Input.TextArea placeholder='masukan keterangan'/>
                    </Form.Item>
                    <Form.Item name={'satuan'} label="Satuan Barang" rules={[{required: true}]}>
                        <Select placeholder="pilih Tipe">
                            <Select.Option value={"pcs"}> pcs</Select.Option>
                            <Select.Option value={"roll"}> roll</Select.Option>
                            <Select.Option value={"unit"}> unit</Select.Option>
                            <Select.Option value={"pack"}> pack </Select.Option>
                            <Select.Option value={"roll"}> roll </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={'PrasaranaId'} label={"Ruangan"} rules={[{ required: true }]}>
                        <Select placeholder="pilih Ruangan">
                            {store.infrastructure.data.map(it => {return <Select.Option value={it.id} key={it.id}> {it.nama_ruang}</Select.Option>})}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
});



const layout = {labelCol: {span: 8}, wrapperCol: {span: 16}};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */
