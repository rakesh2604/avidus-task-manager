import TaskCard from './TaskCard';
import Loader from '../common/Loader';

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) return <Loader fullScreen={false} />;

  if (!tasks.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm mt-1">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
