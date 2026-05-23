import { useState, useEffect, useCallback } from 'react';
import AppLayout from '../components/common/AppLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import ActivityLogViewer from '../components/admin/ActivityLogViewer';
import FilterPills from '../components/ui/FilterPills';
import Pagination from '../components/ui/Pagination';
import { getLogs } from '../services/logService';

const filterOptions = [
  { value: '', label: 'All' },
  { value: 'login', label: 'Login' },
  { value: 'task_create', label: 'Created' },
  { value: 'task_update', label: 'Updated' },
  { value: 'task_delete', label: 'Deleted' },
];

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchLogs = useCallback(
    async (page = 1) => {
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
    },
    [actionFilter]
  );

  useEffect(() => {
    fetchLogs(1);
  }, [fetchLogs]);

  return (
    <AppLayout title="Activity">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <PageHeader
          title="Activity logs"
          subtitle={`${pagination.total} total events recorded`}
        />

        <Card className="mb-6">
          <FilterPills
            options={filterOptions}
            value={actionFilter}
            onChange={setActionFilter}
          />
        </Card>

        <ActivityLogViewer logs={logs} loading={loading} />

        <Pagination
          page={pagination.page}
          pages={pagination.pages}
          onChange={fetchLogs}
        />
      </div>
    </AppLayout>
  );
};

export default ActivityLogs;
