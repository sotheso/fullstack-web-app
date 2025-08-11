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
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
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

export default api; 