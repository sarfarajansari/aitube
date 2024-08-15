import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "https://edutube-fastapi.onrender.com",
  baseURL:'https://edutubeapi.azurewebsites.net'
  // baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
