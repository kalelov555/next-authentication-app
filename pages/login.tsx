import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from "nookies";
import axios from 'axios';

const error = (statusText: any) => {
  message.error(`Error: ${statusText}`);
}

const Login = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    identifier: "",
    password: ""
  })

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setValues((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }
  const onFinish = async () => {

    axios.post("http://localhost:1337/api/auth/local", {
      identifier: values.identifier,
      password: values.password
    })
      .then(res => {
        const jwt = res.data.jwt;

        setCookie(null, "jwt", jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });

        router.push("/restaraunts");
      })
      .catch(err => {
        console.log(err.response);

        const statusText = err.response.data.error.message;
        error(statusText);
      })
  }


  return (
    <div>
      <h1>You have to login first</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: "300px" }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            name="identifier"
            onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>

          </Form.Item>

          <a className="login-form-forgot" href="" style={{ float: "left" }}>
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100 %" }}
          >
            Log in
          </Button>
          Or <Link href="/signup">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  )
};

export default Login;
