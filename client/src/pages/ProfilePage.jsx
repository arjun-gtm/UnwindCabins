import { useAuth } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl shadow-slate-200">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Your profile</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">Hi, {user?.name}</h1>
            <p className="mt-2 text-sm text-slate-500">Manage your account and view your details.</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-2xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-ink">Account information</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-700">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Name</p>
                <p className="mt-2 font-medium">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Email</p>
                <p className="mt-2 font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Role</p>
                <p className="mt-2 font-medium capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-ink">Quick actions</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-700">
              <p className="rounded-2xl bg-white p-4 shadow-sm">Book a cabin and manage trips later.</p>
              <p className="rounded-2xl bg-white p-4 shadow-sm">Update your contact details from account settings.</p>
              <p className="rounded-2xl bg-white p-4 shadow-sm">Review your favorite cabins and wishlist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
