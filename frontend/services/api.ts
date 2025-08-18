import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);



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

export const storiesAPI = {
  getAllStories: () => api.get('/stories'),
  getStoryById: (id: number) => api.get(`/stories/${id}`),
  createStory: (data: { eventName: string; profileImage?: string; posterImage?: string }) =>
    api.post('/stories', data),
  updateStory: (id: number, data: { eventName?: string; profileImage?: string; posterImage?: string }) =>
    api.put(`/stories/${id}`, data),
  deleteStory: (id: number) => api.delete(`/stories/${id}`),
};

export default api; 