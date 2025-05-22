
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAuthenticated: boolean;
  adminEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
  updateCredentials: (email: string, password: string) => void;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  adminEmail: null,
  login: () => {},
  logout: () => {},
  updateCredentials: () => {}
});

export const useAdminContext = () => useContext(AdminContext);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    const email = localStorage.getItem('adminEmail');
    
    if (token) {
      setIsAuthenticated(true);
      setAdminEmail(email);
    }
  }, []);

  const login = (email: string) => {
    localStorage.setItem('adminToken', 'authenticated');
    localStorage.setItem('adminEmail', email);
    setIsAuthenticated(true);
    setAdminEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
    setAdminEmail(null);
  };

  const updateCredentials = (email: string, password: string) => {
    // Store the updated credentials
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminPassword', password);
    setAdminEmail(email);
    
    // Update the current session
    login(email);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, adminEmail, login, logout, updateCredentials }}>
      {children}
    </AdminContext.Provider>
  );
};
