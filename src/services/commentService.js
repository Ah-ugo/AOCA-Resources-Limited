import axios from "axios";

const API_URL = "https://aoca-resources-backend.onrender.com";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXhwIjoxNzQzOTQ2Mjg3fQ.xXSMtoip5qp9SY7Zx3namek7PonsiL5_RIZ6UF8qKxc",
  },
});

export const addComment = async (id, body) => {
  const response = await api.post(`/blog/posts/${id}/comments`, body);
  return response.data;
};
