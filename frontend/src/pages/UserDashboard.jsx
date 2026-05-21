import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { getTasks } from '../services/taskService';
import { FiCheckSquare, FiClock, FiList } from 'react-icons/fi';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getTasks({ limit: 1000 });
        const tasks = data.tasks;
        setStats({
          total: tasks.length,
          completed: tasks.filter((t) => t.status === 'Completed').length,
          pending: tasks.filter((t) => t.status === 'Pending').length,
        });
      } catch {
        // silently fail stats
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Tasks', value: stats.total, icon: FiList, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: stats.completed, icon: FiCheckSquare, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending', value: stats.pending, icon: FiClock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-500 mt-1">Here&apos;s an overview of your tasks</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <Card key={label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {loading ? '—' : value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={color} size={22} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-gray-900">Tasks</h2>
            <Link to="/my-tasks" className="text-sm text-blue-600 hover:underline">
              Manage all →
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            You have <span className="font-medium text-amber-600">{stats.pending} pending</span> task{stats.pending !== 1 ? 's' : ''} remaining.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default UserDashboard;
