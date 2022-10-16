import React, {useEffect} from "react";
import {Button, Card, List, PageHeader, Space, Tag} from "antd";
import { FormInfrastructure } from "./formInfra";
import { useStore } from "../../utils/useStore";
import { observer } from "mobx-react-lite";
import {LINKS} from "../../routes";
import {useHistory, useParams} from "react-router-dom";
import { EditPrasarana } from "./editPrasarana";

export const Infrastructure = observer(() => {
  const store = useStore();
  const history = useHistory();
  const {id: paramId} = useParams();
  const isAdmin = localStorage.getItem("role")

  useEffect(() => {
    const init = async () => {
      try {
        await store.infrastructure.getPrasarana();
      } catch (e) {
        console.log(e);
      }
    };

    init();
  }, []);

  const createPrasarana = async (values) => {
    try {
      const response = await store.infrastructure.create(values);
      await store.infrastructure.getPrasarana();
    } catch (err) {
      console.log({ err }, "Created Failed");
    }
  };

   const gotoDetail = (id, nama)=> { history.push(LINKS.DETAIL_INFRA.replace(":id", id, nama ))}

  return (
    <div>
      <PageHeader style={{padding: 0, margin: 0,height: 40,backgroundColor: "transparent"}} title={"Prasarana"}/>
      {isAdmin === "viewer" || " " &&
      <div style={{marginBottom: "20px",display: "flex",justifyContent: "flex-end"}}>
        <FormInfrastructure onCreate={createPrasarana} />
      </div>}
       <List grid={{ gutter: 12, xs: 1,sm: 1,md: 2,lg: 2,xl: 3,xxl: 5, }} dataSource={store.infrastructure.data}
            renderItem={(item) => (
                <List.Item>
                    <Card hoverable title={item.nama_ruang} style={{ width:300 }}
                        actions={[
                            <EditPrasarana data={item}/>,
                            <Button type={"link"} onClick={()=>gotoDetail(item.id, item.nama_ruang)}> Info Detail </Button>,
                        ]}>
                        status ruangan: <Space />
                        {item.status == "Dipakai" && (<Tag color={"green"}>{item.status}</Tag>)}
                        {item.status == "Tidak Dipakai" && (<Tag color={"volcano"}>{item.status}</Tag>)}
                        {item.status == "Perbaikan" && (<Tag color={"yellow"}>{item.status}</Tag>)}
                    </Card>
                </List.Item>
            )}/>
    </div>
  );
});
