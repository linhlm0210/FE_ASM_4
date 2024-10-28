/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, Select, Typography, message, Modal } from "antd";

const { Title } = Typography;
const { Option } = Select;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CreateStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listStudent, setListStudent] = useState(null);

  const fetchListStudent = async () => {
    try {
      const response = await axios.get( BACKEND_URL + `/students`);
      setListStudent(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching student:", error);
      message.error("Failed to fetch student data");
    }
  };

  useEffect(() => {
    fetchListStudent();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);

    const isDuplicate = listStudent.some(
      (existingStudent) => existingStudent.studentCode === values.studentCode
    );

    if (isDuplicate) {
      Modal.warning({
        title: "Cảnh báo",
        content: "Mã học sinh đã tồn tại. Vui lòng nhập mã khác!",
        centered: true,
        okText: "Đồng ý",
        cancelButtonProps: {
          style: { display: "none" },
        },
      });
      setLoading(false);
      return;
    }

    try {
      await axios.post( BACKEND_URL +  "/students/create", values);
      message.success("Thêm học sinh thành công");
      navigate("/students");
    } catch (error) {
      message.error("Thêm học sinh thất bại");
    }
    setLoading(false);
  };

  return (
    <div className="wrap">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Title level={2}>THÊM HỌC SINH MỚI</Title>
      </div>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          padding: "30px",
          maxWidth: 600,
          margin: "50px auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Nhập họ và tên!" }]}
          >
            <Input
              placeholder="Nhập họ và tên"
              style={{ borderRadius: "4px" }}
            />
          </Form.Item>
          <Form.Item
            label="Mã học sinh"
            name="studentCode"
            rules={[{ required: true, message: "Nhập mã học sinh!" }]}
          >
            <Input
              placeholder="Nhập mã học sinh"
              style={{ borderRadius: "4px" }}
            />
          </Form.Item>
          <Form.Item
            label="Trạng thái hoạt động"
            name="isActive"
            rules={[{ required: true, message: "Chọn trạng thái hoạt động!" }]}
          >
            <Select
              placeholder="Chọn trạng thái"
              style={{ borderRadius: "4px" }}
            >
              <Option value="true">Hoạt động</Option>
              <Option value="false">Không hoạt động</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", borderRadius: "4px" }}
              loading={loading}
            >
              Thêm học sinh
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateStudent;
