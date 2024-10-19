import { AuthError, type AuthSession, type AuthUser } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import Toast from "react-native-toast-message";

import { LoadingSplash } from "@/components/LoadingSplash";
import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

type AuthContextType = {
  session: AuthSession | null;
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  isSyncEnabled: boolean;
  toggleSync: () => void;
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
    try {
      const { data, error } = await supabase.client.auth.getSession();

      if (error) {
        throw error;
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }

      setIsSyncEnabled(!!data.session);
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to establish session",
        text2: error instanceof AuthError ? error.message : "",
      });
      Logger.error(error);
      setIsSyncEnabled(false);
      setIsLoading(false);
    }
  }

  function toggleSync() {
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
    return <LoadingSplash />;
  }

  return (
    <AuthContext.Provider value={{ ...value, isSyncEnabled: value.isSyncEnabled }}>{children}</AuthContext.Provider>
  );
}
