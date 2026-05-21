import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import ActivityLogViewer from '../components/admin/ActivityLogViewer';
import { getLogs } from '../services/logService';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchLogs = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (actionFilter) params.action = actionFilter;
      const data = await getLogs(params);
      setLogs(data.logs);
      setPagination(data.pagination);
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [actionFilter]);

  useEffect(() => { fetchLogs(1); }, [fetchLogs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-500 mt-1">{pagination.total} total events</p>
        </div>

        <Card className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: '', label: 'All' },
              { value: 'login', label: 'Login' },
              { value: 'task_create', label: 'Task Created' },
              { value: 'task_update', label: 'Task Updated' },
              { value: 'task_delete', label: 'Task Deleted' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setActionFilter(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  actionFilter === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Card>

        <ActivityLogViewer logs={logs} loading={loading} />

        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => fetchLogs(p)}
                className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                  p === pagination.page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ActivityLogs;
