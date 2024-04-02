import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const login = (username) => {
    setAuthenticated(true);
    setUsername(username);
  };

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST"
    });
    setAuthenticated(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ authenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);