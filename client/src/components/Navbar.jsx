import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, UserRound, X } from 'lucide-react'
import { useAuth } from '../services/authService'

const navItems = [
  { label: 'Our cabins', to: '/cabins' },
  { label: 'Get inspired', to: '/about' },
  { label: 'Gift a stay', to: '/contact' },
  { label: 'About us', to: '/about' },
]

const Brand = ({ light = false }) => (
  <span className="font-sans text-lg font-bold tracking-wide">
    <span className={light ? 'text-white' : 'text-primary'}>UNWIND</span>
    <span className={light ? 'text-[#9bf5d2]' : 'text-ink'}>CABINS</span>
  </span>
)

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="z-50 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1500px] xl:max-w-[1800px] items-center justify-between px-5 sm:px-6">
        <Link to="/" aria-label="UnwindCabins home" onClick={() => setOpen(false)}>
          <Brand />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={`${item.to}-${item.label}`}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-semibold transition duration-200 ${
                  isActive ? 'text-primary' : 'text-ink hover:text-primary'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                className="text-sm font-semibold text-ink transition duration-200 hover:text-primary"
              >
                {user?.name || 'Account'}
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-primary/25 bg-mint px-4 py-2 text-sm font-semibold text-ink transition duration-200 hover:border-primary hover:bg-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm font-semibold text-ink transition duration-200 hover:text-primary"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-full border border-primary/25 bg-mint px-4 py-2 text-sm font-semibold text-ink transition duration-200 hover:border-primary hover:bg-white"
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition duration-200 hover:border-primary hover:text-primary lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="mx-auto flex max-w-[1500px] xl:max-w-[1800px] flex-col gap-1 px-5 py-4 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={`${item.to}-${item.label}-mobile`}
                to={item.to}
                className="rounded-md px-3 py-3 text-sm font-semibold text-ink transition duration-200 hover:bg-mint hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="mt-2 space-y-2">
                <NavLink
                  to="/profile"
                  className="block rounded-md px-3 py-3 text-sm font-semibold text-ink transition duration-200 hover:bg-mint hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  {user?.name || 'Profile'}
                </NavLink>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                  className="w-full rounded-md border border-line bg-surface px-3 py-3 text-sm font-semibold text-ink transition duration-200 hover:border-primary hover:bg-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block rounded-md px-3 py-3 text-sm font-semibold text-ink transition duration-200 hover:bg-mint hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block rounded-md px-3 py-3 text-sm font-semibold text-ink transition duration-200 hover:bg-mint hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export { Brand }
export default Navbar
