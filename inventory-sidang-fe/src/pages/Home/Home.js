import React, {useEffect} from "react";
import {Card, PageHeader, Col, Row } from "antd";
import {store} from "../../utils/useStore";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import { LINKS } from "../../routes";
import {faBuilding, faExchangeAlt, faTools} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Home = observer(() => {
    useEffect(()=>{
        const init = async () =>{await store.dashboard.getAllData()}
        init();
    },[])

    const Welcome = props =>{
        return <h1>Welcome, {`${props.name}`}</h1>
    }

    const data = store.dashboard.data
  return <>
        <div>
            <PageHeader style={{padding: 0,margin: 0, height: 40, backgroundColor: "transparent"}} title={"Beranda"}/>
            <Welcome name={'to Inventory App'}/>
            <div className="site-card-wrapper">
                <Row gutter={48}>
                <Col span={8}>
                  <Link to={LINKS.INFRASTRUCTURE}>
                  <Card title="Prasarana" bordered={false} hoverable>
                    <Row justify={"space-between"}>
                      <Col style={{fontSize: 38}} span={4}>
                          <FontAwesomeIcon icon={faBuilding} />
                      </Col>
                      <Col span={20} style={{ textAlign: "right" }}>
                        <span className="h2 m-0" style={{ fontSize: "1.7rem" }}>
                            {data.jumlahPrasarana}
                        </span>
                      </Col>
                    </Row>
                  </Card>
                </Link>
                </Col>
                <Col span={8}>
                  <Link to={LINKS.FACILITIES}>
                  <Card title="Sarana" bordered={false} hoverable>
                    <Row justify={"space-between"}>
                      <Col style={{fontSize: 38}} span={4}>
                          <FontAwesomeIcon icon={faTools}/>
                      </Col>
                      <Col span={20} style={{ textAlign: "right" }}>
                        <span className="h2 m-0" style={{ fontSize: "1.7rem" }}>
                          {data.jumlahMerek}
                        </span>
                      </Col>
                    </Row>
                  </Card>
                </Link>
                </Col>
                <Col span={8}>
                  <Link to={LINKS.ALOCATION}>
                  <Card title="Penggunaan" bordered={false} hoverable>
                    <Row justify={"space-between"}>
                      <Col style={{fontSize: 38}} span={4}>
                          <FontAwesomeIcon icon={faExchangeAlt}/>
                      </Col>
                      <Col span={20} style={{ textAlign: "right" }}>
                        <span className="h2 m-0" style={{ fontSize: "1.7rem" }}>
                            {data.jumlahPenggunaan}
                        </span>
                      </Col>
                    </Row>
                  </Card>
                </Link>
                </Col>
                </Row>
            </div>
      </div>
  </>
});
