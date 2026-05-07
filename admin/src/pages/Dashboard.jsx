import { useState } from 'react';
import { useAuth } from '../services/authService';
import Sidebar from '../components/Sidebar';
import DashboardHome from '../components/DashboardHome';
import UserManagement from '../components/UserManagement';
import ContentManagement from '../components/ContentManagement';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'users':
        return <UserManagement />;
      case 'content':
        return <ContentManagement />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;