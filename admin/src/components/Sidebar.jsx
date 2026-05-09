import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../services/authService';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  { id: 'packages', label: 'Packages', path: '/packages' },
  { id: 'packages-new', label: 'Add Package', path: '/packages/new' },
  { id: 'bookings', label: 'Bookings', path: '/bookings' },
  { id: 'users', label: 'Users', path: '/' },
];

const Sidebar = ({ activeTab, setActiveTab, activeSubTab }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isActive = (item) => (activeSubTab ? item.id === activeSubTab : item.id === activeTab);

  const handleLogout = () => {
    if (!window.confirm('Are you sure you want to log out of the admin panel?')) return;
    logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Admin</p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">UnwindCabins</h2>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id === 'packages-new' ? 'packages' : item.id);
              navigate(item.path);
            }}
            className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
              isActive(item)
                ? 'bg-slate-950 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
