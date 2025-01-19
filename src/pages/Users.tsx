import React, { useState, useEffect } from "react";
import { DatePicker, Modal, Button, Form, Input, Select, Table, message } from "antd";
import { getAllUsers, addUser } from "../asset/globalAPI";


interface User {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  dateofBirth: string;
  address: string;
  gender: string;
  role: string;
}

const { Option } = Select;

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers();
        if (response.status === 200) {
          setUsers(response.data.users);
        }
      } catch (error) {
        message.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isModalOpen]);

  // Address Verification Function


  // Handle Add User
  const handleAddUser = async (values: Omit<User, "id">) => {


    console.log("ther user post data", values);

    try {
      const response = await addUser(values);
      console.log("response data ");

      if (response.status === 201) {
        message.success("User added successfully!");
        setIsModalOpen(false);
        form.resetFields();
      } else {
        message.error("Failed to add user.");
      }
    } catch (error) {
      message.error("Network error while adding user.");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Date of Birth",
      dataIndex: "Dob",
      key: "Dob",
      render: (Dob: number) => {
        const formattedDate = new Date(Dob).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return formattedDate;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2>User List</h2>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </div>

      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      {/* Add User Modal */}
      <Modal
        title="Add User"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleAddUser}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the user's name" }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter the user's email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { required: true, message: "Please enter the mobile number" },
              { pattern: /^\d{10}$/, message: "Please enter a valid 10-digit number" },
            ]}
          >
            <Input placeholder="Enter mobile number" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter the password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dateofBirth"
            rules={[{ required: true, message: "Please enter the date of birth" }]}
          >
            <DatePicker format="YYYY-MM-DD" placeholder="Enter date of birth" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input
              placeholder="Enter address"
            />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select the gender" }]}
          >
            <Select placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select role">
              <Option value="admin">Admin</Option>
              <Option value="seller">Seller</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "8px" }}
            >
              Add
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
