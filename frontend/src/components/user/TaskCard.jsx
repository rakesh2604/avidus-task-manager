import { FiEdit2, FiTrash2, FiClock, FiCheckCircle } from 'react-icons/fi';
import Button from '../common/Button';
import Badge from '../ui/Badge';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <article
      className={`group rounded-2xl border bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] ${
        isCompleted ? 'border-emerald-200/80 opacity-90' : 'border-slate-200/80'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-2">
            {isCompleted ? (
              <FiCheckCircle className="shrink-0 text-emerald-500" size={16} />
            ) : (
              <FiClock className="shrink-0 text-amber-500" size={16} />
            )}
            <Badge variant={isCompleted ? 'success' : 'warning'}>{task.status}</Badge>
          </div>
          <h3
            className={`truncate font-semibold text-slate-900 ${
              isCompleted ? 'text-slate-400 line-through' : ''
            }`}
          >
            {task.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {task.description}
          </p>
          <p className="mt-3 text-xs font-medium text-slate-400">
            {new Date(task.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
        <div className="flex shrink-0 gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
            <FiEdit2 size={14} />
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(task)}>
            <FiTrash2 size={14} />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
