import React, {useEffect, useState} from "react";
import { useStepsForm } from 'sunflower-antd';
import {Form, Input, Button, Modal, Select, Steps, InputNumber} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import {ButtonGua} from "../Component/Button";


export const  StepPeminjaman = observer(({ onCreate }) => {
  const store = useStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Sarana, setSarana] = useState([])
  const [prasarana, setPrasarana] = useState(null)
  const [max, setMax] = useState(1)
  const style = {textAlign: "end"}

  const { TextArea } = Input;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields()
  };

  useEffect(()=>{
    const init = async()=>{await store.infrastructure.getPrasarana()}
    init()
  },[])


  const { Step } = Steps;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const {form,current,gotoStep,stepsProps,formProps,submit,formLoading,} = useStepsForm({
    async submit(values) {
      const { prasarana, SaranaId, namaPengguna, jumlahPenggunaan, kondisiAwal, keteranganPengguna } = values;
      // console.log(prasarana, SaranaId, namaPengguna, jumlahPenggunaan, kondisiAwal, keteranganPengguna, 'bruhhhhhsss');
      if(jumlahPenggunaan == 0){
        return Modal.error({
          title:"barang habis",
          content:"coba pinjem dari ruang lain"
        })
      }else{
        await store.uses.create(values);
        await setIsModalVisible(false);
        await window.location.reload(true);
      }
      await form.resetFields();
      await setMax(1);
      await setSarana([]);
      await gotoStep(0)
      // await new Promise(r => setTimeout(r, 1000));
      return 'ok';
    },
    total: 3,
  });

  const formList = [
    <>
      <Form.Item name="prasarana" label="Prasarana">
        <Select onSelect={(value)=>{ let data = store.infrastructure.data.filter(it => it.id == value)
           setSarana(data[0].Saranas)
           setPrasarana(value)
        }} placeholder="Pilih Prasarana">
        {store.infrastructure.data.map(it => {  return <Select.Option value={it.id} key={it.id}> {it.nama_ruang}</Select.Option> })}
      </Select>
      </Form.Item>

      <Form.Item style={style} {...tailLayout}>
        <Button type="primary" onClick={() => {
          if(!prasarana){
            Modal.warning({ title: 'Warning!', content: 'Mohon pilih ruangan asal sarana',});
            return
          } gotoStep(current + 1)}}>
          Lanjut
        </Button>
      </Form.Item>
    </>,

    <>
      <Form.Item name={"SaranaId"} label="Sarana">
        <Select onSelect={( value) => { let data = Sarana.filter(it => it.id == value)
          setMax(data[0].kondisi_layak_pakai)}} placeholder="Pilih Sarana">
          {Sarana.map(data =>{ return<Select.Option value={data.id} key={data.id}>{data.nama_sarana}</Select.Option>})}
        </Select>
      </Form.Item>

      <Form.Item label="Jumlah Penggunaan" name="jumlahPenggunaan">
        <InputNumber min={1} max={max - 1} style={{width:"100%"}} placeholder="Masukan Jumlah"/>
      </Form.Item>

      <Form.Item label="Kondisi Awal" name="kondisiAwal" initialValue={"Semua Bagus"}>
        <Input placeholder={"Semua Baik "} disabled />
      </Form.Item>

      <Form.Item style={style} {...tailLayout}>
        <Button style={{margin: "0px 10px"}} onClick={() => gotoStep(current - 1)}>Kembali</Button>
        <Button type="primary" onClick={() => gotoStep(current + 1)}>Lanjut</Button>
      </Form.Item>
    </>,

    <>
      <Form.Item label="Nama Pengguna" name="namaPengguna">
        <Input placeholder="Masukan Nama Pengguna"/>
      </Form.Item>

      <Form.Item label="Keterangan" name="keteranganPengguna">
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item style={style} {...tailLayout}>
        <Button style={{margin: "0px 10px"}} onClick={() => gotoStep(current - 1)}>Kembali</Button>
        <Button
            loading={loading}
            key="submit"
            type="primary"
            onClick={() => {submit().then(res => console.log(res))} }>
          Kirim
        </Button>
      </Form.Item>
    </>,
  ];

  return (
      <>
        <ButtonGua onclick={showModal} loading={loading} icon={<PlusOutlined />} title={"Buat Peminjaman"}/>
        <Modal  title="Form Peminjaman" width={800} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[ null]}>
          <div>
            <Steps {...stepsProps}>
              <Step title="Langkah 1" />
              <Step title="Langkah 2" />
              <Step title="Langkah 3" />
            </Steps>
            <div style={{ marginTop: 60 }}>
              <Form {...layout} {...formProps} style={{ maxWidth: 600 }}>
                {formList[current]}
              </Form>
            </div>
          </div>
        </Modal>
      </>
  );
});

