import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-ink">
        <Navbar />
        <main className="bg-white">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
