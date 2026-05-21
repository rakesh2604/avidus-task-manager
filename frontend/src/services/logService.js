import API from './api';

export const getLogs = async (params = {}) => {
  const { data } = await API.get('/logs', { params });
  return data.data;
};
