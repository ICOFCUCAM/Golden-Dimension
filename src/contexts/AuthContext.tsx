import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { fetchUserRoles, pickPrimaryRole, type AppRole } from '@/lib/roles';

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  roles: AppRole[];
  rolesLoading: boolean;
  primaryRole: AppRole | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);

  const loadRoles = async (userId: string | null) => {
    if (!userId) {
      setRoles([]);
      return;
    }
    setRolesLoading(true);
    try {
      const next = await fetchUserRoles(userId);
      setRoles(next);
    } finally {
      setRolesLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (data.session?.user.id) {
        void loadRoles(data.session.user.id);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      void loadRoles(next?.user.id ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setRoles([]);
  };

  const refreshRoles = async () => {
    await loadRoles(session?.user.id ?? null);
  };

  const primaryRole = pickPrimaryRole(roles);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        roles,
        rolesLoading,
        primaryRole,
        signIn,
        signOut,
        refreshRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
