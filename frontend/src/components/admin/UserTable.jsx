import { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import EmptyState from '../ui/EmptyState';
import Badge from '../ui/Badge';
import { updateUserStatus, deleteUser } from '../../services/userService';
import { FiTrash2, FiToggleLeft, FiToggleRight, FiUsers } from 'react-icons/fi';

const UserTable = ({ users, onRefresh }) => {
  const [statusTarget, setStatusTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleToggleStatus = async () => {
    if (!statusTarget) return;
    setSubmitting(true);
    setError('');
    try {
      const newStatus = statusTarget.status === 'Active' ? 'Inactive' : 'Active';
      await updateUserStatus(statusTarget._id, newStatus);
      setStatusTarget(null);
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setSubmitting(true);
    setError('');
    try {
      await deleteUser(deleteTarget._id);
      setDeleteTarget(null);
      onRefresh();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setSubmitting(false);
    }
  };

  if (!users.length) {
    return (
      <EmptyState
        icon={FiUsers}
        title="No users found"
        description="Try adjusting your search or filter criteria."
      />
    );
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}
      <div className="overflow-hidden rounded-xl ring-1 ring-slate-200/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                {['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
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
              {users.map((user) => {
                const initials = user.name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr key={user._id} className="transition-colors hover:bg-slate-50/80">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-violet-600 text-xs font-bold text-white">
                          {initials}
                        </div>
                        <span className="font-medium text-slate-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{user.email}</td>
                    <td className="px-5 py-4">
                      <Badge variant={user.role === 'Admin' ? 'purple' : 'brand'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setStatusTarget(user)}
                          title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          {user.status === 'Active' ? (
                            <FiToggleRight size={16} className="text-emerald-600" />
                          ) : (
                            <FiToggleLeft size={16} className="text-slate-400" />
                          )}
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => setDeleteTarget(user)}>
                          <FiTrash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!statusTarget}
        onClose={() => setStatusTarget(null)}
        title="Update user status"
      >
        <p className="mb-6 text-sm text-slate-600">
          Set <span className="font-semibold text-slate-900">{statusTarget?.name}</span> to{' '}
          <span className="font-semibold">
            {statusTarget?.status === 'Active' ? 'Inactive' : 'Active'}
          </span>
          ?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setStatusTarget(null)}>
            Cancel
          </Button>
          <Button loading={submitting} onClick={handleToggleStatus}>
            Confirm
          </Button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete user">
        <p className="mb-6 text-sm text-slate-600">
          Permanently delete{' '}
          <span className="font-semibold text-slate-900">{deleteTarget?.name}</span>? This cannot
          be undone.
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
    </>
  );
};

export default UserTable;
