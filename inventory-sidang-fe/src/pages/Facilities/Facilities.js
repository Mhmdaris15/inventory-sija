import React, {useEffect, useState} from "react";
import {Button, Card, List, PageHeader} from "antd";
import {FormFacilities} from "./formFacilities";
import {observer} from "mobx-react-lite";
import {useStore} from "../../utils/useStore";
import {useHistory} from "react-router-dom";
import {LINKS} from "../../routes";


export const Facilities = observer(() => {
    const {Meta} = Card
    const store = useStore()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const isAdmin = localStorage.getItem("role")

    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);
                // await store.facilities.getAllData();
                await store.brand.getAllData()
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        };

        init();
    }, []);

    const gotoDetail = (id)=>{
        history.push(LINKS.DETAIL_TOOLS.replace(":id", id))
    }

    const createSarana = async(values) =>{
        try{
            const response = await store.brand.create(values);
            await store.brand.getAllData();
        }catch(e){
            console.log({e}, "create failed")
        }
    }

    const data = store.brand.data;

    return <>
        <div>
        <PageHeader style={{padding: 0,margin: 0,height: 40,backgroundColor: "transparent"}} title={"Sarana"}/>
        {isAdmin === "viewer" || " " && <div style={{marginBottom:'20px', display:"flex", justifyContent:'flex-end'}}>
            <FormFacilities onCreate={createSarana}/>
        </div>}
            <List grid={{ gutter: 16, md: 1,lg: 2,xl: 3,xxl: 5, }} dataSource={data} renderItem={item => (
                    <List.Item>
                        <Card hoverable style={{width: (300)}} actions={[<Button type={"link"} onClick={()=>gotoDetail(item.id)}> Info Detail </Button> ]}>
                            <Meta title={`${item.nama_merek}`}/>
                        </Card>
                    </List.Item>
                )}/>
        </div>
    </>
});
