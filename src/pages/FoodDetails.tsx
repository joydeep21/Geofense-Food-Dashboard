import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateFood } from "../asset/globalAPI"; // Replace with your API import
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
    InputNumber,
    Button,
    Select,
    message,
    Upload
} from "antd";
import { foodDetailsById } from "../asset/globalAPI"; // Replace with your API import

const { Title } = Typography;

interface FoodDetailsProps {
    _id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    category: string;
    type: string;
    cuisineType: string;
}

const FoodDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [foodData, setFoodData] = useState<FoodDetailsProps | null>(null); // Renamed
    const [image, setImage] = useState<File | null>(null);
    const [imageName, setImageName] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>(""); // Preview for the new image

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
    const handleImageUpload = (file: any) => {
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Set the preview URL
        setImageName(file.name); // Set file name
        return false; // Prevent automatic upload
    };

    const handleAddFood = async (values: any) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", values.name);
        if (image) formData.append("image", image);
        formData.append("price", values.price);
        formData.append("rating", values.rating);
        formData.append("category", values.category);
        formData.append("type", values.type);
        formData.append("cuisineType", values.cuisineType);

        try {
            await updateFood(foodData?._id, formData);
            message.success("Food added successfully");
            form.resetFields();
            setImage(null);
            setImageName("");
        } catch (error) {
            message.error("Failed to update food");
        } finally {
            setLoading(false);
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
                    <Form form={form} layout="vertical" onFinish={handleAddFood}>
                        <Form.Item label="Current Image">
                            <Image
                                src={foodData?.image}
                                alt="Current Food Image"
                                style={{ borderRadius: "12px", marginBottom: "10px" }}
                            />
                        </Form.Item>
                        {imagePreview && (
                            <Form.Item label="New Image Preview">
                                <Image
                                    src={imagePreview}
                                    alt="New Food Image Preview"
                                    style={{ borderRadius: "12px", marginBottom: "10px" }}
                                />
                            </Form.Item>
                        )}
                        <Form.Item label="Food Image" rules={[{ required: true, message: "Please upload a New image!" }]}>
                            <Upload
                                showUploadList={false}
                                customRequest={(options) => handleImageUpload(options.file)}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                            {imageName && <p style={{ marginTop: "10px" }}>{imageName}</p>}
                        </Form.Item>
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
