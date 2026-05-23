import Loader from '../common/Loader';

const TaskMonitor = ({ tasks, loading }) => {
  if (loading) return <Loader fullScreen={false} />;
  if (!tasks.length) return <p className="text-center py-10 text-gray-400">No tasks found</p>;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {['Title', 'Description', 'Status', 'User', 'Created'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 bg-white">
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{task.title}</td>
              <td className="px-4 py-3 text-gray-500 max-w-sm truncate">{task.description}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {task.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {task.userId?.name || '—'}
              </td>
              <td className="px-4 py-3 text-gray-400 text-xs">
                {new Date(task.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskMonitor;
