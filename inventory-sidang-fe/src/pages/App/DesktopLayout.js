import React, {useState} from "react";
import {Layout, Breadcrumb, Image, Popover, Menu, Button, Divider, message} from "antd";
import logo from "../../assets/image/logo_kampak.png"

import {MenuList} from "./MenuList";
import {AppRoute} from "../../routes/app";
import { useHistory,} from "react-router-dom";
import { LogoutOutlined} from "@ant-design/icons";
import {useStore} from "../../utils/useStore";
const { Header, Content, Footer, Sider } = Layout;

export const DesktopLayout = () => {
    const store = useStore();
    const history = useHistory()
    const [collapsed, setCollapse] = useState(false)
    const [clicked, setClicked] = useState(false);

    const onCollapse = () => {
        console.log(collapsed);
        setCollapse( !collapsed );
    };

    const Logout = async () =>{
        await store.authentication.logout();
        message.success("berhasil logout")
        history.replace("/login");
    }

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={200} collapsed={collapsed} onCollapse={onCollapse} style={{backgroundColor:"#f8f8f8"}} >
                    <div className="logo" style={{marginLeft: "15px", marginRight: "auto", marginTop: "20px"}} >
                        <Image preview={false} x src={logo}/>
                    </div>
                    <Divider/>
                    <MenuList/>
                </Sider>
                <Layout className="site-layout">
                    {/*<Header className="site-layout-background" style={{ padding: 0 }} />*/}
                    <Header
                      theme={"light"}
                      style={{
                      height: 54,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      backgroundColor:"#ffffff"
                            }}>
                        <div>
                              <Button
                                  size={"default"}
                                  style={{}}
                                  // onClick={() => {
                                  //     message.success("berhasil logout")
                                  // store.authentication.logout();
                                  // return history.push("/login");
                                  //   }}>
                                  onClick={Logout}>
                                    <LogoutOutlined style={{fontSize: "13px"}}/> Keluar
                              </Button>
                        </div>
                    </Header>
                    <Content style={{ margin: '50px 16px' }}>
                        {/*<h1>DESKTOP</h1>*/}
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                          <AppRoute/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Inventory</Footer>
                </Layout>
            </Layout>
        );
}

