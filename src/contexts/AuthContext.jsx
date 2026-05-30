import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const MOCK_USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'usuario', password: '1234' },
];

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    const found = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) {
      throw new Error('Usuario o contraseña incorrectos');
    }
    const mockToken = `mock-token-${Date.now()}`;
    const userData = { username };
    setUser(userData);
    setToken(mockToken);
    setIsAuthenticated(true);
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
