import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './services/authService';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3200,
            style: {
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              color: '#0f172a',
              fontSize: '0.875rem',
              boxShadow: '0 18px 45px rgba(15, 23, 42, 0.12)',
            },
            success: {
              iconTheme: {
                primary: '#0f172a',
                secondary: '#ffffff',
              },
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/packages" element={<ProtectedRoute><Dashboard initialTab="packages" /></ProtectedRoute>} />
          <Route path="/packages/new" element={<ProtectedRoute><Dashboard initialTab="packages" packageMode="new" /></ProtectedRoute>} />
          <Route path="/packages/:id/edit" element={<ProtectedRoute><Dashboard initialTab="packages" packageMode="edit" /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><Dashboard initialTab="bookings" /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
