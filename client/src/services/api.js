import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const fetchBugs = () => API.get('/bugs');
export const createBug = (payload) => API.post('/bugs', payload);
export const updateBug = (id, payload) => API.patch(`/bugs/${id}`, payload);
export const deleteBug = (id) => API.delete(`/bugs/${id}`);
