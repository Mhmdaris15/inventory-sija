import {PageHeader, Space, Table, Tag} from "antd";
import { StepPeminjaman } from "./stepPeminjaman";
import { PengembalianBarang } from "./editPeminjaman";
import {useEffect, useState} from "react";
import {useStore} from "../../utils/useStore";
import {observer} from "mobx-react-lite";
import { format } from 'date-fns'

export const Alocation = observer(() => {
    const [loading, setLoading] = useState(false);
    const store = useStore();
    const isAdmin = localStorage.getItem("role");
    useEffect(()=>{
        const init = async()=>{
            try{
                setLoading(true);
                await store.uses.getAllData()
            } catch(e){
                console.log(e);
            }
        }
        init()
    },[])

    const data = store.uses.data
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            fixed: "left",
            key: 'no',
            width:"80px",
            render: (text, record, index) =>
                <div>{index + 1 + "."}</div>,
        },
        {
            title: 'Nama Pengguna',
            dataIndex: 'namaPengguna',
            key: 'name',
            fixed: "left",
            render: text => <div>{text}</div>,
        },
        {
            title: 'Nama Barang',
            dataIndex: 'Sarana',
            key: 'name',
            render: (text, record, index) => <div>{record.Sarana?.nama_sarana}</div>,
        },
        {
            title: 'Ruangan',
            dataIndex: 'Prasarana',
            key: 'name',
            render: (text, record, index) => <div>{record.Sarana?.Prasarana.nama_ruang}</div>,
        },
        {
            title: "Tanggal",
            children: [
                {
                    title: 'Penggunaan',
                    dataIndex: 'tanggalPenggunaan',
                    key: 'tanggalPenggunaan',
                    render: text => <div>{format(new Date(text), 'dd MMM yyyy')}</div>,
                },
                {
                    title: 'Kembali',
                    dataIndex: 'tanggalPengembalian',
                    key: 'tanggalPengembalian',
                    render: text => <div>{text === null ? "-" : format(new Date(text), 'dd MMM yyyy')}</div>,
                },
            ]
        },
        {
            title: "Kondisi",
            children: [
                {
                    title: 'Awal',
                    dataIndex: 'kondisiAwal',
                    key: 'name',
                    render: text => <div>{text}</div>,
                },
                {
                    title: 'Akhir',
                    dataIndex: 'kondisiAkhir',
                    key: 'total',
                    render: text => <div>{text === "Rusak" ? "Sebagian Rusak" : "-"}</div>
                },
            ]
        },
        {
            title: "Jumlah",
            children: [

                    {
                        title: 'Penggunaan',
                        dataIndex: 'jumlahPenggunaan',
                        key: 'total',
                        render: (text, record) =>(
                            <div>{record.jumlahPenggunaan }</div>
                        )
                    },
                    {
                        title: 'Baik',
                        dataIndex: 'jumlahPengembalianBaik',
                        key: 'total',
                        render: (text, record) =>(
                            <div>{record.jumlahPengembalianBaik }</div>
                        )
                    },
                    {
                        title: 'Rusak',
                        dataIndex: 'jumlahPengembalianRusak',
                        key: 'total',
                        render: (text, record) =>(
                            <div>{(record.jumlahPengembalianRusak) ? record.jumlahPengembalianRusak : 0  }</div>
                        )
                    },
            ]
        },
        {
            title: 'Status',
            key: 'statusPenggunaan',
            dataIndex: 'statusPenggunaan',
            render: text => (
                <Tag color={ text === 'sedang digunakan' ? 'volcano' : 'green'}>
                    {/*{console.log(text, "ini text")}*/}
                    {text === 'sedang digunakan' ? 'Sedang Digunakan' : 'Sudah di kembalikan'}
                </Tag>
            ),
        },
        {
            title: 'Keterangan',
            dataIndex: 'keteranganPengguna',
            key: 'keteranganPengguna',
            render: (text, record) => (
                 text
            ),
        },
        {
            title: 'Aksi',
            key: 'action',
            fixed: "right",
            render: (text, record) => (
                <Space size="middle">
                    { isAdmin !== "viewer"&& record.statusPenggunaan ==="sedang digunakan" ? <PengembalianBarang data={record}/> : null}
                </Space>
            ),
        },
    ];

    return <div>
        <PageHeader style={{ padding: 0, margin: 0, height: 40,backgroundColor: "transparent",}} title={"Penggunaan"}>
        </PageHeader>
        {isAdmin !== "viewer" && <div style={{marginBottom:'20px', display:"flex", justifyContent:'flex-end'}}>
            <StepPeminjaman />
        </div>}
        <Table columns={columns} dataSource={data} scroll={{ x: 2000 }}/>
    </div>
});
