import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'Admin' ? '/admin' : '/user-dashboard', { replace: true });
    }
  }, [user, navigate]);

  return <Loader />;
};

export default Dashboard;
