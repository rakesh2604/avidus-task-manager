import Card from '../common/Card';
import { FiUsers, FiUserCheck, FiUserX, FiList, FiCheckSquare, FiClock } from 'react-icons/fi';

const statConfig = [
  { key: 'totalUsers', label: 'Total Users', icon: FiUsers, color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'activeUsers', label: 'Active Users', icon: FiUserCheck, color: 'text-green-600', bg: 'bg-green-50' },
  { key: 'inactiveUsers', label: 'Inactive Users', icon: FiUserX, color: 'text-red-600', bg: 'bg-red-50' },
  { key: 'totalTasks', label: 'Total Tasks', icon: FiList, color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'completedTasks', label: 'Completed Tasks', icon: FiCheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { key: 'pendingTasks', label: 'Pending Tasks', icon: FiClock, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const AnalyticsCards = ({ stats, loading }) => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {statConfig.map(({ key, label, icon: Icon, color, bg }) => (
      <Card key={key}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {loading ? '—' : (stats?.[key] ?? 0)}
            </p>
          </div>
          <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
            <Icon className={color} size={22} />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export default AnalyticsCards;
