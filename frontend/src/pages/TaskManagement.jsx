import { useState, useEffect, useCallback } from 'react';
import AppLayout from '../components/common/AppLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import TaskMonitor from '../components/admin/TaskMonitor';
import FilterPills from '../components/ui/FilterPills';
import Pagination from '../components/ui/Pagination';
import { getTasks } from '../services/taskService';

const filterOptions = [
  { value: '', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Completed', label: 'Completed' },
];

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchTasks = useCallback(
    async (page = 1) => {
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
    },
    [statusFilter]
  );

  useEffect(() => {
    fetchTasks(1);
  }, [fetchTasks]);

  return (
    <AppLayout title="Tasks">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <PageHeader
          title="Task monitoring"
          subtitle={`${pagination.total} total tasks across all users`}
        />

        <Card className="mb-6">
          <FilterPills
            options={filterOptions}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </Card>

        <TaskMonitor tasks={tasks} loading={loading} />

        <Pagination
          page={pagination.page}
          pages={pagination.pages}
          onChange={fetchTasks}
        />
      </div>
    </AppLayout>
  );
};

export default TaskManagement;
