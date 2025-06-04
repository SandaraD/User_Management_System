import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  birthYear: number;
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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
  ];

  return (
    <div style={{ padding: 100 }}>
      <h2 style={{ marginBottom: 16 }}>User List</h2>
      <Table dataSource={users} columns={columns} rowKey="id"/>
    </div>
  );
};

export default UserPage;