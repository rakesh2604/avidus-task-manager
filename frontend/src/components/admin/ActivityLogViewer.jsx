import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';
import { FiActivity } from 'react-icons/fi';

const actionMeta = {
  login: { label: 'Login', variant: 'brand' },
  task_create: { label: 'Task created', variant: 'success' },
  task_update: { label: 'Task updated', variant: 'warning' },
  task_delete: { label: 'Task deleted', variant: 'danger' },
};

const ActivityLogViewer = ({ logs, loading }) => {
  if (loading) return <SkeletonLoader type="table" count={5} />;

  if (!logs.length) {
    return (
      <EmptyState
        icon={FiActivity}
        title="No activity yet"
        description="System events will appear here as users interact with the app."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-slate-200/80">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              {['User', 'Action', 'Details', 'Time'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {logs.map((log) => {
              const meta = actionMeta[log.action] || {
                label: log.action,
                variant: 'default',
              };
              const initials = log.userId?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={log._id}
                  className="transition-colors hover:bg-slate-50/80"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white">
                        {initials || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {log.userId?.name || '—'}
                        </p>
                        <p className="text-xs text-slate-500">{log.userId?.email || ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={meta.variant}>{meta.label}</Badge>
                  </td>
                  <td className="max-w-xs truncate px-5 py-4 text-slate-600">
                    {log.details?.title || log.details?.taskId || '—'}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityLogViewer;
