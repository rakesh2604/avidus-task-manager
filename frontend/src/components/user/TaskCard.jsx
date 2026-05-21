import { FiEdit2, FiTrash2, FiClock, FiCheckCircle } from 'react-icons/fi';
import Button from '../common/Button';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <div className={`bg-white rounded-xl border p-5 shadow-sm transition-all ${isCompleted ? 'border-green-200 opacity-80' : 'border-gray-100'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isCompleted ? (
              <FiCheckCircle className="text-green-500 shrink-0" size={16} />
            ) : (
              <FiClock className="text-amber-500 shrink-0" size={16} />
            )}
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isCompleted ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}
            >
              {task.status}
            </span>
          </div>
          <h3 className={`font-semibold text-gray-900 truncate ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-1 shrink-0">
          <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
            <FiEdit2 size={14} />
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(task)}>
            <FiTrash2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
