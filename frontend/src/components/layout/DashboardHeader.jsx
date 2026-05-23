import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Badge from '../ui/Badge';

const DashboardHeader = ({ onMenuClick, title }) => {
  const { user } = useAuth();
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 lg:hidden"
          aria-label="Open menu"
        >
          <FiMenu size={20} />
        </button>
        {title && (
          <h2 className="truncate text-base font-semibold text-slate-900 lg:hidden">
            {title}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={user?.role === 'Admin' ? 'purple' : 'brand'}>
          {user?.role}
        </Badge>
        <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 py-1.5 pl-1.5 pr-3 ring-1 ring-slate-200/80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white">
            {initials}
          </div>
          <span className="hidden max-w-[120px] truncate text-sm font-medium text-slate-800 sm:block">
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
