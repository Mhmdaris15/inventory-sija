import {Button,PageHeader,Table} from "antd";
import {LINKS} from "../../routes";
import {useHistory, useParams} from "react-router-dom";
import {useStore} from "../../utils/useStore";
import {useEffect} from "react";
import { observer } from "mobx-react-lite";

export const DetailInfrastructure = observer(() => {
    const history = useHistory();
    const {id} = useParams();
    const {nama} = useParams();
    const store = useStore();

    useEffect(()=>{
        const init = async () => {
            try{
                store.infrastructure.id_infra = id
                await store.infrastructure.getDetail();
            } catch(e){
                console.log(e)
            }
        }
        init();
    }, [])

    const goBack = ()=>{history.push(LINKS.INFRASTRUCTURE)}

    const columns = [
            {
                title: 'No.',
                dataIndex: 'id',
                key: 'id',
                render: (data, record, index) => {
                    return index + 1 +'.'
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

        ];

    // const data = store.infrastrcuture.name
    return <div>
        <PageHeader style={{padding: 0,margin: 0,height: 40, backgroundColor: "transparent", marginBottom: "20px"}} title={`Detail Ruangan`}/>
            <Table columns={columns} dataSource={store.infrastructure.dataDetail}/>
        <div style={{display: "flex", justifyContent: "left",marginTop:"10px"}}>
            <Button onClick={goBack}>Kembali</Button>
        </div>
    </div>
});
