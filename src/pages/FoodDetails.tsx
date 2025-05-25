import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateFood, foodDetailsById, deleteFood } from "../asset/globalAPI";
import { UploadOutlined } from "@ant-design/icons";
import {
  Card,
  Image,
  Typography,
  Descriptions,
  Spin,
  Alert,
  Form,
  Input,
  Button,
  Upload,
  message,
  Modal,
  Select,
} from "antd";

const { Title } = Typography;
const { confirm } = Modal;
const { TextArea } = Input;
const { Option } = Select;

interface FoodDetailsProps {
  _id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string[];
  type: string[];
  cuisineType: string[];
  description?: string;
  ingredients?: string[];
}

const categoryOptions = [
  "starter",
  "main course",
  "dessert",
  "beverage",
  "snack",
];

const typeOptions = ["veg", "non-veg", "vegan", "jain", "egg"];

const cuisineTypeOptions = [
  "indian",
  "chinese",
  "italian",
  "mexican",
  "thai",
  "continental",
];

const FoodDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState<FoodDetailsProps | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [form] = Form.useForm();

  const fetchFoodDetails = async () => {
    try {
      setLoading(true);
      const response = await foodDetailsById(id);
      if (response.status === 200) {
        const data = response.data;
        setFoodData(data);

        form.setFieldsValue({
          ...data,
          category: data.category || [],
          type: data.type || [],
          cuisineType: data.cuisineType || [],
          ingredients: data.ingredients?.join(", "),
        });
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodDetails();
  }, [id]);

  const handleImageUpload = (file: any) => {
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setImageName(file.name);
    return false; // prevent auto upload by Upload component
  };

  const handleAddFood = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    if (image) formData.append("image", image);
    formData.append("price", values.price);
    formData.append("rating", values.rating);

    // Append multi-select values as JSON strings
    formData.append("category", JSON.stringify(values.category));
    formData.append("type", JSON.stringify(values.type));
    formData.append("cuisineType", JSON.stringify(values.cuisineType));

    formData.append("description", values.description || "");
    formData.append("ingredients", values.ingredients || "");

    try {
      await updateFood(foodData?._id, formData);
      message.success("Food updated successfully");
      setIsEditing(false);
      fetchFoodDetails();
      setImage(null);
      setImageName("");
      setImagePreview("");
    } catch (error) {
      message.error("Failed to update food");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    confirm({
      title: "Are you sure you want to delete this food item?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        setLoading(true);
        try {
          await deleteFood(foodData?._id || "");
          message.success("Food item deleted successfully");
          navigate("/foods");
        } catch (error) {
          message.error("Failed to delete food item");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "20px" }}>
      <Card bordered={false} style={{ borderRadius: "12px", overflow: "hidden" }}>
        {!isEditing ? (
          <>
            <Image src={foodData?.image} alt={foodData?.name} style={{ borderRadius: "12px" }} />
            <Title level={2} style={{ marginTop: "20px" }}>{foodData?.name}</Title>
            <Descriptions title="Food Details" bordered column={1}>
              <Descriptions.Item label="Price">₹{foodData?.price}</Descriptions.Item>
              <Descriptions.Item label="Rating">{foodData?.rating}</Descriptions.Item>
              <Descriptions.Item label="Category">{foodData?.category?.join(", ")}</Descriptions.Item>
              <Descriptions.Item label="Type">{foodData?.type?.join(", ")}</Descriptions.Item>
              <Descriptions.Item label="Cuisine Type">{foodData?.cuisineType?.join(", ")}</Descriptions.Item>
              <Descriptions.Item label="Description">{foodData?.description}</Descriptions.Item>
              <Descriptions.Item label="Ingredients">{foodData?.ingredients?.join(", ")}</Descriptions.Item>
            </Descriptions>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <Button type="primary" onClick={() => setIsEditing(true)}>Edit</Button>
              <Button danger onClick={handleDelete}>Delete</Button>
            </div>
          </>
        ) : (
          <Form form={form} layout="vertical" onFinish={handleAddFood}>
            <Form.Item label="Current Image">
              <Image src={foodData?.image} alt="Current Food Image" style={{ borderRadius: "12px" }} />
            </Form.Item>

            {imagePreview && (
              <Form.Item label="New Image Preview">
                <Image src={imagePreview} alt="New Preview" style={{ borderRadius: "12px" }} />
              </Form.Item>
            )}

            <Form.Item label="Food Image">
              <Upload showUploadList={false} beforeUpload={handleImageUpload}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              {imageName && <p>{imageName}</p>}
            </Form.Item>

            <Form.Item name="name" label="Food Name" rules={[{ required: true }]}>
              <Input placeholder="Enter food name" />
            </Form.Item>

            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter price" />
            </Form.Item>

            <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
              <Input placeholder="Enter rating" />
            </Form.Item>

            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Select mode="multiple" placeholder="Select category">
                {categoryOptions.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
              <Select mode="multiple" placeholder="Select type">
                {typeOptions.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="cuisineType" label="Cuisine Type" rules={[{ required: true }]}>
              <Select mode="multiple" placeholder="Select cuisine type">
                {cuisineTypeOptions.map((cuisine) => (
                  <Option key={cuisine} value={cuisine}>
                    {cuisine}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={3} placeholder="Enter food description" />
            </Form.Item>

            <Form.Item name="ingredients" label="Ingredients (comma separated)">
              <Input placeholder="e.g., rice, chicken, spices" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default FoodDetails;
