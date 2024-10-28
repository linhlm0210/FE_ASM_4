import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";

const { Title } = Typography;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Register = () => {
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

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      await axios.post(BACKEND_URL + "/register", values);
      message.success("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
      navigate('/login'); // Chuyển hướng về trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      message.error("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Đăng ký
      </Title>
      <Form onFinish={handleRegister} layout="vertical" autoComplete="off">
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên của bạn!" }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          label="Tên đăng nhập"
          name="userName"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
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
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
