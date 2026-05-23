import API from './api';

export const getTasks = async (params = {}) => {
  const { data } = await API.get('/tasks', { params });
  return data.data;
};

export const getTaskById = async (id) => {
  const { data } = await API.get(`/tasks/${id}`);
  return data.data;
};

export const createTask = async (payload) => {
  const { data } = await API.post('/tasks', payload);
  return data.data;
};

export const updateTask = async (id, payload) => {
  const { data } = await API.patch(`/tasks/${id}`, payload);
  return data.data;
};

export const deleteTask = async (id) => {
  const { data } = await API.delete(`/tasks/${id}`);
  return data;
};
