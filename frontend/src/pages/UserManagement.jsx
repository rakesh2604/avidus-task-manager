import { useState, useEffect, useCallback } from 'react';
import AppLayout from '../components/common/AppLayout';
import PageHeader from '../components/layout/PageHeader';
import Card from '../components/common/Card';
import UserTable from '../components/admin/UserTable';
import SkeletonLoader from '../components/common/SkeletonLoader';
import Pagination from '../components/ui/Pagination';
import Input from '../components/ui/Input';
import { getUsers } from '../services/userService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchUsers = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = { page, limit: 10 };
        if (search) params.search = search;
        if (roleFilter) params.role = roleFilter;
        if (statusFilter) params.status = statusFilter;
        const data = await getUsers(params);
        setUsers(data.users);
        setPagination(data.pagination);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    },
    [search, roleFilter, statusFilter]
  );

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const selectClass =
    'h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15';

  return (
    <AppLayout title="Users">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <PageHeader
          title="User management"
          subtitle={`${pagination.total} total users`}
        />

        <Card className="mb-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <Input
              label="Search"
              type="text"
              placeholder="Name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Role</label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className={selectClass}
                >
                  <option value="">All roles</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={selectClass}
                >
                  <option value="">All status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {loading ? (
          <SkeletonLoader type="table" count={5} />
        ) : (
          <>
            <UserTable users={users} onRefresh={() => fetchUsers(pagination.page)} />
            <Pagination
              page={pagination.page}
              pages={pagination.pages}
              onChange={fetchUsers}
            />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default UserManagement;
