import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../services/authService'

const navItems = [
  { label: 'Home', to: '/' },
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
  const { user, isAuthenticated } = useAuth()
  const [profileImage, setProfileImage] = useState('')

  useEffect(() => {
    const syncProfileImage = () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
      setProfileImage(storedUser.profileImage || user?.profileImage || '')
    }

    syncProfileImage()
    window.addEventListener('storage', syncProfileImage)
    window.addEventListener('focus', syncProfileImage)

    return () => {
      window.removeEventListener('storage', syncProfileImage)
      window.removeEventListener('focus', syncProfileImage)
    }
  }, [user?.profileImage])

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
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
            <NavLink
              to="/profile"
              className="group inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-mint text-sm font-bold text-primary transition duration-200 hover:border-primary hover:bg-white focus:outline-none focus:ring-4 focus:ring-primary/15"
              aria-label="Open profile"
              title={user?.name || 'Profile'}
            >
              {profileImage ? (
                <img src={profileImage} alt="" className="h-full w-full object-cover" />
              ) : (
                <span>{getInitials(user?.name)}</span>
              )}
            </NavLink>
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
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-ink transition duration-200 hover:bg-mint hover:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-xs font-bold text-white">
                    {profileImage ? (
                      <img src={profileImage} alt="" className="h-full w-full object-cover" />
                    ) : (
                      getInitials(user?.name)
                    )}
                  </span>
                  <span>{user?.name || 'Profile'}</span>
                </NavLink>
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
