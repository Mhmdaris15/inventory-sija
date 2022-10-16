import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../utils/useStore";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Typography,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import sija from "../../assets/image/sija.png";

export const Login = observer(() => {
  const store = useStore();
  const [formUser] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [username, handleusername] = useState("");
  const [password, handlePassword] = useState("");
  const value = formUser.getFieldsValue()
  console.log("ini data dari form login:",value)
  let history = useHistory();

  const onFinish = (values) => {
    enterLoading(values)
      .then((res) => {
      })
      .catch((error) => {
      });
  };

  const enterLoading = async (props) => {
    setLoading(true);
    const { username, password } = props;

    try {
      const response = await store.authentication.login({
        username: username,
        password: password,
      });
        history.replace("/app/home");
    } catch (err) {
      message.error("Akun Tidak Terdaftar");
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <Row justify={"center"}>
        <Col>
          <div style={{display: "flex",justifyContent: "flex-start",marginTop: "5vh",flexDirection: "column",alignItems: "center",}}>
            <div style={{display: "flex", flexDirection: "column",alignItems: "stretch",}}>
              <Typography.Paragraph style={{ margin: 0,padding: 0,fontSize: 20,marginLeft: 5,fontWeight: 600,color: "#413d3e",}}>
                Inventory SIJA
              </Typography.Paragraph>
            </div>
            <Card style={{ width: 320, textAlign: "center" }} headStyle={{ fontSize: 13, fontWeight: 200 }} className={"shadow"} bordered={true}  title={"Sign in to Dashboard"}>
              <Image preview={false} x src={sija} />
              <Form layout={"vertical"} name="normal_login" className="login-form" form={formUser} initialValues={{ username, password }} onFinish={onFinish}>
                <Form.Item label="Username" name="username" size={"large"} rules={[{ required: false, message: "Please input your Username!" },]}>
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" placeholder="Username" />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0, }} label="Password" name="password" size={"large"} rules={[{ required: false, message: "Please input your Password!" }, ]}>
                  <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                </Form.Item>
                <Form.Item
                  style={{marginBottom: 0,marginTop: 50,}}>
                  <Button type="primary" block loading={loading} htmlType="submit" size={"large"} onSubmit={enterLoading} className="login-form-button">
                    Sign In
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
});
