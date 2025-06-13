import React, { useState } from "react";
import { Button, Form, Input, message, Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: { firstName: string; password: string }) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/auth/login", values, {
        withCredentials: true,
      });
      message.success("Login successful");
      navigate("/users");
    } catch {
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Card title="Login" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter your first name" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
            <a onClick={() => navigate("/signup")}>Don't have an account? Sign up</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
