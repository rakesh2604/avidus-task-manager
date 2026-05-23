import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <div className="hidden lg:block w-60 shrink-0" />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-10 lg:hidden">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
