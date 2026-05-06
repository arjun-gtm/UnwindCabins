import { motion } from 'framer-motion'
import CabinCard from '../components/CabinCard'
import { cabins } from '../data/content'

const CabinsPage = () => (
  <div className="bg-white">
    <section className="bg-mint">
      <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-6 lg:py-20">
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

    <section className="mx-auto max-w-[1080px] px-5 py-16 sm:px-6 lg:py-20">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </section>
  </div>
)

export default CabinsPage
