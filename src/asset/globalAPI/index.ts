import axios from "axios";
// import FormData from "form-data"; // Using ES6 import for consistency

// Set the base URL for the Axios instance
axios.defaults.baseURL = "http://localhost:3006/api";
// axios.defaults.baseURL = "https://web.sensegeofence.com/api";
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
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/admin/getUsers", {
    headers: { "Content-Type": "application/json" },
  });
}
export function getSellers() {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/admin/getsellers", {
    headers: { "Content-Type": "application/json" },
  });
}
export function addUser(data:any) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.post("/admin/addUser",data, {
    headers: { "Content-Type": "application/json" },
  });
}
export function leaveDetails() {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/admin/getUsers", {
    headers: { "Content-Type": "application/json" },
  });
}
export function resturentAdd(data:any) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  console.log("data is ",data);
  return axios.post("/restaurant/add", data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function resturentAndfoods() {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/restaurant/getRestaurantAndFoods",{
    headers: { "Content-Type": "application/json" },
  });
}

export function foodAdd(data:any) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.post("/food/add", data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function updateFood(id:any,data:any) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.put(`/food/update/${id}`, data,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function foodDetailsById(data:any) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get(`/food/foods/${data}`,{
    headers: { "Content-Type": "application/json" },
  });
}

export function getAllrestaurents() {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.get("/restaurant/getAllResturents", {
    headers: { "Content-Type": "application/json" },
  });
}


export function deleteUser(id:string) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.delete(`/users/delete/${id}`,{
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function updateUser(id:string,userData: any) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.put(`/users/update/${id}`,userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteFood(id:string) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.delete(`/food/foods/${id}`,{
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function updateRestaurents(id:string,userData: any) {
  const token = localStorage.getItem("token"); 
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axios.put(`/restaurant/update/${id}`,userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}