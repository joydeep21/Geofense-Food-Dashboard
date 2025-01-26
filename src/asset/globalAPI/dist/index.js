"use strict";
exports.__esModule = true;
exports.leaveDetails = exports.login = void 0;
var axios_1 = require("axios");
// import FormData from "form-data"; // Using ES6 import for consistency
// Set the base URL for the Axios instance
axios_1["default"].defaults.baseURL = "http://localhost:3006/api";
function login(data) {
    return axios_1["default"].post("/auth/login", data, {
        headers: { "Content-Type": "application/json" }
    });
}
exports.login = login;
function leaveDetails() {
    var token = localStorage.getItem("token");
    axios_1["default"].defaults.headers.common["Authorization"] = "Bearer " + token;
    return axios_1["default"].post("/users/leaveDetails", {
        headers: { "Content-Type": "application/json" }
    });
}
exports.leaveDetails = leaveDetails;
