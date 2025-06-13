import React, { useState } from "react";
import { Button, Form, Input, message, Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (values: {
    firstName: string;
    lastName: string;
    birthYear: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/auth/signup", values);
      message.success("Signup successful. You can now login.");
      navigate("/login");
    } catch {
      message.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Card title="Signup" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={handleSignup}>
          <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Birth Year" name="birthYear" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
            <a onClick={() => navigate("/login")}>Already have an account? Login</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;
