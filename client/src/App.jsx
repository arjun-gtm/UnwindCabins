import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './services/authService'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3200,
            style: {
              border: '1px solid #e5eeee',
              borderRadius: '6px',
              color: '#242538',
              fontSize: '0.875rem',
              boxShadow: '0 16px 35px rgba(8, 17, 17, 0.10)',
            },
            success: {
              iconTheme: {
                primary: '#064b35',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <div className="min-h-screen bg-white text-ink">
          <Navbar />
          <main className="bg-white">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
