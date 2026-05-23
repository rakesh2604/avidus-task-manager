import { useState, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../ui/Input';

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15';

const TaskForm = ({ initial = null, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        description: initial.description,
        status: initial.status,
      });
    } else {
      setForm({ title: '', description: '', status: 'Pending' });
    }
  }, [initial]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title"
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="What needs to be done?"
      />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Add more details..."
          className={`${fieldClass} resize-none`}
        />
      </div>
      {initial && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={fieldClass}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      )}
      <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          {initial ? 'Update task' : 'Create task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
