import { useState } from 'react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { updateUserStatus, deleteUser } from '../../services/userService';
import { FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

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
    return <p className="text-center py-10 text-gray-400">No users found</p>;
  }

  return (
    <>
      {error && (
        <div className="mb-3 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 bg-white">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setStatusTarget(user)}
                      title={user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    >
                      {user.status === 'Active' ? <FiToggleRight size={15} className="text-green-600" /> : <FiToggleLeft size={15} className="text-gray-400" />}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => setDeleteTarget(user)}>
                      <FiTrash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!statusTarget} onClose={() => setStatusTarget(null)} title="Update User Status">
        <p className="text-gray-600 mb-6">
          Set <span className="font-medium">{statusTarget?.name}</span> to{' '}
          <span className="font-medium">{statusTarget?.status === 'Active' ? 'Inactive' : 'Active'}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setStatusTarget(null)}>Cancel</Button>
          <Button loading={submitting} onClick={handleToggleStatus}>Confirm</Button>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete User">
        <p className="text-gray-600 mb-6">
          Permanently delete <span className="font-medium">{deleteTarget?.name}</span>? This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" loading={submitting} onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export default UserTable;
