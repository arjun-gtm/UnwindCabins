import { useAuth } from '../services/authService';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-xl">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2">Logout</button>
      </header>
      <main className="p-4">
        <h2>Welcome, {user?.name}</h2>
        <p>Manage users, content, etc.</p>
      </main>
    </div>
  );
};

export default Dashboard;