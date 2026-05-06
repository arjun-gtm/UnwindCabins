import { Globe2, Heart, Link2, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { footerLinks } from '../data/content'
import { Brand } from './Navbar'

const socialLinks = [
  { label: 'Website', icon: Globe2 },
  { label: 'Booking link', icon: Link2 },
  { label: 'Email', icon: Mail },
  { label: 'Contact', icon: MessageCircle },
  { label: 'Favorites', icon: Heart },
]

const Footer = () => {
  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto max-w-[1080px] px-5 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[0.7fr_0.78fr_1.35fr_0.62fr]">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold text-[#9bf5d2]">{group.title}</h3>
              <ul
                className={`mt-5 gap-2 text-sm leading-6 text-white/60 ${
                  group.title === 'Get inspired' ? 'grid sm:grid-cols-2' : 'grid'
                }`}
              >
                {group.links.map((link) => (
                  <li key={link}>
                    <Link to="/" className="transition duration-200 hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <h2 className="font-sans text-base font-bold text-[#9bf5d2]">Sign up to our Newsletter</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/60">
              For a weekly curated collection of 3 things you can watch, read or listen to switch off from the busy everyday.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <input
              type="email"
              placeholder="james@thegiantpeach.com"
              className="min-h-12 min-w-0 flex-1 rounded-md border border-white/10 bg-white px-5 text-sm text-ink outline-none transition duration-200 placeholder:text-muted focus:border-[#9bf5d2] focus:ring-4 focus:ring-[#9bf5d2]/20 sm:max-w-[320px]"
            />
            <button
              type="submit"
              className="min-h-12 rounded-md bg-accent px-7 text-sm font-semibold text-ink transition duration-200 hover:bg-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/30"
            >
              Join the mailing list
            </button>
          </form>
        </div>

        <div className="mt-12 border-t border-primary/50 pt-10 sm:flex sm:items-center sm:justify-between">
          <Link to="/" aria-label="UnwindCabins home">
            <Brand light />
          </Link>
          <p className="mt-6 text-sm text-white/40 sm:mt-0">© 2023 UnwindCabins</p>
          <div className="mt-6 flex items-center gap-4 text-white/40 sm:mt-0">
            {socialLinks.map(({ label, icon: Icon }) => (
              <a key={label} href="#" className="transition duration-200 hover:text-white" aria-label={label}>
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
