import {PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";
import React from "react";

export const ButtonGua = (props)=>{
    return(
        <Button type={props.type || null} loading={props.loading} onClick={props.onclick} disabled={props.disabled ?? false}>
            {props.icon || <PlusOutlined /> }{props.title}
        </Button>
    )
}
