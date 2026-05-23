import Card from '../common/Card';
import SkeletonLoader from '../common/SkeletonLoader';
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiList,
  FiCheckSquare,
  FiClock,
} from 'react-icons/fi';

const statConfig = [
  { key: 'totalUsers', label: 'Total users', icon: FiUsers, iconBg: 'bg-brand-50', iconColor: 'text-brand-600' },
  { key: 'activeUsers', label: 'Active users', icon: FiUserCheck, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { key: 'inactiveUsers', label: 'Inactive users', icon: FiUserX, iconBg: 'bg-red-50', iconColor: 'text-red-600' },
  { key: 'totalTasks', label: 'Total tasks', icon: FiList, iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
  { key: 'completedTasks', label: 'Completed', icon: FiCheckSquare, iconBg: 'bg-teal-50', iconColor: 'text-teal-600' },
  { key: 'pendingTasks', label: 'Pending', icon: FiClock, iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
];

const AnalyticsCards = ({ stats, loading }) => {
  if (loading) return <SkeletonLoader type="stats" count={6} />;

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {statConfig.map(({ key, label, icon: Icon, iconBg, iconColor }) => (
        <Card key={key} hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {stats?.[key] ?? 0}
              </p>
            </div>
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
            >
              <Icon className={iconColor} size={22} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnalyticsCards;
