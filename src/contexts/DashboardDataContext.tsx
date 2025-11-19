import { useGet } from "@/hooks";
import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { Role } from "@/types";

interface DashboardDataContextType {
  data: any ;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<any>;
  reset: () => void;
}

const DashboardDataContext = createContext<DashboardDataContextType | undefined>(undefined);

const getUserRoleString = (role: Role | undefined) => {
  role = role || Role.STUDENT;
  switch (role) {
    case Role.STUDENT:
      return "student";
    case Role.SUPERVISOR:
      return "supervisor";
    case Role.ADMIN:
      return "admin";
    default:
      return;
  }
};

export const DashboardDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const { data, loading, error, execute, reset } = useGet<any>(
    `/${getUserRoleString(user?.role)}-dashboard`,
    {
      immediate: true,
    }
  );

  return (
    <DashboardDataContext.Provider
      value={{ data, loading, error, execute, reset }}
    >
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDashboardData = () => {
  const context = useContext(DashboardDataContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardData must be used within an DashboardDataProvider"
    );
  }
  return context;
};
