import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiGrid,
  FiUsers,
  FiCheckSquare,
  FiActivity,
  FiLogOut,
  FiX,
} from 'react-icons/fi';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, exact: true },
  { to: '/admin/users', label: 'Users', icon: FiUsers },
  { to: '/admin/tasks', label: 'Tasks', icon: FiCheckSquare },
  { to: '/admin/logs', label: 'Activity Logs', icon: FiActivity },
];

const userLinks = [
  { to: '/user-dashboard', label: 'Dashboard', icon: FiGrid, exact: true },
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

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const navContent = (
    <>
      <div className="flex h-16 items-center justify-between border-b border-slate-200/80 px-5 shrink-0">
        <Link to={user?.role === 'Admin' ? '/admin' : '/user-dashboard'} className="flex items-center gap-2.5" onClick={onClose}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white shadow-sm">
            A
          </div>
          <span className="text-[15px] font-bold tracking-tight text-slate-900">
            Avidus<span className="text-brand-600">Tasks</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
          aria-label="Close menu"
        >
          <FiX size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Menu
        </p>
        {links.map(({ to, label, icon: Icon, exact }) => {
          const active = isActive(to, exact);
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                active
                  ? 'bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={16} className={active ? 'text-brand-600' : 'text-slate-400'} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-slate-200/80 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-slate-200/60">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="truncate text-xs capitalize text-slate-500">{user?.role}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <FiLogOut size={15} />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>
    </>
  );
};

export default Sidebar;
