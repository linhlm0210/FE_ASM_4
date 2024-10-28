import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { Link } from "react-router-dom"; // Nhập Link

const { Title } = Typography;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/students');
    }
    setIsMounted(true);
  }, [navigate]);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post( BACKEND_URL + "/login", values);
      const token = response.data.token;
      const userName = response.data.userName; 
      localStorage.setItem("accessToken", token); 
      localStorage.setItem("userName", userName); 
      message.success("Login successful");
      navigate('/students');
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Login
      </Title>
      <Form onFinish={handleLogin} layout="vertical" autoComplete="off">
        <Form.Item
          label="Tên đăng nhập"
          name="userName"
          rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Link to="/register">Đăng ký</Link> {/* Liên kết đến trang đăng ký */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
