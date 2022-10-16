import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import {LINKS} from "../../routes";
import {Button, PageHeader, Space, Table} from "antd";
import {useStore} from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import { FormDetailFacilities } from "./formFacilities";
import {EditSarana} from "./editSarana";

export const DetailFacilities = observer(() => {
    const isAdmin = localStorage.getItem("role");
    const {id} = useParams();
    const store = useStore();
    const history = useHistory();
    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            render: (data, record, index) => {
                return index + 1 + '.'
            }
        },
        {
            title: 'Lokasi Saat ini',
            dataIndex: 'Prasarana',
            key: 'nama_ruang',
            render: data => {
                let nama = data.nama_ruang
                return nama
            }
        },
        {
            title: 'Nama Sarana',
            dataIndex: 'nama_sarana',
            key: 'nama_sarana',
            render: data => {
                return data
            }
        },
        {
            title: 'Kondisi Baik',
            dataIndex: 'kondisi_layak_pakai',
            key: 'kondisi_rusak',
            render: data => {
                return data
            }
        },
        {
            title: 'Kondisi Rusak',
            dataIndex: 'kondisi_rusak',
            key: 'kondisi_rusak',
            render: data => {
                return data
            }
        },
        {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'keterangan',
            render: data => {
                return data
            }
        },
        {
            title: 'Satuan',
            dataIndex: 'satuan',
            key: 'satuan',
            render: data => {
                return data
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                console.log(record, 'ini recores')
                if(isAdmin === 'viewer' || null){
                    return null
                } else {
                  return <Space size="middle">
                     <EditSarana data={record}/>
                  </Space>
                }
            },
        },
    ];
    const goBack = ()=>{
        history.push(LINKS.FACILITIES)
    }
    useEffect(()=>{
        const init = async () => {
            try{
                store.brand.id_brand = id
                await store.brand.getDetail();
                await store.brand.getName();
                await store.infrastructure.getPrasarana();
                // setNewData(store.brand.detailData);
                // console.log(store.infrastructure.data, "check ini")
            } catch(e){
                console.log(e)
            }
        }
        init();
    }, [])

    const data = store.brand.name
    const createDetailSarana = async (values) => {
        try {
            const input = {MerekId: parseInt(id),...values}
            const response = await store.facilities.create(input);
            await store.facilites.getAllData();
        } catch (err) {
            console.log({ err }, "Created Failed");
        }
    };

    return <div>
        <PageHeader style={{padding: 0,margin: 0,height: 40,backgroundColor: "transparent"}} title={` Detail ${data}`}/>
       {isAdmin === "viewer" || " " &&
        <div style={{marginBottom:'20px', display:"flex", justifyContent:'flex-end'}}>
            <FormDetailFacilities onCreate={createDetailSarana} infrastructure={store.infrastructure.data}/>
        </div>}
        <Table columns={columns} dataSource={store.brand.dataDetail}/>
        <div style={{display: "flex", justifyContent: "left", marginTop:"20px"}}>
            <Button onClick={goBack}>Kembali</Button>
        </div>
    </div>
});
