import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Image,
    Typography,
    Descriptions,
    Spin,
    Alert,
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    message,
} from "antd";
import { foodDetailsById } from "../asset/globalAPI"; // Replace with your API import

const { Title } = Typography;

interface FoodDetailsProps {
    _id: string;
    name: string;
    image: string;
    distance: number;
    price: number;
    rating: number;
    category: string;
    type: string;
    cuisineType: string;
}

const FoodDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [foodData, setFoodData] = useState<FoodDetailsProps | null>(null); // Renamed
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                setLoading(true);
                const response = await foodDetailsById(id);
                if (response.status === 200) {
                    setFoodData(response.data);
                    form.setFieldsValue(response.data);
                }
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchFoodDetails();
    }, [id, form]);

    const handleSave = async (values: FoodDetailsProps) => {
        try {
            const response = await fetch(`http://localhost:3006/api/food/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Failed to update food details");
            }

            const updatedFood = await response.json();
            setFoodData(updatedFood);
            message.success("Food details updated successfully!");
            setIsEditing(false);
        } catch (err: any) {
            message.error(err.message || "An error occurred while updating");
        }
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
                        <Image
                            src={foodData?.image}
                            alt={foodData?.name}
                            style={{ borderRadius: "12px" }}
                        />
                        <Title level={2} style={{ marginTop: "20px" }}>
                            {foodData?.name}
                        </Title>
                        <Descriptions title="Food Details" bordered column={1}>
                            <Descriptions.Item label="Price">₹{foodData?.price}</Descriptions.Item>
                            <Descriptions.Item label="Rating">{foodData?.rating}</Descriptions.Item>
                            <Descriptions.Item label="Category">{foodData?.category}</Descriptions.Item>
                            <Descriptions.Item label="Type">{foodData?.type}</Descriptions.Item>
                            <Descriptions.Item label="Cuisine Type">
                                {foodData?.cuisineType}
                            </Descriptions.Item>
                            <Descriptions.Item label="Distance">
                                {foodData?.distance} km
                            </Descriptions.Item>
                        </Descriptions>
                        <Button
                            type="primary"
                            style={{ marginTop: "20px" }}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>
                    </>
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSave}
                        initialValues={foodData || {}} // Fixed
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: "Please enter the food name" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Image URL"
                            name="image"
                            rules={[{ required: true, message: "Please enter the image URL" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: "Please enter the price" }]}
                        >
                            <InputNumber min={1} prefix="₹" style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: "Please enter the rating" }]}
                        >
                            <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[{ required: true, message: "Please enter the category" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: "Please enter the type" }]}
                        >
                            <Select>
                                <Select.Option value="Vegetarian">Vegetarian</Select.Option>
                                <Select.Option value="Non-Vegetarian">Non-Vegetarian</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Cuisine Type"
                            name="cuisineType"
                            rules={[{ required: true, message: "Please enter the cuisine type" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Distance"
                            name="distance"
                            rules={[{ required: true, message: "Please enter the distance" }]}
                        >
                            <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button
                                style={{ marginLeft: "10px" }}
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Card>
        </div>
    );
};

export default FoodDetails;
