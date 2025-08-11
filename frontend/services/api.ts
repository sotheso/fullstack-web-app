import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
// Respect basePath on hard redirects when unauthorized
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = `${BASE_PATH}/login`;
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data),
  
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  
  getCurrentUser: () => api.get('/auth/me'),
};

export const userAPI = {
  getAllUsers: () => api.get('/users'),
  getUserById: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: { username?: string; email?: string }) =>
    api.put(`/users/${id}`, data),
};

export const brandsAPI = {
  getAllBrands: () => api.get('/brands'),
  getBrandById: (id: number) => api.get(`/brands/${id}`),
  createBrand: (data: { description: string; brandName: string; brandField: string; avatarSrc?: string }) =>
    api.post('/brands', data),
  updateBrand: (id: number, data: { description?: string; brandName?: string; brandField?: string; avatarSrc?: string }) =>
    api.put(`/brands/${id}`, data),
  deleteBrand: (id: number) => api.delete(`/brands/${id}`),
};

export const eventsAPI = {
  getAllEvents: () => api.get('/events'),
  getEventById: (id: number) => api.get(`/events/${id}`),
  createEvent: (data: { image?: string; eventName: string; description: string; date: string; tags?: string[]; filterTag?: string; detailsLink?: string }) =>
    api.post('/events', data),
  updateEvent: (id: number, data: { image?: string; eventName?: string; description?: string; date?: string; tags?: string[]; filterTag?: string; detailsLink?: string }) =>
    api.put(`/events/${id}`, data),
  deleteEvent: (id: number) => api.delete(`/events/${id}`),
};

export const bannersAPI = {
  getAllBanners: () => api.get('/banners'),
  getBannerById: (id: number) => api.get(`/banners/${id}`),
  createBanner: (data: { image?: string; date: string; tags?: string[]; eventName: string; eventDescription: string; detailsLink?: string }) =>
    api.post('/banners', data),
  updateBanner: (id: number, data: { image?: string; date?: string; tags?: string[]; eventName?: string; eventDescription?: string; detailsLink?: string }) =>
    api.put(`/banners/${id}`, data),
  deleteBanner: (id: number) => api.delete(`/banners/${id}`),
};

export default api; 