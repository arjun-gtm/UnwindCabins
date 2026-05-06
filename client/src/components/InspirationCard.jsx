import { motion } from 'framer-motion'

const InspirationCard = ({ item }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="group w-full max-w-[350px] overflow-hidden rounded-md bg-card-soft shadow-panel sm:max-w-none"
  >
    <div className="aspect-[1.08/1] overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
    <div className="space-y-4 p-5 text-white sm:p-6">
      <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#9bf5d2]/80">
        {item.subtitle}
      </span>
      <div>
        <h3 className="font-display text-xl font-bold leading-snug text-white">{item.title}</h3>
        <p className="mt-4 text-sm leading-7 text-white/75">{item.description}</p>
      </div>
    </div>
  </motion.article>
)

export default InspirationCard
