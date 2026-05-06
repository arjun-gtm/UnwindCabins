import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Star, UsersRound } from 'lucide-react'
import { cabins } from '../data/content'
import Button from '../components/Button'

const CabinDetailPage = () => {
  const { cabinId } = useParams()
  const cabin = cabins.find((item) => item.id === cabinId)

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
          <div className="mt-7 space-y-3">
            {[
              { icon: CalendarDays, label: 'Check in', value: 'Friday' },
              { icon: CalendarDays, label: 'Check out', value: 'Sunday' },
              { icon: UsersRound, label: 'Guests', value: '2 adults' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-md bg-input px-4 py-4 text-sm">
                <span className="inline-flex items-center gap-3 font-semibold text-ink">
                  <Icon size={16} /> {label}
                </span>
                <span className="text-body">{value}</span>
              </div>
            ))}
          </div>
          <Button className="mt-7 w-full">Reserve now</Button>
        </aside>
      </section>
    </div>
  )
}

export default CabinDetailPage
