import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token) {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }

      request('/users/me')
        .then((data) => {
          const nextUser = {
            id: data._id || data.id,
            name: data.name,
            email: data.email,
            contactNumber: data.contactNumber,
            address: data.address,
            role: data.role,
            profileImage: data.profileImage,
            createdAt: data.createdAt,
          };
          localStorage.setItem('user', JSON.stringify(nextUser));
          setUser(nextUser);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
      return;
    }

    setLoading(false);
  }, []);

  const request = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  };

  const login = async (email, password) => {
    const data = await request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  const refreshUser = async () => {
    const data = await request('/users/me');
    const nextUser = {
      id: data._id || data.id,
      name: data.name,
      email: data.email,
      contactNumber: data.contactNumber,
      address: data.address,
      role: data.role,
      profileImage: data.profileImage,
      createdAt: data.createdAt,
    };
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
    setIsAuthenticated(true);
    return nextUser;
  };

  const updateProfile = async (payload) => {
    const response = await request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    const nextUser = response.data;
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
    setIsAuthenticated(true);
    return nextUser;
  };

  const register = async (name, email, password, contactNumber, address) => {
    const data = await request('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, contactNumber, address }),
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, refreshUser, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
