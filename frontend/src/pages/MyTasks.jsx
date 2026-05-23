import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import TaskList from '../components/user/TaskList';
import TaskForm from '../components/user/TaskForm';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { FiPlus } from 'react-icons/fi';

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
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const openCreate = () => { setEditTask(null); setShowModal(true); };
  const openEdit = (task) => { setEditTask(task); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditTask(null); };

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <Button onClick={openCreate}>
            <FiPlus size={16} /> New Task
          </Button>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2 mb-6">
          {['', 'Pending', 'Completed'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === s
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>

        <TaskList tasks={tasks} loading={loading} onEdit={openEdit} onDelete={setDeleteTarget} />
      </main>

      <Modal isOpen={showModal} onClose={closeModal} title={editTask ? 'Edit Task' : 'New Task'}>
        <TaskForm
          initial={editTask}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          loading={submitting}
        />
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Task">
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-medium">{deleteTarget?.title}</span>? This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" loading={submitting} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
};

export default MyTasks;
