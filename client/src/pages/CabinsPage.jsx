import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import CabinCard from '../components/CabinCard'
import { getPackages } from '../services/packageService'

const CabinsPage = () => {
  const location = useLocation()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const initialQuery = searchParams.get('search') ?? searchParams.get('where') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setLoading(true)
      setError('')

      getPackages({ search: query.trim(), limit: 24 })
        .then((response) => setPackages(response.data || []))
        .catch(() => setError('Failed to load packages. Please try again.'))
        .finally(() => setLoading(false))
    }, 250)

    return () => window.clearTimeout(timeoutId)
  }, [query])

  return (
    <div className="bg-white">
      <section className="bg-mint">
        <div className="page-container py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Our cabins</p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
                Beautiful cabins for unplugged countryside escapes.
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-body">
              Choose your favourite location, then customise your stay with outdoor dining, hiking plans, or a pet-friendly retreat.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-container py-16 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex min-h-[56px] w-full max-w-xl items-center gap-3 rounded-md border border-line bg-input px-4 text-sm text-body">
            <Search className="h-4 w-4 text-body" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search cabins by name, location, or feature"
              className="min-w-0 w-full bg-transparent text-sm text-ink outline-none placeholder:text-body"
            />
          </label>
          <p className="text-sm text-body">
            {packages.length} package{packages.length === 1 ? '' : 's'} available
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-[430px] animate-pulse rounded-md bg-card/80 shadow-panel" />
            ))}
          {!loading && error && <p className="col-span-full text-sm text-body">{error}</p>}
          {!loading && !error && packages.map((cabin) => (
            <CabinCard key={cabin._id || cabin.slug} cabin={cabin} />
          ))}
        </div>

        {!loading && !error && packages.length === 0 && (
          <p className="mt-8 text-sm text-body">
            No packages found.
          </p>
        )}
      </section>
    </div>
  )
}

export default CabinsPage
