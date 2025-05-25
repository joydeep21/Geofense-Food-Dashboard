import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  getSellers,
  resturentAdd,
  getAllrestaurents,
  updateRestaurents,
} from "../asset/globalAPI";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  notification,
  Modal,
  Card,
  Col,
  Row,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const categoryOptions = [
  "Fine Dining",
  "Café",
  "Takeaway",
  "Buffet",
  "Fast Food",
];
const typeOptions = ["Veg", "Non-Veg", "Both"];
const cuisineOptions = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "Continental",
];

const CreateRestaurant = () => {
  const [form] = Form.useForm();
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [assignedUser, setAssignedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editRestaurantId, setEditRestaurantId] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

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

    const fetchRestaurants = async () => {
      try {
        const response = await getAllrestaurents();
        if (response.status === 200) {
          setRestaurants(response.data);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    if (user?.role === "admin") {
      fetchUsers();
    } else if (user?.role === "seller") {
      setAssignedUser(user.id);
    }
    fetchRestaurants();
  }, [user]);

  const fetchRestaurants = async () => {
    try {
      const response = await getAllrestaurents();
      if (response.status === 200) {
        setRestaurants(response.data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (image) formData.append("Restaurant_image", image);
    formData.append("address", values.address);
    formData.append("rating", values.rating.toString());
    formData.append("category", JSON.stringify(values.category));
    formData.append("type", JSON.stringify(values.type));
    formData.append("cuisineType", JSON.stringify(values.cuisineType));
    formData.append("location", values.location);
    formData.append("assignedUser", assignedUser || "");

    try {
      if (editMode && editRestaurantId) {
        const response = await updateRestaurents(editRestaurantId, formData);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Restaurant Updated Successfully",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } else {
        const response = await resturentAdd(formData);
        console.log("response",response);
        
        if (response.status === 201 || response.status === 203) {
          Swal.fire({
            icon: response.status === 201 ? "success" : "warning",
            title:
              response.status === 201
                ? "Restaurant Added Successfully"
                : response.data.message,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }

      closeModal();
      fetchRestaurants();
    } catch (error) {
      console.error("Error saving restaurant:", error);
      notification.error({
        message: "Error",
        description: "An unexpected error occurred.",
      });
    }
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
    return false;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditRestaurantId(null);
    form.resetFields();
    setImage(null);
    setImageName("");
    setImagePreview(null);
    setAssignedUser(user?.role === "seller" ? user.id : null);
  };

  const openAddModal = () => {
    if (user?.role === "seller" && restaurants.length === 1) {
      Swal.fire({
        icon: "warning",
        title: "Limit Reached",
        text: "You can only add one restaurant as a seller.",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const openEditModal = (restaurant: any) => {
    setEditMode(true);
    setEditRestaurantId(restaurant._id);
    setIsModalOpen(true);
    form.setFieldsValue({
      name: restaurant.name,
      address: restaurant.address,
      rating: restaurant.rating,
      category: restaurant.category || [],
      type: restaurant.type || [],
      cuisineType: restaurant.cuisineType || [],
      location: restaurant.location,
    });
    setAssignedUser(restaurant.assignedUser?._id || null);
    setImagePreview(restaurant.image || null);
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f5f5" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={openAddModal}
        style={{ marginBottom: "20px" }}
      >
        Add New Restaurant
      </Button>

      <Modal
        title={editMode ? "Edit Restaurant" : "Add Restaurant"}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Restaurant Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Restaurant Image">
            <Upload
              showUploadList={false}
              customRequest={(options) =>
                handleImageUpload(options.file as File)
              }
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {imageName && <p>{imageName}</p>}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ marginTop: 10, maxWidth: "100%", borderRadius: 8 }}
              />
            )}
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please enter the rating!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select mode="multiple" placeholder="Select category">
              {categoryOptions.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select type!" }]}
          >
            <Select mode="multiple" placeholder="Select type">
              {typeOptions.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Cuisine Type"
            name="cuisineType"
            rules={[{ required: true, message: "Please select cuisine!" }]}
          >
            <Select mode="multiple" placeholder="Select cuisine type">
              {cuisineOptions.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter the location!" }]}
          >
            <Input />
          </Form.Item>

          {user?.role === "admin" && (
            <Form.Item label="Assign User" name="assignedUser">
              <Select
                value={assignedUser || ""}
                onChange={(value) => setAssignedUser(value)}
              >
                <Option value="">None</Option>
                {users.map((user) => (
                  <Option key={user._id} value={user._id}>
                    {user.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              {editMode ? "Update Restaurant" : "Create Restaurant"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ marginTop: "30px" }}>
        <h2>Restaurants</h2>
        <Row gutter={[16, 16]}>
          {restaurants.map((restaurant) => (
            <Col key={restaurant._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={restaurant.name}
                    src={restaurant.image}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => openEditModal(restaurant)}
                  />,
                ]}
              >
                <Card.Meta
                  title={restaurant.name}
                  description={`${restaurant.address.substring(0, 50)}...`}
                />
                <p>Rating: {restaurant.rating}</p>
                <p>Category: {(restaurant.category || []).join(", ")}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CreateRestaurant;
