import axios from "axios";
// import FormData from "form-data"; // Using ES6 import for consistency

// Set the base URL for the Axios instance
axios.defaults.baseURL = "http://localhost:3006/api";
// Uncomment the following line to switch to production environment
// axios.defaults.baseURL = "https://task-manger-backend-skr2.onrender.com/web";

export interface LoginRequest {
  mobileNumber: string,
  password: string,
  role: string,
}

export function login(data: LoginRequest) {
  return axios.post("/auth/login", data, {
    headers: { "Content-Type": "application/json" },
  });
}
export function getAllUsers() {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/admin/getUsers", {
    headers: { "Content-Type": "application/json" },
  });
}
export function getSellers() {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/admin/getsellers", {
    headers: { "Content-Type": "application/json" },
  });
}
export function addUser(data:any) {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.post("/admin/addUser",data, {
    headers: { "Content-Type": "application/json" },
  });
}
export function leaveDetails() {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/admin/getUsers", {
    headers: { "Content-Type": "application/json" },
  });
}
export function resturentAdd(data:any) {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  console.log("data is ",data);
  return axios.post("/restaurant/add", data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function resturentAndfoods() {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/restaurant/getRestaurantAndFoods",{
    headers: { "Content-Type": "application/json" },
  });
}

export function foodAdd(data:any) {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.post("/food/add", data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updateFood(id:any,data:any) {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.put(`/food/update/${id}`, data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function foodDetailsById(data:any) {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get(`/food/foods/${data}`,{
    headers: { "Content-Type": "application/json" },
  });
}

export function getAllrestaurents() {
  let token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/restaurant/getAllResturents", {
    headers: { "Content-Type": "application/json" },
  });
}