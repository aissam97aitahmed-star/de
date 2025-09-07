import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let userData;
      if (email === 'admin@uiz.ac.ma') {
        userData = {
          id: 1,
          name: 'Administrateur',
          email: 'admin@uiz.ac.ma',
          role: 'admin',
          department: 'Informatique'
        };
      } else if (email === 'prof@uiz.ac.ma') {
        userData = {
          id: 2,
          name: 'Dr. Ahmed Benali',
          email: 'prof@uiz.ac.ma',
          role: 'professor',
          department: 'Informatique',
          grade: 'MC',
          status: 'Permanent'
        };
      } else {
        throw new Error('Invalid credentials');
      }

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};