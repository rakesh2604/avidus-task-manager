import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/common/AppLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import AnalyticsCards from '../components/admin/AnalyticsCards';
import ActivityLogViewer from '../components/admin/ActivityLogViewer';
import SkeletonLoader from '../components/common/SkeletonLoader';
import { getDashboardStats } from '../services/analyticsService';
import { getLogs } from '../services/logService';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .finally(() => setStatsLoading(false));

    getLogs({ limit: 10 })
      .then((d) => setLogs(d.logs))
      .finally(() => setLogsLoading(false));
  }, []);

  return (
    <AppLayout title="Dashboard">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <PageHeader
          title="Admin Dashboard"
          subtitle="System overview, metrics, and recent activity"
        />

        <section className="mb-8">
          <AnalyticsCards stats={stats} loading={statsLoading} />
        </section>

        {statsLoading ? (
          <div className="mb-8 grid gap-5 sm:grid-cols-2">
            <SkeletonLoader type="stats" count={2} />
          </div>
        ) : stats ? (
          <section className="mb-8 grid gap-5 sm:grid-cols-2">
            <Card hover className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-4 -translate-y-4 rounded-full bg-brand-50" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Today&apos;s logins</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                    {stats.recentActivity?.todayLogins ?? 0}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <FiTrendingUp size={20} />
                </div>
              </div>
            </Card>
            <Card hover className="relative overflow-hidden">
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-4 -translate-y-4 rounded-full bg-violet-50" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Tasks created today</p>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                    {stats.recentActivity?.todayTasksCreated ?? 0}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <FiTrendingUp size={20} />
                </div>
              </div>
            </Card>
          </section>
        ) : null}

        <Card>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Recent activity</h2>
              <p className="text-sm text-slate-500">Latest system events across all users</p>
            </div>
            <Link
              to="/admin/logs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              View all <FiArrowRight size={14} />
            </Link>
          </div>
          <ActivityLogViewer logs={logs} loading={logsLoading} />
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminDashboard;
