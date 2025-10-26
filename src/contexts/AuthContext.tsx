import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'STUDENT' | 'SUPERVISOR' | 'ADMIN') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@test.com',
    role: 'STUDENT',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Dr. Sarah Smith',
    email: 'supervisor@test.com',
    role: 'SUPERVISOR',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@test.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication - password is just 'password' for all demo accounts
    if (password !== 'password') {
      return false;
    }

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    _password: string,
    role: 'STUDENT' | 'SUPERVISOR' | 'ADMIN'
  ): Promise<boolean> => {
    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

