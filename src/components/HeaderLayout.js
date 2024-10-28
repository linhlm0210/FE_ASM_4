import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './Header'; // Nhập Header đã tạo trước đó

const { Content } = Layout;

const HeaderLayout = () => {
  const [userName, setUsername] = useState(); // Khởi tạo với undefined
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('userName');
    console.log("header" + storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('../login'); // Điều hướng đến trang đăng nhập nếu không có userName
    }
    setIsMounted(true); // Set mounted ở đây
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    setUsername(undefined); // Đặt lại username về undefined
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  if (!isMounted) {
    return null; // Chờ cho đến khi mounted để render
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader userName={userName} onLogout={handleLogout} />
      <Content style={{ padding: '24px' }}>
        <Outlet /> {/* Outlet sẽ render các component con */}
      </Content>
    </Layout>
  );
};

export default HeaderLayout;
