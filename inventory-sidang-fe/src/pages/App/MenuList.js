import React, {useEffect, useState} from "react";
import {Menu, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useStore} from "../../utils/useStore";
import {faBuilding, faExchangeAlt, faHome, faTools, faUser} from "@fortawesome/free-solid-svg-icons";
import { LINKS } from "../../routes";



const {SubMenu} = Menu;

export const MenuList = observer((props) => {
	const [setKeys, setSetKeys] = useState([]);
	const isAdmin = localStorage.getItem("role")
	return (
	<Menu theme="light"
		  mode="inline"
		  selectedKeys={setKeys}
		  onSelect={()=>{
			  setSetKeys()
		  }}
		  style={{
			borderRightWidth: 0,
			fontWeight: 400,
			fontSize: 18
		  }}>
		<Menu.Item key="1" >
			<Link to={"/app/home"}><FontAwesomeIcon icon={faHome}/> Beranda</Link>
		</Menu.Item>
		<Menu.Item key="3" >
			<Link to={LINKS.INFRASTRUCTURE}><FontAwesomeIcon icon={faBuilding} /> Prasarana</Link>
		</Menu.Item>
		<Menu.Item key="2" >
			<Link to={LINKS.FACILITIES}><FontAwesomeIcon icon={faTools}/> Sarana</Link>
		</Menu.Item>
		<Menu.Item key="4">
				<Link to={LINKS.ALOCATION}><FontAwesomeIcon icon={faExchangeAlt}/> Penggunaan</Link>
		</Menu.Item>
		{isAdmin !== "admin" || " " && <Menu.Item key="5">
			<Link to={LINKS.USER}><FontAwesomeIcon icon={faUser}/> Pengelola User</Link>
		</Menu.Item>}
	</Menu>
);
});
