import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import AnalyticsCards from '../components/admin/AnalyticsCards';
import { getDashboardStats } from '../services/analyticsService';
import { getLogs } from '../services/logService';
import ActivityLogViewer from '../components/admin/ActivityLogViewer';

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">System overview</p>
        </div>

        <div className="mb-8">
          <AnalyticsCards stats={stats} loading={statsLoading} />
        </div>

        {stats && (
          <div className="grid gap-5 sm:grid-cols-2 mb-8">
            <Card>
              <p className="text-sm text-gray-500">Today&apos;s Logins</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.recentActivity?.todayLogins ?? 0}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-gray-500">Tasks Created Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.recentActivity?.todayTasksCreated ?? 0}
              </p>
            </Card>
          </div>
        )}

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Activity</h2>
            <Link to="/admin/logs" className="text-sm text-blue-600 hover:underline">
              View all →
            </Link>
          </div>
          <ActivityLogViewer logs={logs} loading={logsLoading} />
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
