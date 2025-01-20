import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSellers } from "../asset/globalAPI"; // Replace with your API import

const CreateRestaurant = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [location, setLocation] = useState("");
  const [assignedUser, setAssignedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

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

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("Restaurant_image", image);
    formData.append("address", address);
    formData.append("rating", rating.toString());
    formData.append("category", category);
    formData.append("type", type);
    formData.append("cuisineType", cuisineType);
    formData.append("location", location);
    formData.append("assignedUser", assignedUser || "");

    try {
      const response = await axios.post("/api/restaurant/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Restaurant created:", response.data);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f9f9f9" }}>
      <div style={{ width: "60%", background: "#fff", padding: "20px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Add Restaurant</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ fontWeight: "bold" }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Cuisine Type</label>
            <input
              type="text"
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Assign User</label>
            <select
              value={assignedUser || ""}
              onChange={(e) => setAssignedUser(e.target.value)}
              style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "4px" }}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            style={{
              background: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Create Restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;
