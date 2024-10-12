import type { AuthSession, AuthUser } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

import { LoadingIcon } from "@/components/LoadingIcon";
import { getSyncEnabled, setSyncEnabled } from "@/db/sync/utils";
import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

type AuthContextType = {
  session: AuthSession | null;
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  isSyncEnabled: boolean;
  toggleSync: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncEnabled, setIsSyncEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    getSyncEnabled().then(setIsSyncEnabled);
  }, []);

  async function signIn(email: string, password: string) {
    Logger.log("signIn");

    const { data, error } = await supabase.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (!data.session || !data.user) {
      throw new Error("Could not signIn to Supabase");
    }

    setSession(data.session);
    setUser(data.user);

    return data.user;
  }

  async function signOut() {
    Logger.log("signOut");
    const { error } = await supabase.client.auth.signOut();

    setSession(null);
    setUser(null);

    if (error) {
      Logger.error(error);
    }
  }

  async function getSession() {
    const { data } = await supabase.client.auth.getSession();

    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
    }

    setIsLoading(false);
  }

  async function toggleSync() {
    await setSyncEnabled(!isSyncEnabled);
    setIsSyncEnabled(!isSyncEnabled);
  }

  useEffect(() => {
    getSession();
  }, []);

  const value = useMemo(
    () => ({ session, user, signIn, signOut, isSyncEnabled, toggleSync }),
    [session, user, isSyncEnabled],
  );

  if (value.isSyncEnabled === null || isLoading) {
    return <LoadingIcon />;
  }

  return (
    <AuthContext.Provider value={{ ...value, isSyncEnabled: value.isSyncEnabled }}>{children}</AuthContext.Provider>
  );
}
