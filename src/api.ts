import axios from 'axios';

// Create an axios instance pointing to your Spring Boot backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Interceptor to automatically attach JWT token to every request if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;

