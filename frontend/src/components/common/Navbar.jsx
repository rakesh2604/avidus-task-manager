import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path, exact = false) =>
    exact ? location.pathname === path : location.pathname === path || location.pathname.startsWith(path + '/');

  const linkClass = (path, exact = false) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path, exact)
        ? 'bg-blue-700 text-white'
        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
    }`;

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-white font-bold text-lg tracking-tight">
              TaskManager
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              {user?.role === 'Admin' ? (
                <>
                  <Link to="/admin" className={linkClass('/admin', true)}>Dashboard</Link>
                  <Link to="/admin/users" className={linkClass('/admin/users')}>Users</Link>
                  <Link to="/admin/tasks" className={linkClass('/admin/tasks')}>Tasks</Link>
                  <Link to="/admin/logs" className={linkClass('/admin/logs')}>Logs</Link>
                </>
              ) : (
                <>
                  <Link to="/user-dashboard" className={linkClass('/user-dashboard')}>Dashboard</Link>
                  <Link to="/my-tasks" className={linkClass('/my-tasks')}>My Tasks</Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-blue-100 text-sm">
              <FiUser size={15} />
              {user?.name}
              <span className="ml-1 px-2 py-0.5 bg-blue-800 rounded-full text-xs">
                {user?.role}
              </span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-blue-100 hover:text-white text-sm transition-colors"
            >
              <FiLogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
