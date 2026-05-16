import axios from 'axios';

// 1. Cria a ligação com o teu Back-end
export const api = axios.create({
  baseURL: 'http://localhost:4000', // Substitui a URL fictícia pela URL real do teu Node.js
});

// 2. Intercetor: injeta o Token automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});