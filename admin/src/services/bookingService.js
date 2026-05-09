import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const bookingApi = axios.create({
  baseURL: API_BASE_URL,
});

bookingApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAdminBookings = () => bookingApi.get('/bookings/admin/all');
export const updateBookingStatus = (id, status) => bookingApi.patch(`/bookings/admin/${id}/status`, { status });
export const deleteBooking = (id) => bookingApi.delete(`/bookings/admin/${id}`);
