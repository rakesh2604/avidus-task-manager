import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'Admin') return <Navigate to="/dashboard" replace />;
  return children;
};

export default AdminRoute;
