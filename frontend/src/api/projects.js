import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const getProjects = async () => {
  const res = await axios.get(`${API_URL}/api/projects`);
  return res.data;
};

export const getFeaturedProjects = async () => {
  const res = await axios.get(`${API_URL}/api/projects/featured`);
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await axios.get(`${API_URL}/api/projects/${id}`);
  return res.data;
};