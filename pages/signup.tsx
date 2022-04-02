import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';
import axios from 'axios';

const error = (statusText: any) => {
  message.error(`Error: ${statusText}`);
}


const Signup = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    email: "",
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
    console.log('Received values of form: ', values);

    axios.post("http://localhost:1337/api/auth/local/register", {
      username: values.username,
      email: values.email,
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
      });

  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ maxWidth: "300px" }}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
          name="email"
          onChange={handleChange} />
      </Form.Item>

      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          name="username"
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
        <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100 %" }}>
          Register
        </Button>
        Or <Link href="/login">have an account?</Link>
      </Form.Item>
    </Form>
  );
};


export default Signup;
