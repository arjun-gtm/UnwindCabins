import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Heart, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatPackagePrice } from '../services/packageService'

const Rating = ({ value, reviews }) => (
  <div className="flex items-center gap-3 text-sm text-white/70">
    <div className="flex items-center gap-0.5 text-[#9bf5d2]" aria-label={`${value} star rating`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={index < Math.round(value) ? 'fill-current' : ''}
          strokeWidth={2}
        />
      ))}
    </div>
    <span>{reviews} reviews</span>
  </div>
)

const CabinCard = ({ cabin }) => {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  const packageId = cabin.slug || cabin.id || cabin._id
  const reviews = cabin.reviewsCount ?? cabin.reviews ?? 0
  const price = typeof cabin.price === 'number' ? formatPackagePrice(cabin.price) : cabin.price
  const description = cabin.shortDescription || cabin.description
  const image = cabin.coverImage || cabin.image

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('unwind-favorites') || '[]')
      setSaved(storedFavorites.includes(packageId))
    } catch {
      setSaved(false)
    }
  }, [packageId])

  const openPackage = () => {
    navigate(`/packages/${packageId}`)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPackage()
    }
  }

  const toggleFavorite = (event) => {
    event.stopPropagation()
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('unwind-favorites') || '[]')
      const updatedFavorites = storedFavorites.includes(packageId)
        ? storedFavorites.filter((item) => item !== packageId)
        : [...storedFavorites, packageId]
      const isSaving = !storedFavorites.includes(packageId)

      localStorage.setItem('unwind-favorites', JSON.stringify(updatedFavorites))
      setSaved(isSaving)
      toast.success(isSaving ? 'Added to favourites.' : 'Removed from favourites.')
    } catch {
      localStorage.setItem('unwind-favorites', JSON.stringify([packageId]))
      setSaved(true)
      toast.success('Added to favourites.')
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      role="link"
      tabIndex={0}
      onClick={openPackage}
      onKeyDown={handleKeyDown}
      className="group w-full max-w-[350px] cursor-pointer overflow-hidden rounded-md bg-card shadow-panel outline-none transition focus-visible:ring-4 focus-visible:ring-primary/25 sm:max-w-none"
    >
      <div className="relative aspect-[1.22/1] overflow-hidden">
        <img
          src={image}
          alt={cabin.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <button
          type="button"
          className={`absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-md transition duration-200 ${
            saved ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-footer/80 text-white hover:bg-primary'
          }`}
          aria-label={`${saved ? 'Unsave' : 'Save'} ${cabin.title}`}
          aria-pressed={saved}
          onClick={toggleFavorite}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <Heart size={18} className={saved ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="space-y-5 p-5 text-white sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#9bf5d2]/80">
          <span>{cabin.location}</span>
          <span className="shrink-0 text-base normal-case tracking-normal text-white">{price}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-white/55">
          {cabin.category && <span>{cabin.category}</span>}
          {cabin.durationDays && <span>{cabin.durationDays}D / {cabin.durationNights}N</span>}
          {cabin.maxGuests && <span>Up to {cabin.maxGuests} guests</span>}
        </div>
        <div>
          <h3 className="font-display text-xl font-bold leading-snug text-white">
            <span className="transition duration-200 group-hover:text-[#9bf5d2]">
              {cabin.title}
            </span>
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/70">{description}</p>
        </div>
        <Rating value={cabin.rating} reviews={reviews} />
      </div>
    </motion.article>
  )
}

export default CabinCard
