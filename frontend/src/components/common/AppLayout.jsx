import { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from '../layout/DashboardHeader';

const AppLayout = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <DashboardHeader
          title={title}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
