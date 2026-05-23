import API from './api';

export const register = async (name, email, password) => {
  const { data } = await API.post('/auth/register', { name, email, password });
  return data.data;
};

export const login = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data.data;
};

export const getMe = async () => {
  const { data } = await API.get('/auth/me');
  return data.data;
};
