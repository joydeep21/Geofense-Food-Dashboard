import React, { useState, useEffect } from "react";
import { Card, Row, Col, Modal, Form, Input, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { resturentAndfoods, foodAdd } from "../asset/globalAPI"; // Replace with your API import
import { UploadOutlined } from "@ant-design/icons";

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
    category: string;
}

const RestaurantAndFoods: React.FC = () => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [foods, setFoods] = useState<Food[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Fetch restaurant and food details
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

    // Handle Add Food Modal
    const handleAddFood = async (values: any) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("restaurant", restaurant?._id || "");
        if (image) formData.append("image", image);
        formData.append("price", values.price);
        formData.append("rating", values.rating);
        formData.append("category", values.category);
        formData.append("type", values.type);
        formData.append("cuisineType", values.cuisineType);

        try {
            await foodAdd(formData);
            message.success("Food added successfully");
            form.resetFields();
            setImage(null);
            setImageName("");
            setIsModalVisible(false);
        } catch (error) {
            message.error("Failed to add food");
        } finally {
            setLoading(false);
        }
    };

    // Food Details Navigation
    const handleFoodClick = (id: string) => {
        navigate(`/food/foodDetails/${id}`);
    };
    const handleImageUpload = (file: any) => {
        setImage(file);
        setImageName(file.name); // Set file name
        return false; // Prevent automatic upload
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
                                        <p>Category: {food.category}</p>
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
                        <Input type="number" placeholder="Enter price" />
                    </Form.Item>

                    <Form.Item
                        name="rating"
                        label="Rating"
                        rules={[{ required: true, message: "Please enter the rating" }]}
                    >
                        <Input placeholder="Enter rating" />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: "Please enter the category" }]}
                    >
                        <Input placeholder="Enter category" />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true, message: "Please enter the type" }]}
                    >
                        <Input placeholder="Enter type" />
                    </Form.Item>
                    <Form.Item
                        name="cuisineType"
                        label="Cuisine Type"
                        rules={[{ required: true, message: "Please enter the cuisine type" }]}
                    >
                        <Input placeholder="Enter cuisine type" />
                    </Form.Item>

                    <Form.Item label="Food Image" rules={[{ required: true, message: "Please upload a food image!" }]}>
                        <Upload
                            showUploadList={false}
                            customRequest={(options) => handleImageUpload(options.file)}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        {imageName && <p style={{ marginTop: "10px" }}>{imageName}</p>}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RestaurantAndFoods;
