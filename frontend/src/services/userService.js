import API from './api';

export const getUsers = async (params = {}) => {
  const { data } = await API.get('/users', { params });
  return data.data;
};

export const updateUserStatus = async (id, status) => {
  const { data } = await API.patch(`/users/${id}/status`, { status });
  return data.data;
};

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/users/${id}`);
  return data;
};
