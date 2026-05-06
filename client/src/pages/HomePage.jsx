import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, MapPinned, Play, Star, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import CabinCard from '../components/CabinCard'
import InspirationCard from '../components/InspirationCard'
import FAQItem from '../components/FAQItem'
import {
  heroData,
  cabins,
  inspirationItems,
  reviewSection,
  mediaSection,
  ctaSection,
  escapeSection,
  faqs,
} from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

const reveal = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-100px' },
  variants: fadeUp,
  transition: { duration: 0.45, ease: 'easeOut' },
}

const StarBoxes = ({ label }) => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="inline-flex h-5 w-5 items-center justify-center rounded-[2px] bg-trust text-white">
          <Star size={12} fill="currentColor" strokeWidth={0} />
        </span>
      ))}
    </div>
    {label && <span className="text-sm font-medium text-white/80">{label}</span>}
  </div>
)

const SectionHeader = ({ title, description, action, to = '/' }) => (
  <div className="flex min-w-0 flex-col gap-7 md:flex-row md:items-end md:justify-between">
    <div className="min-w-0">
      <h2 className="section-underline max-w-[330px] font-display text-[1.45rem] font-black leading-snug text-ink sm:max-w-none sm:text-[1.7rem]">
        {title}
      </h2>
      {description && <p className="mt-8 max-w-[330px] text-sm leading-7 text-body sm:max-w-3xl">{description}</p>}
    </div>
    {action && (
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-line underline-offset-4 transition duration-200 hover:text-primary"
      >
        {action}
      </Link>
    )}
  </div>
)

const SearchField = ({ icon: Icon, label, children }) => (
  <label className="flex min-h-14 min-w-0 items-center gap-3 rounded-md bg-input px-4 text-sm font-medium text-body">
    <Icon className="h-4 w-4 shrink-0 text-ink/70" />
    <span className="sr-only">{label}</span>
    {children}
  </label>
)

const HomePage = () => (
  <div className="overflow-hidden bg-white">
    <section className="relative min-h-[530px] overflow-hidden bg-footer text-white">
      <img
        src={heroData.image}
        alt="Cabin surrounded by forest"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-hero-scrim" />
      <div className="relative mx-auto flex min-h-[530px] max-w-[1080px] items-center px-5 py-20 sm:px-6 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full min-w-0 max-w-[330px] sm:max-w-[640px]"
        >
          <h1 className="max-w-full break-words font-display text-[2.15rem] font-black leading-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Leave the office behind and <span className="text-accent">unwind</span>
          </h1>
          <p className="mt-5 max-w-[330px] text-sm leading-7 text-white/80 sm:max-w-[560px] sm:text-[0.95rem]">
            {heroData.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <div className="flex -space-x-2">
              {heroData.avatars.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  alt="Guest avatar"
                  className="h-9 w-9 rounded-full border-2 border-footer object-cover"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Star className="h-4 w-4 fill-trust text-trust" />
              {heroData.reviewText}
            </div>
            <StarBoxes label={heroData.badge} />
          </div>
        </motion.div>
      </div>
    </section>

    <div className="relative z-10 mx-auto -mt-[54px] w-full max-w-[980px] px-5 sm:px-6">
      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
        onSubmit={(event) => event.preventDefault()}
        className="w-full min-w-0 max-w-[350px] rounded-md bg-white p-6 shadow-search sm:mx-auto sm:max-w-none"
      >
        <div className="grid min-w-0 gap-2 md:grid-cols-[1.45fr_1fr_1fr_1fr_1.55fr]">
          <SearchField icon={MapPinned} label="I want to go">
            <input
              type="text"
              placeholder="I want to go"
              className="min-w-0 w-full bg-transparent text-sm text-ink outline-none placeholder:text-body"
            />
          </SearchField>
          <SearchField icon={CalendarDays} label="Check in">
            <input type="text" placeholder="Check in" className="min-w-0 w-full bg-transparent text-sm text-ink outline-none placeholder:text-body" />
          </SearchField>
          <SearchField icon={CalendarDays} label="Check out">
            <input type="text" placeholder="Check out" className="min-w-0 w-full bg-transparent text-sm text-ink outline-none placeholder:text-body" />
          </SearchField>
          <SearchField icon={UsersRound} label="Travellers">
            <select className="min-w-0 w-full appearance-none bg-transparent text-sm text-body outline-none">
              <option>Travellers</option>
              <option>2 guests</option>
              <option>3 guests</option>
              <option>4 guests</option>
            </select>
          </SearchField>
          <Button type="submit" className="h-14 w-full whitespace-nowrap px-4 text-[0.82rem] sm:text-sm">
            Find available cabins
          </Button>
        </div>
      </motion.form>
    </div>

    <section className="mx-auto max-w-[1080px] px-5 pb-16 pt-24 sm:px-6 lg:pb-20 lg:pt-24">
      <motion.div {...reveal}>
        <SectionHeader
          title="Discover our idyllic countryside cabins"
          description="Fully equipped kitchen and bathroom with plenty of walking and cycling routes to explore."
          action="View all cabins"
          to="/cabins"
        />
      </motion.div>
      <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </section>

    <section className="bg-mint py-16 lg:py-20">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-6">
        <motion.div {...reveal}>
          <SectionHeader
            title="Inspiration for your next getaway"
            description="We've curated some amazing experiences to help you find your next getaway."
            action="View all experiences"
            to="/about"
          />
        </motion.div>
        <div className="mt-11 grid gap-4 md:grid-cols-3">
          {inspirationItems.map((item) => (
            <InspirationCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>

    <section className="relative min-h-[430px] overflow-hidden bg-footer text-white">
      <img
        src={reviewSection.image}
        alt="Countryside retreat guest view"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,17,0.25)_0%,rgba(8,17,17,0.42)_42%,rgba(8,17,17,0.84)_100%)]" />
      <div className="relative mx-auto grid min-h-[430px] max-w-[1080px] px-5 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="hidden lg:block" />
        <motion.div {...reveal} className="max-w-[460px] lg:ml-auto">
          <h2 className="font-display text-4xl font-black leading-tight text-white sm:text-[2.8rem]">
            {reviewSection.title}
          </h2>
          <p className="mt-6 text-sm leading-7 text-white/80">{reviewSection.description}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <StarBoxes />
            <span className="text-sm font-semibold text-white/80">{reviewSection.date}</span>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1080px] gap-12 px-5 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
        <motion.div {...reveal}>
          <h2 className="section-underline max-w-[330px] font-display text-[1.45rem] font-black leading-snug text-ink sm:max-w-none sm:text-[1.7rem]">
            {mediaSection.title}
          </h2>
          <p className="mt-8 max-w-[390px] text-sm leading-7 text-body">{mediaSection.description}</p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-ink transition duration-200 hover:text-primary"
          >
            {mediaSection.button}
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        <motion.div {...reveal} className="relative">
          <div className="dot-grid absolute -right-8 -top-8 hidden h-28 w-36 lg:block" />
          <div className="relative overflow-hidden rounded-md bg-card shadow-panel">
            <img src={mediaSection.image} alt="Mountain lake retreat" className="aspect-video w-full object-cover" />
            <button
              type="button"
              className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/70 text-primary shadow-soft backdrop-blur-sm transition duration-200 hover:bg-white"
              aria-label="Play cabin getaway video"
            >
              <Play className="ml-1 h-8 w-8 fill-primary" strokeWidth={1.6} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="bg-mint py-16 lg:py-20">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-6">
        <motion.div {...reveal} className="relative min-h-[360px] overflow-hidden rounded-md bg-footer">
          <img
            src={ctaSection.image}
            alt="Relaxing in a quiet cabin"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,17,0.92)_0%,rgba(8,17,17,0.72)_44%,rgba(8,17,17,0.12)_100%)]" />
          <div className="relative flex min-h-[360px] items-center px-7 py-12 sm:px-12">
            <div className="max-w-[300px] sm:max-w-[590px]">
              <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-[2.45rem]">
                {ctaSection.title}
              </h2>
              <p className="mt-6 max-w-[300px] text-sm leading-7 text-white/80 sm:max-w-[560px]">{ctaSection.description}</p>
              <Button variant="secondary" className="mt-8">
                {ctaSection.button}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1080px] gap-12 px-5 sm:px-6 lg:grid-cols-[0.82fr_1.18fr]">
        <motion.div {...reveal}>
          <h2 className="font-display text-2xl font-black leading-snug text-primary sm:text-[1.7rem]">
            Frequently asked questions
          </h2>
          <div className="mt-10 space-y-10">
            {faqs.map((item, index) => (
              <div key={item.title}>
                <h3 className="text-sm font-bold text-ink">
                  {index + 1}. {item.title}
                </h3>
                <div className="mt-2 space-y-1 text-sm leading-6 text-body">
                  {item.details.map((detail) => (
                    <p key={detail}>• {detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <h3 className="text-base font-bold text-ink">Still have a question?</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-body">
              If you still have questions contact a member of the team on{' '}
              <a href="#" className="font-semibold text-ink underline decoration-line underline-offset-4">
                live chat
              </a>{' '}
              and we'd be more than happy to help.
            </p>
          </div>
        </motion.div>

        <motion.div {...reveal} className="space-y-6 lg:pt-20">
          {faqs.map((item) => (
            <FAQItem key={item.question} question={item.question} details={item.details} />
          ))}
        </motion.div>
      </div>
    </section>

    <section className="relative min-h-[520px] overflow-hidden bg-footer text-white">
      <img
        src={escapeSection.image}
        alt="Quiet lakeside camping at sunset"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-bottom-scrim" />
      <div className="relative mx-auto flex min-h-[520px] max-w-[1080px] items-center px-5 py-20 sm:px-6">
        <motion.div {...reveal} className="max-w-[500px]">
          <h2 className="font-display text-4xl font-black leading-tight text-white sm:text-[2.8rem]">
            {escapeSection.title}
          </h2>
          <p className="mt-6 max-w-[470px] text-sm leading-7 text-white/80">{escapeSection.description}</p>
          <Button variant="mint" className="mt-8">
            {escapeSection.button}
          </Button>
        </motion.div>
      </div>
    </section>
  </div>
)

export default HomePage
