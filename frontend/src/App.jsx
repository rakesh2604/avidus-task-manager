import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import UserManagement from './pages/UserManagement';
import TaskManagement from './pages/TaskManagement';
import ActivityLogs from './pages/ActivityLogs';
import MyTasks from './pages/MyTasks';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/user-dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/my-tasks"
              element={
                <PrivateRoute>
                  <MyTasks />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/tasks"
              element={
                <AdminRoute>
                  <TaskManagement />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/logs"
              element={
                <AdminRoute>
                  <ActivityLogs />
                </AdminRoute>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
