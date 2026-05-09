import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const pillars = [
  {
    title: 'Designed for rest',
    description: 'Our stays are selected for quiet locations, private outdoor spaces, and countryside views that help you unwind.',
  },
  {
    title: 'Thoughtful details',
    description: 'Every property includes a fully equipped kitchen, comfortable living space, and access to walking routes nearby.',
  },
  {
    title: 'Simple booking',
    description: 'Plan your trip in minutes with a fast booking flow and a responsive support team.',
  },
]

const AboutPage = () => (
  <div className="bg-white">
    <section className="bg-mint">
      <div className="page-container grid gap-12 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Our story</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight text-ink sm:text-5xl">
            Discover how we create memorable countryside escapes.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-body">
            UnwindCabins was built for travellers who crave a slower pace. Each stay is designed to reconnect you with nature, calm your mind, and refresh your routine.
          </p>
          <Link
            to="/cabins"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 text-sm font-semibold text-white transition duration-200 hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            Explore our cabins
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
          className="overflow-hidden rounded-md bg-card shadow-panel"
        >
          <img
            src="https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1400&q=85"
            alt="Forest cabin"
            className="aspect-[1.15/1] w-full object-cover"
          />
        </motion.div>
      </div>
    </section>

    <section className="page-container py-16 lg:py-20">
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((item) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-md border border-line bg-white p-7 shadow-panel"
          >
            <h3 className="font-display text-xl font-black text-ink">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-body">{item.description}</p>
          </motion.article>
        ))}
      </div>
      <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="overflow-hidden rounded-md bg-card shadow-panel">
          <img
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85"
            alt="Mountain landscape in Nepal"
            className="aspect-[1.9/1] w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Why Nepal</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-black leading-tight text-ink">
            Packages shaped for mountain calm, culture, and easy planning.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-body">
            From lakeside Pokhara to Chitwan wildlife and Himalayan trails, every trip is built around a clear route, trusted local support, and space to breathe.
          </p>
        </div>
      </div>
    </section>
  </div>
)

export default AboutPage
