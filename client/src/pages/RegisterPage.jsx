import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/authService';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(name, email, password, contactNumber, address);
      navigate('/profile');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="bg-white">
      <div className="page-container grid min-h-[calc(100vh-76px)] gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
        <div className="mx-auto w-full max-w-[520px] rounded-md bg-white p-7 shadow-panel ring-1 ring-line sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Start planning</p>
          <h1 className="mt-3 text-3xl font-bold text-ink">Create your account</h1>
          <p className="mt-3 text-sm leading-7 text-body">Join UnwindCabins and manage your bookings from your profile.</p>
          {error && <div className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-ink">
              Full name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="quiet-field mt-2" />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="quiet-field mt-2" />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Contact number
              <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required className="quiet-field mt-2" />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Address
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="quiet-field mt-2" />
            </label>
            <label className="block text-sm font-semibold text-ink">
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="quiet-field mt-2" />
            </label>
            <button className="min-h-12 w-full rounded-md bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark">
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-body">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:text-primary-dark">
            Log in
          </Link>
        </p>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-md bg-footer shadow-panel">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85"
            alt="Nepal mountain trail"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-hero-scrim" />
          <div className="relative flex min-h-[520px] items-center p-8 sm:p-10">
            <div className="max-w-lg">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#9bf5d2]">Nepal packages</p>
              <h2 className="font-display mt-4 text-4xl font-black leading-tight text-white">
                Save mountain retreats, cultural tours, and weekend escapes.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/75">
                Your account keeps trip ideas close while the booking flow stays simple.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
