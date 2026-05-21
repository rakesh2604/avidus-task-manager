import Loader from '../common/Loader';

const actionLabel = {
  login: { label: 'Login', color: 'bg-blue-100 text-blue-700' },
  task_create: { label: 'Task Created', color: 'bg-green-100 text-green-700' },
  task_update: { label: 'Task Updated', color: 'bg-amber-100 text-amber-700' },
  task_delete: { label: 'Task Deleted', color: 'bg-red-100 text-red-700' },
};

const ActivityLogViewer = ({ logs, loading }) => {
  if (loading) return <Loader fullScreen={false} />;
  if (!logs.length) return <p className="text-center py-10 text-gray-400">No activity found</p>;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {['User', 'Action', 'Details', 'Time'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">
          {logs.map((log) => {
            const meta = actionLabel[log.action] || { label: log.action, color: 'bg-gray-100 text-gray-700' };
            return (
              <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{log.userId?.name || '—'}</div>
                  <div className="text-xs text-gray-400">{log.userId?.email || ''}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${meta.color}`}>
                    {meta.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">
                  {log.details?.title || log.details?.taskId || '—'}
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogViewer;
