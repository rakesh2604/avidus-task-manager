import TaskCard from './TaskCard';
import SkeletonLoader from '../common/SkeletonLoader';
import EmptyState from '../ui/EmptyState';
import { FiCheckSquare } from 'react-icons/fi';

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) return <SkeletonLoader type="card" count={6} />;

  if (!tasks.length) {
    return (
      <EmptyState
        icon={FiCheckSquare}
        title="No tasks yet"
        description="Create your first task to start tracking your work."
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
