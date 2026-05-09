import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../services/authService';
import Sidebar from '../components/Sidebar';
import DashboardHome from '../components/DashboardHome';
import UserManagement from '../components/UserManagement';
import PackageManagement from '../components/PackageManagement';
import BookingManagement from '../components/BookingManagement';

const pageTitles = {
  dashboard: ['Dashboard', 'Overview of packages, bookings, and users.'],
  users: ['Users', 'Manage customer accounts.'],
  packages: ['Packages', 'Manage catalog and package publishing.'],
  bookings: ['Bookings', 'Review and update reservations.'],
};

const Dashboard = ({ initialTab = 'dashboard', packageMode = 'list' }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(initialTab);

  const activeSubTab = useMemo(() => {
    if (location.pathname === '/packages/new') return 'packages-new';
    return null;
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'packages':
        return <PackageManagement mode={packageMode} />;
      case 'bookings':
        return <BookingManagement />;
      default:
        return <DashboardHome />;
    }
  };

  const [title, description] = pageTitles[activeTab] || pageTitles.dashboard;

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-slate-200 bg-white px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">{user?.name || 'Admin'}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-[1400px]">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
