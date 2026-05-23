import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/common/AppLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { getTasks } from '../services/taskService';
import { FiCheckSquare, FiClock, FiList, FiArrowRight, FiPlus } from 'react-icons/fi';
import Button from '../components/common/Button';

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
        /* stats optional */
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total tasks',
      value: stats.total,
      icon: FiList,
      iconBg: 'bg-brand-50',
      iconColor: 'text-brand-600',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: FiCheckSquare,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: FiClock,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <AppLayout title="Dashboard">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <PageHeader
          title={`Welcome back, ${firstName}`}
          subtitle="Here's an overview of your task progress"
          action={
            <Link to="/my-tasks">
              <Button>
                <FiPlus size={16} /> New task
              </Button>
            </Link>
          }
        />

        {loading ? (
          <SkeletonLoader type="stats" count={3} />
        ) : (
          <div className="mb-8 grid gap-5 sm:grid-cols-3">
            {statCards.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
              <Card key={label} hover>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                      {value}
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
        )}

        <Card className="bg-gradient-to-br from-brand-50/80 to-violet-50/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Your tasks</h2>
              <p className="mt-1 text-sm text-slate-600">
                You have{' '}
                <span className="font-semibold text-amber-600">
                  {stats.pending} pending
                </span>{' '}
                task{stats.pending !== 1 ? 's' : ''} remaining.
              </p>
            </div>
            <Link to="/my-tasks">
              <Button variant="outline">
                Manage tasks <FiArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UserDashboard;
