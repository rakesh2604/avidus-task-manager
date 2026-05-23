import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiGrid, FiUsers, FiCheckSquare, FiActivity, FiLogOut } from 'react-icons/fi';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, exact: true },
  { to: '/admin/users', label: 'Users', icon: FiUsers },
  { to: '/admin/tasks', label: 'Tasks', icon: FiCheckSquare },
  { to: '/admin/logs', label: 'Activity Logs', icon: FiActivity },
];

const userLinks = [
  { to: '/user-dashboard', label: 'Dashboard', icon: FiGrid },
  { to: '/my-tasks', label: 'My Tasks', icon: FiCheckSquare },
];

const Sidebar = ({ open, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = user?.role === 'Admin' ? adminLinks : userLinks;

  const isActive = (path, exact) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-30 h-full w-60 bg-white border-r border-[#F0F0F0] flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-[#F0F0F0] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">A</span>
            </div>
            <span className="font-bold text-[#1E1E2F] text-[15px] tracking-tight">
              Avidus<span className="text-brand">Tasks</span>
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {links.map(({ to, label, icon: Icon, exact }) => {
            const active = isActive(to, exact);
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                  active
                    ? 'bg-surface-alt text-brand'
                    : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#1E1E2F]'
                }`}
              >
                <Icon size={15} className="shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="px-3 pb-4 pt-3 border-t border-[#F0F0F0] shrink-0 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
            <div className="w-7 h-7 rounded-full bg-surface-alt flex items-center justify-center shrink-0">
              <span className="text-[12px] font-bold text-brand">
                {user?.name?.[0]?.toUpperCase()}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#1E1E2F] truncate leading-tight">{user?.name}</p>
              <p className="text-[11px] text-[#9CA3AF] truncate capitalize leading-snug">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="sidebar-signout flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] text-[#9CA3AF] transition-colors"
          >
            <FiLogOut size={14} className="shrink-0" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
