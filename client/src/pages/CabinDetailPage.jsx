import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Star, UsersRound } from 'lucide-react'
import { cabins } from '../data/content'
import Button from '../components/Button'

const CabinDetailPage = () => {
  const { cabinId } = useParams()
  const cabin = cabins.find((item) => item.id === cabinId)
  const [bookingForm, setBookingForm] = useState({ checkIn: '', checkOut: '', guests: '2 adults' })
  const [bookingStatus, setBookingStatus] = useState(null)

  const handleBookingChange = (field) => (event) => {
    setBookingForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleReserve = () => {
    if (!bookingForm.checkIn || !bookingForm.checkOut) {
      setBookingStatus({ type: 'error', message: 'Please choose both check-in and check-out dates before reserving.' })
      return
    }

    const bookingSummary = `Your stay at ${cabin.title} is reserved from ${bookingForm.checkIn} to ${bookingForm.checkOut} for ${bookingForm.guests}.`
    setBookingStatus({ type: 'success', message: bookingSummary })
    localStorage.setItem(
      `unwind-booking-${cabin.id}`,
      JSON.stringify({ cabinId: cabin.id, title: cabin.title, ...bookingForm, reservedAt: new Date().toISOString() })
    )
  }

  if (!cabin) {
    return (
      <div className="mx-auto max-w-[1080px] px-5 py-20 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Cabin not found</p>
        <h1 className="mt-4 font-display text-4xl font-black leading-tight text-ink">We couldn't locate that cabin.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-body">Try browsing our cabin listings again to find the perfect countryside getaway.</p>
        <Link to="/cabins" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
          <ArrowLeft size={16} /> Back to cabins
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <section className="bg-mint">
        <div className="mx-auto max-w-[1080px] px-5 py-14 sm:px-6 lg:py-20">
          <Link to="/cabins" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            <ArrowLeft size={16} /> Back to cabins
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{cabin.location}</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
                {cabin.title}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-body">{cabin.description}</p>
            </div>
            <div className="rounded-md bg-white p-5 shadow-panel">
              <p className="text-sm text-body">From</p>
              <p className="mt-1 text-2xl font-bold text-ink">{cabin.price}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-body">
                <Star className="h-4 w-4 fill-trust text-trust" />
                <span className="font-semibold text-ink">{cabin.rating}</span>
                <span>{cabin.reviews} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1080px] gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[1.35fr_0.65fr] lg:py-20">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-md bg-card shadow-panel">
            <img src={cabin.image} alt={cabin.title} className="aspect-[1.55/1] w-full object-cover" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-line bg-white p-7 shadow-panel">
              <h2 className="font-display text-xl font-black text-ink">About this stay</h2>
              <p className="mt-4 text-sm leading-7 text-body">
                Enjoy a fully stocked kitchen, crisp linens, secluded outdoor space, scenic walks, and quiet evenings by the fire.
              </p>
            </div>
            <div className="rounded-md border border-line bg-white p-7 shadow-panel">
              <h2 className="font-display text-xl font-black text-ink">Key details</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-body">
                <li>• 2 bedrooms</li>
                <li>• Private forest access</li>
                <li>• Wood-fired stove</li>
                <li>• Parking included</li>
              </ul>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-md border border-line bg-white p-7 shadow-panel lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-black text-ink">Book your stay</h2>
          <p className="mt-4 text-sm leading-7 text-body">Secure your dates and start planning a restorative countryside retreat.</p>
          <div className="mt-7 grid gap-3">
            <label className="block rounded-md bg-input px-4 py-4 text-sm">
              <span className="font-semibold text-ink">Check in</span>
              <input
                type="date"
                value={bookingForm.checkIn}
                onChange={handleBookingChange('checkIn')}
                className="mt-3 block w-full rounded-md border border-line bg-transparent px-3 py-3 text-sm text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </label>
            <label className="block rounded-md bg-input px-4 py-4 text-sm">
              <span className="font-semibold text-ink">Check out</span>
              <input
                type="date"
                value={bookingForm.checkOut}
                onChange={handleBookingChange('checkOut')}
                className="mt-3 block w-full rounded-md border border-line bg-transparent px-3 py-3 text-sm text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </label>
            <label className="block rounded-md bg-input px-4 py-4 text-sm">
              <span className="font-semibold text-ink">Guests</span>
              <select
                value={bookingForm.guests}
                onChange={handleBookingChange('guests')}
                className="mt-3 block w-full appearance-none rounded-md border border-line bg-transparent px-3 py-3 text-sm text-ink outline-none transition duration-200 focus:border-primary focus:ring-4 focus:ring-primary/20"
              >
                <option>1 guest</option>
                <option>2 adults</option>
                <option>3 guests</option>
                <option>4 guests</option>
              </select>
            </label>
          </div>
          {bookingStatus && (
            <div
              className={`mt-6 rounded-md px-4 py-3 text-sm ${
                bookingStatus.type === 'success' ? 'bg-[#e2f7ed] text-[#0f6f46]' : 'bg-[#fff4e5] text-[#92400e]'
              }`}
              aria-live="polite"
            >
              {bookingStatus.message}
            </div>
          )}
          <Button type="button" onClick={handleReserve} className="mt-7 w-full">
            Reserve now
          </Button>
        </aside>
      </section>
    </div>
  )
}

export default CabinDetailPage
