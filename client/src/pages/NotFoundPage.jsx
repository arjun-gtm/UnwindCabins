import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <div className="page-container flex min-h-[calc(100vh-152px)] flex-col items-center justify-center py-20 text-center">
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">404 error</p>
    <h1 className="mt-5 font-display text-5xl font-black leading-tight text-ink sm:text-6xl">Page not found</h1>
    <p className="mt-5 max-w-2xl text-sm leading-7 text-body">
      The page you are trying to reach does not exist or has been moved. Return to the homepage to continue exploring our cabins.
    </p>
    <Link to="/" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-7 text-sm font-semibold text-white transition duration-200 hover:bg-primary-dark">
      Go back home
    </Link>
  </div>
)

export default NotFoundPage
