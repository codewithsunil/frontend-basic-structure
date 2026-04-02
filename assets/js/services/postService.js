import { apiRequest } from "./apiService.js";

export const getPosts = () => apiRequest("/posts?_limit=5");

export const createPost = (data) =>
  apiRequest("/posts", { method: "POST", body: data });

export const updatePost = (id, data) =>
  apiRequest(`/posts/${id}`, { method: "PUT", body: data });

export const deletePost = (id) =>
  apiRequest(`/posts/${id}`, { method: "DELETE" });
