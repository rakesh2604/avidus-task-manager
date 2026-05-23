import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';
import { FiCheckSquare } from 'react-icons/fi';

const TaskMonitor = ({ tasks, loading }) => {
  if (loading) return <SkeletonLoader type="table" count={6} />;

  if (!tasks.length) {
    return (
      <EmptyState
        icon={FiCheckSquare}
        title="No tasks found"
        description="Tasks created by users will appear here for monitoring."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-slate-200/80">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              {['Title', 'Description', 'Status', 'Owner', 'Created'].map((h) => (
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
            {tasks.map((task) => (
              <tr key={task._id} className="transition-colors hover:bg-slate-50/80">
                <td className="max-w-[200px] truncate px-5 py-4 font-medium text-slate-900">
                  {task.title}
                </td>
                <td className="max-w-xs truncate px-5 py-4 text-slate-600">
                  {task.description}
                </td>
                <td className="px-5 py-4">
                  <Badge variant={task.status === 'Completed' ? 'success' : 'warning'}>
                    {task.status}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-slate-700">{task.userId?.name || '—'}</td>
                <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskMonitor;
