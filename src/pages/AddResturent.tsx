import React, { useState, useEffect } from "react";
import { getSellers, resturentAdd } from "../asset/globalAPI"; // Replace with your API import
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Form, Input, Button, Select, Upload, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CreateRestaurant = () => {
  const [form] = Form.useForm(); // Get the form instance
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [assignedUser, setAssignedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getSellers();
        if (response.status === 200) {
          setUsers(response.data.sellers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (user?.role === "admin") {
      fetchUsers();
    } else if (user?.role === "seller") {
      setAssignedUser(user.id);
    }
  }, [user]);

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (image) formData.append("Restaurant_image", image);
    formData.append("address", values.address);
    formData.append("rating", values.rating.toString());
    formData.append("category", values.category);
    formData.append("type", values.type);
    formData.append("cuisineType", values.cuisineType);
    formData.append("location", values.location);
    formData.append("assignedUser", assignedUser || "");

    try {
      const response = await resturentAdd(formData);
      if (response.status === 201 || response.status === 203) {
        const message =
          response.status === 201
            ? "Restaurant Added Successfully"
            : response.data.message;
        const icon = response.status === 201 ? "success" : "warning";

        Swal.fire({
          icon,
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });

        // Reset the form fields
        form.resetFields();
        setImage(null);
        setImageName("");
        setAssignedUser(user?.role === "seller" ? user.id : null);
      }
    } catch (error) {
      console.error("Error creating restaurant:", error);
      notification.error({
        message: "Error adding restaurant",
        description: "An unexpected error occurred.",
      });
    }
  };

  const handleImageUpload = (file: any) => {
    setImage(file);
    setImageName(file.name); // Set file name
    return false; // Prevent automatic upload
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f5f5" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", color: "#333" }}>
        Add Restaurant
      </h2>
      <Form
        form={form} // Link the form instance
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: "",
          address: "",
          rating: 0,
          category: "",
          type: "",
          cuisineType: "",
          location: "",
        }}
      >
        <Form.Item label="Restaurant Name" name="name" rules={[{ required: true, message: "Please enter the restaurant name!" }]}>
          <Input placeholder="Enter restaurant name" />
        </Form.Item>

        <Form.Item label="Restaurant Image" rules={[{ required: true, message: "Please upload a restaurant image!" }]}>
          <Upload
            showUploadList={false}
            customRequest={(options) => handleImageUpload(options.file)}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          {imageName && <p style={{ marginTop: "10px" }}>{imageName}</p>}
        </Form.Item>

        <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter the address!" }]}>
          <Input placeholder="Enter restaurant address" />
        </Form.Item>

        <Form.Item label="Rating" name="rating" rules={[{ required: true, message: "Please enter the rating!" }]}>
          <Input type="number" placeholder="Enter restaurant rating" />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please enter the category!" }]}>
          <Input placeholder="Enter category" />
        </Form.Item>

        <Form.Item label="Type" name="type" rules={[{ required: true, message: "Please enter the type!" }]}>
          <Input placeholder="Enter type" />
        </Form.Item>

        <Form.Item label="Cuisine Type" name="cuisineType" rules={[{ required: true, message: "Please enter the cuisine type!" }]}>
          <Input placeholder="Enter cuisine type" />
        </Form.Item>

        <Form.Item label="Location" name="location" rules={[{ required: true, message: "Please enter the location!" }]}>
          <Input placeholder="Enter restaurant location" />
        </Form.Item>

        {user?.role === "admin" && (
          <Form.Item label="Assign User" name="assignedUser">
            <Select
              value={assignedUser || ""}
              onChange={(value) => setAssignedUser(value)}
              placeholder="Select a user to assign"
            >
              <Select.Option value="">None</Select.Option>
              {users.map((user) => (
                <Select.Option key={user._id} value={user._id}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} size="large">
            Create Restaurant
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateRestaurant;
