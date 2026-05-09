import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, CalendarDays, Check, ChevronDown, ChevronUp, MapPin, Star, UsersRound } from 'lucide-react'
import Button from '../components/Button'
import { formatPackagePrice, getPackageBySlug } from '../services/packageService'
import { createBooking } from '../services/bookingService'
import { useAuth } from '../services/authService'

const CabinDetailPage = () => {
  const { cabinId, slug } = useParams()
  const { isAuthenticated } = useAuth()
  const packageSlug = slug || cabinId
  const [cabin, setCabin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [bookingForm, setBookingForm] = useState({ checkIn: '', checkOut: '', guests: 2 })

  useEffect(() => {
    let mounted = true

    getPackageBySlug(packageSlug)
      .then((response) => {
        if (mounted) setCabin(response.data)
      })
      .catch(() => {
        if (mounted) setError('Failed to load packages. Please try again.')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [packageSlug])

  const handleBookingChange = (field) => (event) => {
    setBookingForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const today = new Date().toISOString().split('T')[0]

  const adjustGuests = (direction) => {
    setBookingForm((prev) => {
      const nextGuests = direction === 'up' ? prev.guests + 1 : prev.guests - 1
      return { ...prev, guests: Math.min(Math.max(nextGuests, 1), cabin?.maxGuests || 12) }
    })
  }

  const handleReserve = async () => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) {
      toast.error('Please choose both check-in and check-out dates.')
      return
    }

    if (bookingForm.checkOut <= bookingForm.checkIn) {
      toast.error('Check-out must be after check-in.')
      return
    }

    if (!isAuthenticated) {
      toast.error('Please log in before reserving this package.')
      return
    }

    try {
      const response = await createBooking({
        packageId: cabin._id,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        guests: `${bookingForm.guests} guest${bookingForm.guests === 1 ? '' : 's'}`,
      })
      const booking = response.data
      toast.success(`${booking.packageTitle} reserved successfully.`)
    } catch (bookingError) {
      toast.error(bookingError.message || 'Booking failed. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="page-container py-20">
        <p className="text-sm text-body">Loading package...</p>
      </div>
    )
  }

  if (error || !cabin) {
    return (
      <div className="page-container py-20">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Cabin not found</p>
        <h1 className="mt-4 font-display text-4xl font-black leading-tight text-ink">We couldn't locate that cabin.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-body">{error || 'Try browsing our cabin listings again to find the perfect countryside getaway.'}</p>
        <Link to="/cabins" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
          <ArrowLeft size={16} /> Back to cabins
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <section className="bg-mint">
        <div className="page-container py-14 lg:py-20">
          <Link to="/cabins" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            <ArrowLeft size={16} /> Back to cabins
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.34fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                <MapPin size={14} /> {cabin.location}
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
                {cabin.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-body">{cabin.description}</p>
            </div>
            <div className="rounded-md bg-white p-5 shadow-panel">
              <p className="text-sm text-body">From</p>
              <p className="mt-1 text-2xl font-bold text-ink">{formatPackagePrice(cabin.price)}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-body">
                <Star className="h-4 w-4 fill-trust text-trust" />
                <span className="font-semibold text-ink">{cabin.rating}</span>
                <span>{cabin.reviewsCount} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container grid gap-8 py-16 lg:grid-cols-[1.5fr_0.5fr] lg:py-20">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-md bg-card shadow-panel">
            <img src={cabin.coverImage} alt={cabin.title} className="aspect-[1.55/1] w-full object-cover" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-line bg-white p-7 shadow-panel">
              <h2 className="font-display text-xl font-black text-ink">About this stay</h2>
              <p className="mt-4 text-sm leading-7 text-body">{cabin.description}</p>
            </div>
            <div className="rounded-md border border-line bg-white p-7 shadow-panel">
              <h2 className="font-display text-xl font-black text-ink">Key details</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-body">
                <li className="flex items-center gap-2"><CalendarDays size={16} className="text-primary" /> {cabin.durationDays} days / {cabin.durationNights} nights</li>
                <li className="flex items-center gap-2"><UsersRound size={16} className="text-primary" /> Up to {cabin.maxGuests} guests</li>
                <li className="flex items-center gap-2"><Check size={16} className="text-primary" /> {cabin.category} package</li>
                <li className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {cabin.location}, {cabin.country}</li>
              </ul>
            </div>
          </div>
          {cabin.highlights?.length > 0 && (
            <div className="rounded-md border border-line bg-white p-7 shadow-panel">
              <h2 className="font-display text-xl font-black text-ink">Highlights</h2>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-body md:grid-cols-2">
                {cabin.highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check size={16} className="mt-1 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cabin.itinerary?.length > 0 && (
            <div className="rounded-md border border-line bg-white p-7 shadow-panel">
              <h2 className="font-display text-xl font-black text-ink">Itinerary</h2>
              <div className="mt-4 space-y-5">
                {cabin.itinerary.map((item) => (
                  <div key={`${item.day}-${item.title}`} className="border-l-2 border-mint pl-4">
                    <p className="text-sm font-bold text-ink">Day {item.day}: {item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-body">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit overflow-hidden rounded-md border border-line bg-white shadow-panel lg:sticky lg:top-24">
          <div className="border-b border-line bg-mint p-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Reserve package</p>
            <h2 className="mt-2 font-display text-xl font-black text-ink">Book your stay</h2>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-body">Starting from</p>
                <p className="mt-1 text-2xl font-bold text-ink">{formatPackagePrice(cabin.price)}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-body">
                <Star className="h-4 w-4 fill-trust text-trust" />
                <span className="font-semibold text-ink">{cabin.rating}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm leading-7 text-body">Choose your travel dates and group size.</p>
            <div className="mt-6 grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <label className="block rounded-md border border-line bg-surface p-4 text-sm transition focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10">
                  <span className="flex items-center gap-2 font-semibold text-ink">
                    <CalendarDays size={16} className="text-primary" /> Check in
                  </span>
                  <input
                    type="date"
                    min={today}
                    value={bookingForm.checkIn}
                    onChange={handleBookingChange('checkIn')}
                    className="mt-3 w-full bg-transparent text-sm text-ink outline-none"
                  />
                </label>
                <label className="block rounded-md border border-line bg-surface p-4 text-sm transition focus-within:border-primary focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/10">
                  <span className="flex items-center gap-2 font-semibold text-ink">
                    <CalendarDays size={16} className="text-primary" /> Check out
                  </span>
                  <input
                    type="date"
                    min={bookingForm.checkIn || today}
                    value={bookingForm.checkOut}
                    onChange={handleBookingChange('checkOut')}
                    className="mt-3 w-full bg-transparent text-sm text-ink outline-none"
                  />
                </label>
              </div>
              <div className="rounded-md border border-line bg-surface p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <UsersRound size={16} className="text-primary" /> Guests
                    </span>
                    <p className="mt-1 text-xs text-body">Up to {cabin.maxGuests} guests</p>
                  </div>
                  <div className="flex items-center overflow-hidden rounded-md border border-line bg-white">
                    <button
                      type="button"
                      onClick={() => adjustGuests('down')}
                      className="flex h-10 w-10 items-center justify-center text-primary transition hover:bg-mint disabled:cursor-not-allowed disabled:text-muted"
                      disabled={bookingForm.guests <= 1}
                      aria-label="Decrease guests"
                    >
                      <ChevronDown size={18} />
                    </button>
                    <span className="min-w-14 text-center text-sm font-bold text-ink">{bookingForm.guests}</span>
                    <button
                      type="button"
                      onClick={() => adjustGuests('up')}
                      className="flex h-10 w-10 items-center justify-center text-primary transition hover:bg-mint disabled:cursor-not-allowed disabled:text-muted"
                      disabled={bookingForm.guests >= cabin.maxGuests}
                      aria-label="Increase guests"
                    >
                      <ChevronUp size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          <Button type="button" onClick={handleReserve} className="mt-7 w-full">
            Reserve now
          </Button>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default CabinDetailPage
