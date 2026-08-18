import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cp_auth_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authAPI.getMe()
        .then(res => {
          if (res.success) setUser(res.user);
          else logout();
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await authAPI.login(email, password);
    if (res.success && res.token) {
      localStorage.setItem('cp_auth_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return res;
    } else {
      throw new Error(res.message || 'Login failed');
    }
  };

  const register = async (name, email, password, role = 'student') => {
    const res = await authAPI.register({ name, email, password, role });
    if (res.success && res.token) {
      localStorage.setItem('cp_auth_token', res.token);
      setToken(res.token);
      setUser(res.user);
      return res;
    } else {
      throw new Error(res.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('cp_auth_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin: user?.role === 'admin', login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
