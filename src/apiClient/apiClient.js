import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://edutube-fastapi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
