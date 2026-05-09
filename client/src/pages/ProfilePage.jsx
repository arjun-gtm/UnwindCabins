import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Calendar, Heart, LogOut, Mail, MapPin, Phone, Save, User } from 'lucide-react';
import { useAuth } from '../services/authService';
import { getMyBookings } from '../services/bookingService';
import { formatPackagePrice, getPackages } from '../services/packageService';

const ProfilePage = () => {
  const { user, logout, refreshUser, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [favoritePackages, setFavoritePackages] = useState([]);
  const [packagesCount, setPackagesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', contactNumber: '', address: '' });

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);

        const favoriteSlugs = JSON.parse(localStorage.getItem('unwind-favorites') || '[]');

        const [bookingResponse, packageResponse, freshUser] = await Promise.all([
          getMyBookings(),
          getPackages({ limit: 48, sort: 'newest' }),
          refreshUser?.().catch(() => user),
        ]);

        if (!mounted) return;

        const currentUser = freshUser || user || {};
        const packageData = packageResponse.data || [];

        setBookings(bookingResponse.data || []);
        setPackagesCount(packageResponse.count || packageData.length);
        setFavoritePackages(packageData.filter((item) => favoriteSlugs.includes(item.slug)));

        setForm({
          name: currentUser.name || '',
          email: currentUser.email || '',
          contactNumber: currentUser.contactNumber || '',
          address: currentUser.address || '',
        });
      } catch (error) {
        toast.error(error.message || 'Failed to load profile.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error('Name is required.');
      return;
    }

    setSaving(true);

    try {
      const updatedUser = await updateProfile({
        name: form.name.trim(),
        contactNumber: form.contactNumber.trim(),
        address: form.address.trim(),
      });

      setForm((current) => ({
        ...current,
        name: updatedUser.name || current.name,
        email: updatedUser.email || current.email,
        contactNumber: updatedUser.contactNumber || '',
        address: updatedUser.address || '',
      }));

      toast.success('Profile updated.');
    } catch (error) {
      toast.error(error.message || 'Could not update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const stats = [
    { label: 'Bookings', value: bookings.length, icon: Calendar },
    { label: 'Saved', value: favoritePackages.length, icon: Heart },
    { label: 'Packages', value: packagesCount, icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <motion.div
        className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <section className="overflow-hidden rounded-2xl bg-white shadow-panel">
          <div className="border-b border-line p-5 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-xl font-bold text-primary">
                  {(form.name || user?.name || 'U').charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    My account
                  </p>
                  <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
                    {form.name || user?.name || 'Guest'}
                  </h1>
                  <p className="mt-1 text-sm text-body">{form.email || user?.email}</p>
                  <p className="mt-1 text-sm text-body">{form.contactNumber || 'No contact number'} · {form.address || 'No address'}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-line bg-surface px-4 py-3 text-center"
                  >
                    <Icon size={17} className="mx-auto text-primary" />
                    <p className="mt-2 text-lg font-bold text-ink">
                      {loading ? '...' : value}
                    </p>
                    <p className="text-xs text-body">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_340px]">
            <main className="space-y-0 lg:border-r lg:border-line">
              <form onSubmit={handleSubmit} className="border-b border-line p-5 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-ink">Profile details</h2>
                    <p className="mt-1 text-sm text-body">
                      Manage your contact details. Email cannot be changed.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-ink">
                    Full name
                    <div className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-line bg-surface px-4 transition focus-within:border-primary/50 focus-within:bg-white">
                      <User size={16} className="shrink-0 text-primary" />
                      <input
                        value={form.name}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, name: event.target.value }))
                        }
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                        placeholder="Your name"
                      />
                    </div>
                  </label>

                  <label className="block text-sm font-semibold text-ink">
                    Email address
                    <div className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-line bg-gray-50 px-4 text-body">
                      <Mail size={16} className="shrink-0 text-body" />
                      <input
                        type="email"
                        value={form.email}
                        disabled
                        readOnly
                        className="min-w-0 flex-1 cursor-not-allowed bg-transparent text-sm outline-none"
                      />
                    </div>
                    <p className="mt-2 text-xs font-normal text-body">
                      Email is locked for account security.
                    </p>
                  </label>
                  <label className="block text-sm font-semibold text-ink">
                    Contact number
                    <div className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-line bg-surface px-4 transition focus-within:border-primary/50 focus-within:bg-white">
                      <Phone size={16} className="shrink-0 text-primary" />
                      <input
                        value={form.contactNumber}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, contactNumber: event.target.value }))
                        }
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                        placeholder="98XXXXXXXX"
                      />
                    </div>
                  </label>
                  <label className="block text-sm font-semibold text-ink">
                    Address
                    <div className="mt-2 flex min-h-12 items-center gap-3 rounded-xl border border-line bg-surface px-4 transition focus-within:border-primary/50 focus-within:bg-white">
                      <MapPin size={16} className="shrink-0 text-primary" />
                      <input
                        value={form.address}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, address: event.target.value }))
                        }
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                        placeholder="City, area"
                      />
                    </div>
                  </label>
                </div>
              </form>

              <section className="p-5 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-ink">Recent bookings</h2>
                    <p className="mt-1 text-sm text-body">Your latest package reservations.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/bookings')}
                    className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-primary/40 hover:text-primary"
                  >
                    View all
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {loading && <p className="text-sm text-body">Loading bookings...</p>}

                  {!loading && bookings.length === 0 && (
                    <div className="rounded-xl border border-dashed border-line bg-surface p-5 text-sm text-body">
                      No bookings yet. Browse packages and reserve your first trip.
                    </div>
                  )}

                  {!loading &&
                    bookings.slice(0, 3).map((booking) => (
                      <button
                        key={booking._id}
                        type="button"
                        onClick={() => navigate(`/packages/${booking.packageSlug}`)}
                        className="grid w-full gap-4 rounded-xl border border-line p-3 text-left transition hover:border-primary/40 hover:bg-surface sm:grid-cols-[86px_1fr_auto]"
                      >
                        <img
                          src={booking.packageCoverImage}
                          alt={booking.packageTitle}
                          className="h-20 w-full rounded-lg object-cover sm:w-[86px]"
                        />

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-ink">{booking.packageTitle}</p>
                          <p className="mt-1 text-sm text-body">{booking.packageLocation}</p>
                          <p className="mt-2 text-xs text-body">
                            {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                            {new Date(booking.checkOut).toLocaleDateString()}
                          </p>
                        </div>

                        <span className="h-fit rounded-full bg-mint px-3 py-1 text-xs font-semibold capitalize text-primary">
                          {booking.status}
                        </span>
                      </button>
                    ))}
                </div>
              </section>
            </main>

            <aside className="space-y-0">
              <div className="border-b border-line p-5 sm:p-7">
                <h2 className="text-lg font-bold text-ink">Quick actions</h2>

                <div className="mt-5 grid gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/bookings')}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    <Calendar size={17} />
                    My bookings
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <h2 className="text-lg font-bold text-ink">Saved packages</h2>

                <div className="mt-5 space-y-3">
                  {loading && <p className="text-sm text-body">Loading saved packages...</p>}

                  {!loading && favoritePackages.length === 0 && (
                    <div className="rounded-xl border border-dashed border-line bg-surface p-4 text-sm leading-6 text-body">
                      Saved packages will appear here.
                    </div>
                  )}

                  {!loading &&
                    favoritePackages.slice(0, 3).map((packageItem) => (
                      <button
                        key={packageItem._id}
                        type="button"
                        onClick={() => navigate(`/packages/${packageItem.slug}`)}
                        className="flex w-full gap-3 rounded-xl border border-line p-3 text-left transition hover:border-primary/40 hover:bg-surface"
                      >
                        <img
                          src={packageItem.coverImage}
                          alt={packageItem.title}
                          className="h-16 w-20 rounded-lg object-cover"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">
                            {packageItem.title}
                          </p>
                          <p className="mt-1 text-xs text-body">{packageItem.location}</p>
                          <p className="mt-1 text-xs font-bold text-ink">
                            {formatPackagePrice(packageItem.price)}
                          </p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
