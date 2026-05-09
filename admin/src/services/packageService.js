import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const packageApi = axios.create({
  baseURL: API_BASE_URL,
});

packageApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAdminPackages = () => packageApi.get('/packages/admin/all');
export const createPackage = (data) => packageApi.post('/packages', data);
export const updatePackage = (id, data) => packageApi.put(`/packages/${id}`, data);
export const deletePackage = (id) => packageApi.delete(`/packages/${id}`);
export const togglePackagePublish = (id) => packageApi.patch(`/packages/${id}/toggle-publish`);
export const togglePackageFeatured = (id) => packageApi.patch(`/packages/${id}/toggle-featured`);
