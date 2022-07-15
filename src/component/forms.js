import { Button, Checkbox, Form, Input } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./main.scss";
import { useState } from "react";
function Forms() {
  const onFinish = (values) => {
    localStorage.setItem("token", JSON.stringify(values.token));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleSubmit = (e) => {
    console.log(e);
    const bodyFormData = new FormData();
    bodyFormData.append("_username", e.username);
    bodyFormData.append("_password", e.password);
    bodyFormData.append("_subdomain", "toko");
    let requestOptions = {
      method: "POST",
      body: bodyFormData,
      redirect: "follow",
    };
    fetch("https://toko.ox-sys.com/security/auth_check", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (JSON.parse(result).token != null) {
          onFinish(JSON.parse(result))
          window.location.reload()
          
        } else {
          alert(`parol notog'ri`)
        }
      })
      .catch((error) => console.log("error", error));

  };

  return (
    <div className="forms">
      <div className="forms_container">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Forms;
