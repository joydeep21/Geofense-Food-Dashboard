import React, { useState, useEffect } from "react";
import {
  DatePicker,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Table,
  message,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../asset/globalAPI";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

interface User {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  dateofBirth: string;
  address: string;
  gender: string;
  role: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      if (response.status === 200) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [isModalOpen]);

  const handleAddUser = async (values: Omit<User, "id">) => {
    try {
      let response;
      const payload = {
        ...values,
        dateofBirth: values.dateofBirth.format("YYYY-MM-DD"),
      };

      if (editingUser) {
        response = await updateUser(editingUser._id, payload);
      } else {
        response = await addUser(payload);
      }

      if (response.status === 201 || response.status === 200) {
        message.success(
          editingUser ? "User updated successfully!" : "User added successfully!"
        );
        setIsModalOpen(false);
        setEditingUser(null);
        form.resetFields();
        fetchUsers();
      } else {
        message.error("Failed to save user.");
      }
    } catch (error) {
      console.error(error);
      message.error("Network error while saving user.");
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
    form.setFieldsValue({
      ...user,
      dateofBirth: moment(user.dateofBirth),
    });
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await deleteUser(userId);
      if (response.status === 200) {
        message.success("User deleted successfully!");
        fetchUsers();
      } else {
        message.error("Failed to delete user.");
      }
    } catch (error) {
      console.error(error);
      message.error("Network error while deleting user.");
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
      dataIndex: "dateofBirth",
      key: "dateofBirth",
      render: (dob: string) => moment(dob).format("DD MMM YYYY"),
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
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEditUser(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2>User List</h2>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setEditingUser(null);
            form.resetFields();
          }}
        >
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

      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddUser} layout="vertical">
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
              {
                pattern: /^\d{10}$/,
                message: "Please enter a valid 10-digit number",
              },
            ]}
          >
            <Input placeholder="Enter mobile number" />
          </Form.Item>
          {!editingUser && (
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
          )}
          <Form.Item
            label="Date of Birth"
            name="dateofBirth"
            rules={[{ required: true, message: "Please enter the date of birth" }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address" }]}
          >
            <Input placeholder="Enter address" />
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
            <Button type="primary" htmlType="submit" style={{ marginRight: "8px" }}>
              {editingUser ? "Update" : "Add"}
            </Button>
            <Button
              onClick={() => {
                setIsModalOpen(false);
                setEditingUser(null);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
