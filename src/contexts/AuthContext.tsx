import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { User } from "../types";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("failed");


  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    // Simple mock authentication - password is just 'password' for all demo accounts
    let success = true;
    await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        email: email,
        password: password,
      })
      .then((response) => {
        setUser(response.data.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem(
          "access_token",
          response.data.data.access_token
        );
      })
      .catch((e) => {
        console.log(e);
        setError(e.response?.data?.message || "Login failed");
        success = false;
      })
      .finally(() => {
        setLoading(false);
      });

    return success;
  };

  const register = async (
    name: string,
    email: string,
    _password: string
  ): Promise<boolean> => {
    // Check if user already exists
    setLoading(true);
    setError(null);
    let success = true;

    await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        name: name,
        email: email,
        password: _password,
        role: "STUDENT",
      })
      .then((response) => {
        setUser(response.data.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem(
          "access_token",
          response.data.data.access_token
        );
      })
      .catch((e) => {
        console.log(e);
        setError(e.response?.data?.message || "Login failed");
        success = false;
      })
      .finally(() => {
        setLoading(false);
      });
    return success;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        error,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
