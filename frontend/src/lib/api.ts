import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { ApiError, ApiResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (refreshToken) {
          const response = await axios.post<ApiResponse<{ accessToken: string }>>(
            `${API_URL}/api/auth/refresh`,
            { refreshToken }
          );

          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);

          // Retry the original request with the new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
      });
    }

    // Return error with proper structure
    return Promise.reject(error.response?.data || { message: 'An error occurred' });
  }
);

// Typed API methods
export const apiClient = {
  get: <T>(url: string, config?: object) => 
    api.get<ApiResponse<T>>(url, config).then(res => res.data),
  
  post: <T>(url: string, data?: object, config?: object) => 
    api.post<ApiResponse<T>>(url, data, config).then(res => res.data),
  
  put: <T>(url: string, data?: object, config?: object) => 
    api.put<ApiResponse<T>>(url, data, config).then(res => res.data),
  
  patch: <T>(url: string, data?: object, config?: object) => 
    api.patch<ApiResponse<T>>(url, data, config).then(res => res.data),
  
  delete: <T>(url: string, config?: object) => 
    api.delete<ApiResponse<T>>(url, config).then(res => res.data),
};

export default api;
