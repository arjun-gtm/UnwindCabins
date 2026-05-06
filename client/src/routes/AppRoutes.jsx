import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import CabinsPage from '../pages/CabinsPage'
import CabinDetailPage from '../pages/CabinDetailPage'
import ContactPage from '../pages/ContactPage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/cabins" element={<CabinsPage />} />
    <Route path="/cabins/:cabinId" element={<CabinDetailPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export default AppRoutes
