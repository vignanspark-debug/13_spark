import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cp_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const locationsAPI = {
  getAll: () => api.get('/locations').then(res => res.data),
  getById: (id) => api.get(`/locations/${id}`).then(res => res.data),
  create: (data) => api.post('/locations', data).then(res => res.data),
  update: (id, data) => api.put(`/locations/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/locations/${id}`).then(res => res.data)
};

export const qrAPI = {
  getAll: () => api.get('/qr').then(res => res.data),
  getById: (id) => api.get(`/qr/${id}`).then(res => res.data),
  getAnchoredLocation: (code) => api.get(`/qr/${code}/location`).then(res => res.data),
  create: (data) => api.post('/qr', data).then(res => res.data),
  update: (id, data) => api.put(`/qr/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/qr/${id}`).then(res => res.data)
};

export const navigationAPI = {
  getRoute: (currentLocation, destination, mode = 'normal') =>
    api.post('/navigation/route', { currentLocation, destination, mode }).then(res => res.data)
};

export const assistantAPI = {
  recommend: (query, currentLocationId = null) =>
    api.post('/assistant/recommend', { query, currentLocationId }).then(res => res.data)
};

export const facilitiesAPI = {
  getAll: () => api.get('/facilities').then(res => res.data),
  getById: (id) => api.get(`/facilities/${id}`).then(res => res.data),
  create: (data) => api.post('/facilities', data).then(res => res.data),
  update: (id, data) => api.put(`/facilities/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/facilities/${id}`).then(res => res.data)
};

export const conditionsAPI = {
  getAll: () => api.get('/conditions').then(res => res.data),
  create: (data) => api.post('/conditions', data).then(res => res.data),
  update: (id, data) => api.put(`/conditions/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/conditions/${id}`).then(res => res.data),
  closePath: (id, closureReason) => api.post(`/conditions/${id}/close`, { closureReason }).then(res => res.data),
  reopenPath: (id) => api.post(`/conditions/${id}/reopen`).then(res => res.data)
};

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }).then(res => res.data),
  register: (data) => api.post('/auth/register', typeof data === 'object' ? data : { name: data, email: arguments[1], password: arguments[2] }).then(res => res.data),
  getMe: () => api.get('/auth/me').then(res => res.data)
};

export const networkAPI = {
  getNetwork: () => api.get('/network').then(res => res.data),
  resetDatabase: () => api.post('/admin/reset').then(res => res.data),
  togglePath: (edgeId, isClosed, closureReason) => api.patch(`/admin/paths/${edgeId}/toggle`, { isClosed, closureReason }).then(res => res.data)
};

export default api;
