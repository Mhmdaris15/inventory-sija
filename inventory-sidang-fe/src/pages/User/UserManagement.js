import {PageHeader, Table, Button, Modal} from "antd";
import {useEffect, useState} from "react";
import {useStore} from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import { FormUSer } from "./formUser";
import {DeleteOutlined} from '@ant-design/icons';

export const UserManagement = observer(() => {
    const [newData, setNewData] = useState([]);
    const columns = [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
            render: (data, record, index) => {
                return <div>{index + 1 + '.'}</div>
            }
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Roles',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title:"Action",
            dataIndex:"",
            render: (data, record, index) => <Button danger onClick={() => modalDel(record)}><DeleteOutlined /></Button>
        },

    ];
    const store = useStore();

    useEffect(()=>{
        const init = async () => {
          try{
             await store.user.getUser();
             setNewData(store.user.data);
          } catch(e){
               console.log(e)
          }
        }
        init();
    }, [])

    const modalDel = (data) =>{
        Modal.confirm({
                title: `Yakin ingin menghapus User ${data.username} ?`,
                content:"",
                onOk(){
                    deleteUser(data.id)
                    console.log("Delete")
                },
                onCancel(){
                    console.log("Cancel")
                }
            }
        )
    }

    const createUser = async (values) => {
        try {
          const response = await store.user.create(values);
          await store.user.getUser();
        } catch (err) {
          console.log({ err }, "Created Failed");
        }
      };

    const deleteUser = async (id) =>{
        try{
            await store.user.delete(id);
            console.log("ni berhasil")
        } catch(err){
            console.log({err}, "Failed to Delete")
        }
    }
    return <div>
        <PageHeader style={{ padding: 0, margin: 0, height: 40,backgroundColor: "transparent"}} title={"Pengelolaan Pengguna"}/>
        <div style={{marginBottom:'20px', display:"flex", justifyContent:'flex-end'}}>
            <FormUSer onCreate={createUser}/>
        </div>
        <Table columns={columns} dataSource={newData}/>
    </div>
});
