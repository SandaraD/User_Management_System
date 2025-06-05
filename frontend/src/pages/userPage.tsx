import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm, Table } from "antd";
import axios from "axios";
import UserFormModal from "../components/UserFormModal";

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>("http://localhost:3000/users");
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
      await axios.delete(`http://localhost:3000/users/${id}`);
      message.success("User deleted");
      fetchUsers();
    } catch {
      message.error("Failed to delete user");
    }
  };

  const handleSubmit = async (values: Omit<User, "id">) => {
    try {
      if (isEditMode && editUser) {
        await axios.put(
          `http://localhost:3000/users/${editUser.id}`,
          values
        );
        message.success("User updated");
      } else {
        await axios.post("http://localhost:3000/users", values);
        message.success("User created");
      }
      setModalVisible(false);
      fetchUsers();
    } catch {
      message.error("Something went wrong");
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
            title="Are you aure to delete this user?"
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
      <h2 style={{ marginBottom: 16 }}>User List</h2>
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
        pagination={{ pageSize: 8}}
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
