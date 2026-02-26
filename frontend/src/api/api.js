import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

/* =======================
   PROJECTS
======================= */

// Get all projects
export const getProjects = async () => {
  try {
    const res = await api.get('/projects');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch projects', error);
    throw error;
  }
};

// Create project (Admin)
export const createProject = async (data, token) => {
  try {
    const res = await api.post('/projects', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to create project', error);
    throw error;
  }
};

/* =======================
   CONTACT
======================= */

export const sendContact = async (payload) => {
  try {
    const res = await api.post('/contact', payload);
    return res.data;
  } catch (error) {
    console.error('Failed to send contact form', error);
    throw error;
  }
};

/* =======================
   AUTH
======================= */

export const login = async (creds) => {
  try {
    const res = await api.post('/auth/login', creds);
    return res.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};
