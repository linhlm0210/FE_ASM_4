import React from 'react';
import { Layout, Typography, Button, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const AppHeader = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529', padding: '0 20px' }}>
      <Text strong style={{ fontSize: '24px', color: '#fff' }}>
        Trang chủ
      </Text>
      {userName && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar style={{ marginRight: '10px' }} />
          <Text style={{ color: '#fff', marginRight: '20px' }}>{userName}</Text>
          <Button type="primary" onClick={handleLogout} style={{ background: '#ff4d4f', borderColor: '#ff4d4f' }}>
            Đăng xuất
          </Button>
        </div>
      )}
    </Header>
  );
};

export default AppHeader;
