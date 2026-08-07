import axios from "axios";

const api = axios.create({
  baseURL: "https://crm-mock-api-yrpv.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;