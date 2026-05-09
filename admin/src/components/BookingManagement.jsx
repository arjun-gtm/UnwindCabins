import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { deleteBooking, getAdminBookings, updateBookingStatus } from '../services/bookingService';

const statusStyles = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const formatPrice = (price) => `Rs. ${new Intl.NumberFormat('en-NP').format(price || 0)}`;

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getAdminBookings();
      setBookings(response.data.data || []);
    } catch (fetchError) {
      toast.error(fetchError.response?.data?.message || 'Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const query = search.toLowerCase().trim();
    return bookings.filter((booking) => {
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesSearch = !query || [
        booking.packageTitle,
        booking.packageLocation,
        booking.guests,
        booking.user?.name,
        booking.user?.email,
      ].some((value) => value?.toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  const stats = {
    total: bookings.length,
    pending: bookings.filter((booking) => booking.status === 'pending').length,
    confirmed: bookings.filter((booking) => booking.status === 'confirmed').length,
    cancelled: bookings.filter((booking) => booking.status === 'cancelled').length,
  };

  const handleStatus = async (id, status) => {
    try {
      const response = await updateBookingStatus(id, status);
      setBookings((current) => current.map((booking) => (booking._id === id ? response.data.data : booking)));
      toast.success(`Booking ${status}.`);
    } catch (statusError) {
      toast.error(statusError.response?.data?.message || 'Failed to update booking.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await deleteBooking(id);
      setBookings((current) => current.filter((booking) => booking._id !== id));
      toast.success('Booking deleted.');
    } catch (deleteError) {
      toast.error(deleteError.response?.data?.message || 'Failed to delete booking.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Reservations</p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900">Booking Management</h2>
          <p className="mt-2 text-sm text-gray-500">Approve, decline, review, and delete customer package bookings.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customer, package, location..."
            className="min-h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-80"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="min-h-11 rounded-md border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white p-5 shadow">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="rounded-lg bg-white p-6 text-sm text-gray-500 shadow">Loading bookings...</div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <article key={booking._id} className="overflow-hidden rounded-lg bg-white shadow">
              <div className="grid gap-0 lg:grid-cols-[240px_1fr]">
                <img src={booking.packageCoverImage} alt={booking.packageTitle} className="h-56 w-full object-cover lg:h-full" />
                <div className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status] || statusStyles.pending}`}>
                        {booking.status}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-gray-900">{booking.packageTitle}</h3>
                      <p className="mt-1 text-sm text-gray-500">{booking.packageLocation}</p>
                      <p className="mt-4 text-sm text-gray-700">
                        Customer: <span className="font-semibold">{booking.user?.name || 'Unknown'}</span> ({booking.user?.email || 'No email'})
                      </p>
                    </div>
                    <div className="text-left lg:text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="mt-1 text-2xl font-bold text-gray-900">{formatPrice(booking.totalPrice)}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 text-sm text-gray-700 md:grid-cols-3">
                    <div className="rounded-md bg-gray-50 p-4">
                      <p className="font-semibold text-gray-900">Check in</p>
                      <p className="mt-1">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-4">
                      <p className="font-semibold text-gray-900">Check out</p>
                      <p className="mt-1">{new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-4">
                      <p className="font-semibold text-gray-900">Guests</p>
                      <p className="mt-1">{booking.guests}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => handleStatus(booking._id, 'confirmed')}
                      disabled={booking.status === 'confirmed'}
                      className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatus(booking._id, 'cancelled')}
                      disabled={booking.status === 'cancelled'}
                      className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Decline
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatus(booking._id, 'pending')}
                      disabled={booking.status === 'pending'}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Mark pending
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(booking._id)}
                      className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
          {filteredBookings.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center text-sm text-gray-500 shadow">No bookings found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
