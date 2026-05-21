import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/common/Navbar';
import Card from '../components/common/Card';
import TaskMonitor from '../components/admin/TaskMonitor';
import { getTasks } from '../services/taskService';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchTasks = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (statusFilter) params.status = statusFilter;
      const data = await getTasks(params);
      setTasks(data.tasks);
      setPagination(data.pagination);
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { fetchTasks(1); }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Task Monitoring</h1>
          <p className="text-gray-500 mt-1">{pagination.total} total tasks</p>
        </div>

        <Card className="mb-6">
          <div className="flex gap-2">
            {['', 'Pending', 'Completed'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  statusFilter === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s || 'All'}
              </button>
            ))}
          </div>
        </Card>

        <TaskMonitor tasks={tasks} loading={loading} />

        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => fetchTasks(p)}
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

export default TaskManagement;
