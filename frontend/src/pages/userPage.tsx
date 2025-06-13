import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Table } from "antd";
import axios from "axios";
import UserFormModal from "../components/UserFormModal";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/auth/profile", {
          withCredentials: true,
        });
        fetchUsers();
      } catch {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:3000/users", {
        withCredentials: true,
      });
      setUsers(response.data);
    } catch (error) {
      console.log("Failed to fetch users: ", error);
    }
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setEditUser(null);
    setModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setIsEditMode(true);
    setEditUser(user);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`, {
        withCredentials: true,
      });
      message.success("User deleted");
      fetchUsers();
    } catch {
      message.error("Failed to delete user");
    }
  };

  const handleSubmit = async (values: Omit<User, "id">) => {
    try {
      if (isEditMode && editUser) {
        await axios.put(`http://localhost:3000/users/${editUser.id}`, values, {
          withCredentials: true,
        });
        message.success("User updated");
      } else {
        await axios.post("http://localhost:3000/users", values, {
          withCredentials: true,
        });
        message.success("User created");
      }
      setModalVisible(false);
      fetchUsers();
    } catch {
      message.error("Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, {
        withCredentials: true,
      });
      message.success("Logged out");
      navigate("/login");
    } catch {
      message.error("Logout failed");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Birth Year",
      dataIndex: "birthYear",
      key: "birthYear",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: User) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 100 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>User List</h2>
        <Button danger onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}
      >
        Create User
      </Button>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      <UserFormModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialValues={editUser || undefined}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default UserPage;
