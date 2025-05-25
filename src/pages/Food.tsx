import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  InputNumber,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { resturentAndfoods, foodAdd } from "../asset/globalAPI";

const { TextArea } = Input;
const { Option } = Select;

interface Restaurant {
  _id: string;
  name: string;
  image: string;
  address: string;
  rating: number;
}

interface Food {
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
  stock?: number;
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

const RestaurantAndFoods: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await resturentAndfoods();
        setRestaurant(response.data.restaurant);
        setFoods(response.data.foods);
      } catch (error) {
        message.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleAddFood = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("restaurant", restaurant?._id || "");
    if (image) formData.append("image", image);
    formData.append("price", values.price);
    formData.append("rating", values.rating);
    formData.append("category", JSON.stringify(values.category));
    formData.append("type", JSON.stringify(values.type));
    formData.append("cuisineType", JSON.stringify(values.cuisineType));
    formData.append("description", values.description || "");
    formData.append("stock", values.stock ? values.stock.toString() : "0");
    formData.append(
      "ingredients",
      JSON.stringify(values.ingredients ? values.ingredients : [])
    );

    try {
      await foodAdd(formData);
      message.success("Food added successfully");
      form.resetFields();
      setImage(null);
      setImageName("");
      setIsModalVisible(false);
      // Optionally refresh foods list here if needed
    } catch (error) {
      message.error("Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  const handleFoodClick = (id: string) => {
    navigate(`/food/foodDetails/${id}`);
  };

  const handleImageUpload = (file: any) => {
    setImage(file);
    setImageName(file.name);
    return false; // prevent upload
  };

  return (
    <div style={{ padding: "20px" }}>
      {restaurant && (
        <Card
          hoverable
          cover={
            <div
              style={{
                height: "220px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt={restaurant.name}
                src={restaurant.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          }
          style={{ marginBottom: "20px" }}
        >
          <Card.Meta
            title={restaurant.name}
            description={
              <>
                <p>{restaurant.address}</p>
                <p>Rating: {restaurant.rating}</p>
              </>
            }
          />
        </Card>
      )}

      <Row gutter={[16, 16]} justify="start" style={{ alignItems: "stretch" }}>
        {foods.map((food) => (
          <Col key={food._id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={
                <div style={{ height: "150px", overflow: "hidden" }}>
                  <img
                    alt={food.name}
                    src={food.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              }
              onClick={() => handleFoodClick(food._id)}
            >
              <Card.Meta
                title={food.name}
                description={
                  <div>
                    <p>Price: ₹{food.price}</p>
                    <p>Rating: {food.rating}</p>
                    <p>Category: {food.category.join(", ")}</p>
                    <p>Type: {food.type.join(", ")}</p>
                    <p>Cuisine: {food.cuisineType.join(", ")}</p>
                    {food.description && <p>Description: {food.description}</p>}
                    {food.ingredients && food.ingredients.length > 0 && (
                      <p>Ingredients: {food.ingredients.join(", ")}</p>
                    )}
                    <p>Stock: {food.stock ?? 0}</p>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginTop: "20px" }}
        onClick={() => setIsModalVisible(true)}
      >
        Add Food
      </Button>

      <Modal
        title="Add Food"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddFood}>
          <Form.Item
            name="name"
            label="Food Name"
            rules={[{ required: true, message: "Please enter the food name" }]}
          >
            <Input placeholder="Enter food name" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter price"
            />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please enter the rating" }]}
          >
            <InputNumber
              min={0}
              max={5}
              step={0.1}
              style={{ width: "100%" }}
              placeholder="Enter rating (0-5)"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Please select at least one category" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select category(s)"
              options={categoryOptions.map((cat) => ({
                label: cat,
                value: cat,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[
              { required: true, message: "Please select at least one type" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select type(s)"
              options={typeOptions.map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="cuisineType"
            label="Cuisine Type"
            rules={[
              { required: true, message: "Please select at least one cuisine type" },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select cuisine type(s)"
              options={cuisineTypeOptions.map((cuisine) => ({
                label: cuisine,
                value: cuisine,
              }))}
            />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Enter description (optional)" />
          </Form.Item>

          <Form.List name="ingredients">
            {(fields, { add, remove }) => (
              <div>
                <label>Ingredients</label>
                {fields.map(({ key, name, ...restField }) => (
                  <Form.Item
                    key={key}
                    required={false}
                    style={{ marginBottom: 0 }}
                  >
                    <Form.Item
                      {...restField}
                      name={name}
                      noStyle
                      rules={[
                        { required: true, message: "Please enter an ingredient" },
                      ]}
                    >
                      <Input
                        placeholder="Ingredient"
                        style={{ width: "90%", marginRight: 8 }}
                      />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <Button
                        type="link"
                        onClick={() => remove(name)}
                        style={{ padding: 0 }}
                      >
                        Remove
                      </Button>
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Ingredient
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>

          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: false, type: "number", min: 0 }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Enter stock quantity"
            />
          </Form.Item>

          <Form.Item
            label="Food Image"
            rules={[{ required: true, message: "Please upload a food image!" }]}
          >
            <Upload
              showUploadList={false}
              beforeUpload={handleImageUpload}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {imageName && <p style={{ marginTop: "10px" }}>{imageName}</p>}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RestaurantAndFoods;
