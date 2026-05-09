import { useState } from 'react'
import Button from '../components/Button'

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const validateEmail = (value) => /^\S+@\S+\.\S+$/.test(value)

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please complete all fields before sending your message.' })
      return
    }

    if (!validateEmail(form.email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    setStatus({ type: 'success', message: 'Thanks! Your message has been received. We will reply as soon as possible.' })
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-white">
      <section className="bg-mint">
        <div className="page-container grid gap-12 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Gift a stay</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
              Send a memorable cabin retreat to someone special.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-body">
              Share our countryside escapes with friends or family. Gift bookings are flexible and include personalization support from our team.
            </p>
          </div>

          <div className="rounded-md bg-white p-7 shadow-panel">
            <h2 className="font-display text-xl font-black text-ink">Need help planning?</h2>
            <p className="mt-4 text-sm leading-7 text-body">Reach out and we'll help set up dates, cabin preferences, and a gift message for your recipient.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-input p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Email</p>
                <p className="mt-2 text-sm font-semibold text-ink">hello@unwindcabins.com</p>
              </div>
              <div className="rounded-md bg-input p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Phone</p>
                <p className="mt-2 text-sm font-semibold text-ink">+44 20 7946 0857</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container grid gap-8 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:py-20">
        <div className="rounded-md border border-line bg-white p-7 shadow-panel">
          <h2 className="font-display text-xl font-black text-ink">Send us a message</h2>
          <form className="mt-7 space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-ink">
                Name
                <input
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  className="quiet-field mt-3"
                />
              </label>
              <label className="block text-sm font-semibold text-ink">
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className="quiet-field mt-3"
                />
              </label>
            </div>
            <label className="block text-sm font-semibold text-ink">
              Message
              <textarea
                rows="6"
                value={form.message}
                onChange={handleChange('message')}
                className="quiet-field mt-3 min-h-[160px]"
              />
            </label>
            <div className="flex flex-col gap-3">
              <Button type="submit">Send message</Button>
              {status && (
                <p className={`text-sm ${status.type === 'success' ? 'text-emerald-500' : 'text-amber-600'}`} aria-live="polite">
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-md bg-footer p-7 shadow-panel">
          <img
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=85"
            alt="Lakeside camping retreat"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-bottom-scrim" />
          <div className="relative flex h-full min-h-[360px] items-end">
            <div className="max-w-md">
              <h2 className="font-display text-3xl font-black leading-tight text-white">Quick booking details</h2>
              <p className="mt-5 text-sm leading-7 text-white/80">Book a stay from any of our curated cabins and let us help with the gift voucher and special requests.</p>
              <div className="mt-7 grid gap-4 text-sm text-white/70 sm:grid-cols-2">
                <div>
                  <p className="font-bold text-white">Delivery</p>
                  <p className="mt-2 leading-6">Instant digital gift voucher with a personalized note.</p>
                </div>
                <div>
                  <p className="font-bold text-white">Support</p>
                  <p className="mt-2 leading-6">Dedicated concierge service for every getaway.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
