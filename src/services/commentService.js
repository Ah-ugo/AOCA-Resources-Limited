import axios from "axios";

const API_URL = "https://aoca-resources-backend.onrender.com";
const token = localStorage.getItem("token");

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const addComment = async (id, body) => {
  const response = await api.post(`/blog/posts/${id}/comments`, body);
  return response.data;
};
