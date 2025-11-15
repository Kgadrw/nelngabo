import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { adminApi } from "@/lib/api";

type LoginInput = {
  username: string;
  password: string;
};

type AuthState = {
  username: string | null;
  isAuthenticated: boolean;
};

type AuthContextValue = {
  username: string | null;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
  updateCredentials: (payload: { currentPassword: string; username?: string; password?: string }) => Promise<void>;
};

const STORAGE_KEY = "stark-admin-auth";

const safeParse = (raw: string | null): AuthState | null => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>(() => {
    const cached = safeParse(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null);
    return (
      cached ?? {
        username: null,
        isAuthenticated: false,
      }
    );
  });

  const persist = (next: AuthState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn("Unable to persist auth state", error);
    }
  };

  const login = useCallback(
    async (input: LoginInput) => {
      const response = await adminApi.login(input);
      if (!response.success) {
        throw new Error("Unable to login");
      }
      persist({ username: response.username, isAuthenticated: true });
    },
    [],
  );

  const logout = useCallback(() => {
    persist({ username: null, isAuthenticated: false });
  }, []);

  const updateCredentials = useCallback(
    async ({ currentPassword, username, password }: { currentPassword: string; username?: string; password?: string }) => {
      const response = await adminApi.updateCredentials({ currentPassword, username, password });
      if (!response.success) {
        throw new Error("Unable to update credentials");
      }
      persist({ username: response.username, isAuthenticated: state.isAuthenticated });
    },
    [state.isAuthenticated],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      username: state.username,
      isAuthenticated: state.isAuthenticated,
      login,
      logout,
      updateCredentials,
    }),
    [state.username, state.isAuthenticated, login, logout, updateCredentials],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

