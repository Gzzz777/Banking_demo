import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('userData');
    if (token && stored) {
      try { setUserData(JSON.parse(stored)); } catch {}
    }
  }, []);

  const login = (user, token) => {
    setUserData(user);
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
