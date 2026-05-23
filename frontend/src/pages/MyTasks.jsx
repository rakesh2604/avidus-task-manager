import { useState, useEffect, useCallback } from 'react';
import AppLayout from '../components/common/AppLayout';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import FilterPills from '../components/ui/FilterPills';
import TaskList from '../components/user/TaskList';
import TaskForm from '../components/user/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { FiPlus } from 'react-icons/fi';

const filterOptions = [
  { value: '', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Completed', label: 'Completed' },
];

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter ? { status: filter } : {};
      const data = await getTasks({ ...params, limit: 100 });
      setTasks(data.tasks);
      setError('');
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const openCreate = () => {
    setEditTask(null);
    setShowModal(true);
  };
  const openEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditTask(null);
  };

  const handleSubmit = async (form) => {
    setSubmitting(true);
    setError('');
    try {
      if (editTask) {
        await updateTask(editTask._id, form);
      } else {
        await createTask(form);
      }
      closeModal();
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    try {
      await deleteTask(deleteTarget._id);
      setDeleteTarget(null);
      fetchTasks();
    } catch {
      setError('Delete failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout title="My Tasks">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <PageHeader
          title="My Tasks"
          subtitle={`${tasks.length} task${tasks.length !== 1 ? 's' : ''} in view`}
          action={
            <Button onClick={openCreate}>
              <FiPlus size={16} /> New task
            </Button>
          }
        />

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="mb-8">
          <FilterPills options={filterOptions} value={filter} onChange={setFilter} />
        </div>

        <TaskList tasks={tasks} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />
      </div>

      <Modal isOpen={showModal} onClose={closeModal} title={editTask ? 'Edit task' : 'New task'}>
        <TaskForm
          initial={editTask}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={submitting}
        />
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete task">
        <p className="mb-6 text-sm leading-relaxed text-slate-600">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-slate-900">{deleteTarget?.title}</span>? This
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button variant="danger" loading={submitting} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </AppLayout>
  );
};

export default MyTasks;
