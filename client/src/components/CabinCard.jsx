import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

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
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('unwind-favorites') || '[]')
      setSaved(storedFavorites.includes(cabin.id))
    } catch {
      setSaved(false)
    }
  }, [cabin.id])

  const toggleFavorite = () => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('unwind-favorites') || '[]')
      const updatedFavorites = storedFavorites.includes(cabin.id)
        ? storedFavorites.filter((item) => item !== cabin.id)
        : [...storedFavorites, cabin.id]

      localStorage.setItem('unwind-favorites', JSON.stringify(updatedFavorites))
      setSaved((current) => !current)
    } catch {
      localStorage.setItem('unwind-favorites', JSON.stringify([cabin.id]))
      setSaved(true)
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group w-full max-w-[350px] overflow-hidden rounded-md bg-card shadow-panel sm:max-w-none"
    >
      <div className="relative aspect-[1.22/1] overflow-hidden">
        <img
          src={cabin.image}
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
        >
          <Heart size={18} className={saved ? 'fill-current' : ''} />
        </button>
      </div>

      <div className="space-y-5 p-5 text-white sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#9bf5d2]/80">
          <span>{cabin.location}</span>
          <span className="shrink-0 text-base normal-case tracking-normal text-white">{cabin.price}</span>
        </div>
        <div>
          <h3 className="font-display text-xl font-bold leading-snug text-white">
            <Link to={`/cabins/${cabin.id}`} className="transition duration-200 hover:text-[#9bf5d2]">
              {cabin.title}
            </Link>
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/70">{cabin.description}</p>
        </div>
        <Rating value={cabin.rating} reviews={cabin.reviews} />
      </div>
    </motion.article>
  )
}

export default CabinCard
