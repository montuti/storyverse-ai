import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types/story';

/**
 * Clean Authentication Adapter Abstraction.
 * Currently backed by localStorage for zero-config prototype testing,
 * structured so Firebase Auth or Supabase Auth can be swapped in directly.
 */
export interface AuthServiceAdapter {
  getCurrentSession: () => AuthUser | null;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (name: string, email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
}

const SESSION_KEY = 'storyverse_auth_session_v1';
const USERS_DB_KEY = 'storyverse_auth_users_v1';

interface StoredAccount extends AuthUser {
  passwordHash: string;
}

const localStorageAuthAdapter: AuthServiceAdapter = {
  getCurrentSession: () => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  },

  signIn: async (email: string, password: string): Promise<AuthUser> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

    let accounts: StoredAccount[] = [];
    try {
      const raw = localStorage.getItem(USERS_DB_KEY);
      if (raw) accounts = JSON.parse(raw);
    } catch {
      accounts = [];
    }

    const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      if (existing.passwordHash !== password) {
        throw new Error('Incorrect password for this Storyverse account.');
      }
      const sessionUser: AuthUser = {
        id: existing.id,
        name: existing.name,
        email: existing.email,
        role: existing.role,
        createdAt: existing.createdAt,
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      return sessionUser;
    }

    // For seamless prototype sign-in, provision the account if not yet registered
    const derivedName = cleanEmail
      .split('@')[0]
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const newUser: StoredAccount = {
      id: `sv-user-${Date.now()}`,
      name: derivedName || 'Explorer',
      email: cleanEmail,
      role: 'Curatorial Member',
      createdAt: new Date().toISOString(),
      passwordHash: password,
    };

    accounts.push(newUser);
    try {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(accounts));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    } catch {
      // ignore storage errors
    }
    return newUser;
  },

  signUp: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthUser> => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      throw new Error('Please enter your full name or callsign.');
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    if (!password || password.length < 4) {
      throw new Error('Please choose a password of at least 4 characters.');
    }

    let accounts: StoredAccount[] = [];
    try {
      const raw = localStorage.getItem(USERS_DB_KEY);
      if (raw) accounts = JSON.parse(raw);
    } catch {
      accounts = [];
    }

    const newUser: StoredAccount = {
      id: `sv-user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      role: 'Founding Explorer',
      createdAt: new Date().toISOString(),
      passwordHash: password,
    };

    const filtered = accounts.filter((a) => a.email.toLowerCase() !== cleanEmail);
    filtered.push(newUser);

    try {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(filtered));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    } catch {
      // ignore storage errors
    }

    return newUser;
  },

  signOut: async () => {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  },
};

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signInDemoExplorer: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  authError: null,
  clearAuthError: () => {},
  signIn: async () => {},
  signUp: async () => {},
  signInDemoExplorer: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() =>
    localStorageAuthAdapter.getCurrentSession()
  );
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    setUser(localStorageAuthAdapter.getCurrentSession());
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    try {
      const loggedIn = await localStorageAuthAdapter.signIn(email, password);
      setUser(loggedIn);
    } catch (err: any) {
      setAuthError(err?.message || 'Authentication failed.');
      throw err;
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setAuthError(null);
    try {
      const created = await localStorageAuthAdapter.signUp(name, email, password);
      setUser(created);
    } catch (err: any) {
      setAuthError(err?.message || 'Registration failed.');
      throw err;
    }
  };

  const signInDemoExplorer = async () => {
    setAuthError(null);
    const demoUser = await localStorageAuthAdapter.signUp(
      'Aria Vance',
      'aria.vance@storyverse.io',
      'sol9-archive'
    );
    setUser(demoUser);
  };

  const signOut = async () => {
    await localStorageAuthAdapter.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        authError,
        clearAuthError: () => setAuthError(null),
        signIn,
        signUp,
        signInDemoExplorer,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
