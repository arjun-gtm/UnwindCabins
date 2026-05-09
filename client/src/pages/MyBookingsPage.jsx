import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, MapPin, Search, UsersRound } from 'lucide-react'
import { getMyBookings } from '../services/bookingService'
import { formatPackagePrice } from '../services/packageService'

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700',
  confirmed: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-red-50 text-red-700',
}

const MyBookingsPage = () => {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    getMyBookings()
      .then((response) => {
        if (mounted) setBookings(response.data || [])
      })
      .catch((bookingError) => {
        if (mounted) setError(bookingError.message || 'Failed to load bookings.')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const filteredBookings = useMemo(() => {
    const query = search.toLowerCase().trim()
    if (!query) return bookings

    return bookings.filter((booking) =>
      [booking.packageTitle, booking.packageLocation, booking.status, booking.guests].some((value) =>
        value?.toLowerCase().includes(query)
      )
    )
  }, [bookings, search])

  return (
    <div className="min-h-screen bg-mint">
      <section className="page-container py-12 lg:py-16">
        <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
          <ArrowLeft size={16} /> Back to profile
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">My bookings</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
              Manage your package reservations.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-body">
              Review upcoming stays, open package details, and keep track of reservation status from your account.
            </p>
          </div>

          <div className="rounded-md bg-white p-5 shadow-panel">
            <p className="text-sm text-body">Total reservations</p>
            <p className="mt-1 text-3xl font-bold text-ink">{bookings.length}</p>
          </div>
        </div>
      </section>

      <section className="page-container pb-16 lg:pb-20">
        <div className="mb-6 flex flex-col gap-4 rounded-md bg-white p-5 shadow-panel sm:flex-row sm:items-center sm:justify-between">
          <label className="flex min-h-12 w-full max-w-xl items-center gap-3 rounded-md border border-line bg-surface px-4 text-sm text-body focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10">
            <Search size={16} className="text-primary" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by package, location, status, or guests"
              className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-body"
            />
          </label>
          <button
            type="button"
            onClick={() => navigate('/cabins')}
            className="min-h-12 rounded-md bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Book another package
          </button>
        </div>

        {loading && <div className="rounded-md bg-white p-8 text-sm text-body shadow-panel">Loading bookings...</div>}
        {error && <div className="rounded-md bg-amber-50 p-5 text-sm text-amber-700">{error}</div>}

        {!loading && !error && filteredBookings.length === 0 && (
          <div className="rounded-md bg-white p-8 text-center shadow-panel">
            <h2 className="font-display text-2xl font-black text-ink">No bookings found</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-body">
              Your reservations will appear here after you book a package.
            </p>
            <button
              type="button"
              onClick={() => navigate('/cabins')}
              className="mt-6 min-h-12 rounded-md bg-primary px-6 text-sm font-semibold text-white transition hover:bg-primary-dark"
            >
              Browse packages
            </button>
          </div>
        )}

        <div className="grid gap-5">
          {!loading && !error && filteredBookings.map((booking) => (
            <motion.article
              key={booking._id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="grid overflow-hidden rounded-md bg-white shadow-panel lg:grid-cols-[280px_1fr]"
            >
              <button
                type="button"
                onClick={() => navigate(`/packages/${booking.packageSlug}`)}
                className="group relative min-h-[220px] overflow-hidden text-left"
              >
                <img
                  src={booking.packageCoverImage}
                  alt={booking.packageTitle}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-bottom-scrim" />
                <span className="absolute bottom-4 left-4 rounded-md bg-white/90 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  Open package
                </span>
              </button>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status] || statusStyles.pending}`}>
                      {booking.status}
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-black text-ink">{booking.packageTitle}</h2>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-body">
                      <MapPin size={16} className="text-primary" /> {booking.packageLocation}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-body">Total</p>
                    <p className="mt-1 text-xl font-bold text-ink">{formatPackagePrice(booking.totalPrice)}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 text-sm text-body md:grid-cols-3">
                  <div className="rounded-md bg-surface p-4">
                    <p className="flex items-center gap-2 font-semibold text-ink">
                      <CalendarDays size={16} className="text-primary" /> Check in
                    </p>
                    <p className="mt-2">{new Date(booking.checkIn).toLocaleDateString()}</p>
                  </div>
                  <div className="rounded-md bg-surface p-4">
                    <p className="flex items-center gap-2 font-semibold text-ink">
                      <CalendarDays size={16} className="text-primary" /> Check out
                    </p>
                    <p className="mt-2">{new Date(booking.checkOut).toLocaleDateString()}</p>
                  </div>
                  <div className="rounded-md bg-surface p-4">
                    <p className="flex items-center gap-2 font-semibold text-ink">
                      <UsersRound size={16} className="text-primary" /> Guests
                    </p>
                    <p className="mt-2">{booking.guests}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MyBookingsPage
