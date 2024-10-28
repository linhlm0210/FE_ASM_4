import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Table, Typography, Space, Modal, Input, Select, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Option } = Select;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState('all'); // 'all', 'true', 'false'
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get( BACKEND_URL + '/students');
      setStudents(response.data);
      console.log("Fetched students:", response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có muốn xóa học sinh này không?',
      okText: 'Có', 
      cancelText: 'Không',
      onOk: async () => {
        try {
          await axios.delete( BACKEND_URL + `/students/${id}/delete`);
          fetchStudents(); 
        } catch (error) {
          console.error('Error deleting student:', error);
        }
      },
      centered: true, 
    });
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = isActiveFilter === 'all' || student.isActive.toString() === isActiveFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center', 
    },
    {
      title: 'Mã học sinh',
      dataIndex: 'studentCode',
      key: 'studentCode',
      align: 'center',
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      render: (isActive) => (isActive ? 'Hoạt động' : 'Không hoạt động'),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center', 
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/students/${record._id}/update`)}
            title="Update student"
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            title="Delete student"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Title level={2}>DANH SÁCH HIỂN THỊ</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => navigate('/students/create')}
        >
          Thêm học sinh
        </Button>
      </div>

      <div style={{ maxWidth: '800px', width: '100%', marginBottom: '20px' }}>
        <Row gutter={16} style={{ marginBottom: '10px' }}>
          <Col span={12}>
            <Select 
              value={isActiveFilter} 
              onChange={setIsActiveFilter} 
              style={{ width: '100%' }}
              placeholder="Lọc theo trạng thái"
            >
              <Option value="all">Tất cả</Option>
              <Option value="true">Hoạt động</Option>
              <Option value="false">Không hoạt động</Option>
            </Select>
          </Col>
          <Col span={12}>
            <Input 
              placeholder="Tìm kiếm theo tên học sinh..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </Col>
        </Row>
        
        <Table
          dataSource={filteredStudents} 
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }} 
          bordered 
          size="middle" 
          scroll={{ x: true }} 
        />
      </div>
    </div>
  );
};

export default ListStudents;
