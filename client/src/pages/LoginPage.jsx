import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Login failed.');
    }
  };

  return (
    <div className="bg-mint">
      <div className="page-container grid min-h-[calc(100vh-76px)] gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
        <div className="relative hidden min-h-[620px] overflow-hidden rounded-md bg-footer shadow-panel lg:block">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85"
            alt="Mountain lake retreat"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-bottom-scrim" />
          <div className="relative flex min-h-[620px] items-end p-10">
            <div className="max-w-lg">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9bf5d2]">Welcome back</p>
              <h1 className="mt-4 font-display text-4xl font-black leading-tight text-white">
                Return to your saved escapes and bookings.
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/75">
                Keep your favorite Nepal packages, booking notes, and profile details in one quiet place.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[520px] rounded-md bg-white p-7 shadow-panel sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Account</p>
          <h1 className="mt-3 text-3xl font-bold text-ink">Log in</h1>
          <p className="mt-3 text-sm leading-7 text-body">Access package booking and profile settings.</p>
          {error && <div className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-ink">
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="quiet-field mt-2" />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="quiet-field mt-2" />
            </label>
            <button className="min-h-12 w-full rounded-md bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark">
              Log in
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-body">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-primary hover:text-primary-dark">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
