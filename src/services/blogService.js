import axios from "axios";

const API_URL = "https://aoca-resources-backend.onrender.com";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Public endpoints
export const getBlogPosts = async () => {
  const response = await api.get("/blog/posts");
  console.log(response.data.posts);
  return response.data.posts;
};

export const getBlogPost = async (id) => {
  const response = await api.get(`/blog/posts/${id}`);
  return response.data;
};
