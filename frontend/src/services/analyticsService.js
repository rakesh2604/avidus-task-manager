import API from './api';

export const getDashboardStats = async () => {
  const { data } = await API.get('/analytics/dashboard');
  return data.data;
};
