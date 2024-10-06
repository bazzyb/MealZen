import type { AuthSession, AuthUser } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { LoadingIcon } from "@/components/LoadingIcon";
import { TEST_EMAIL, TEST_PASSWORD } from "@/consts";
import { getSyncEnabled } from "@/db/sync/utils";
import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

export const AuthContext = createContext<{
  session: AuthSession | null;
  user: AuthUser | null;
  signIn: ({ session, user }: { session: AuthSession | null; user: AuthUser | null }) => void;
  signOut: () => void;
  isSyncEnabled: boolean;
  setIsSyncEnabled: (isSyncEnabled: boolean) => void;
}>({
  session: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
  isSyncEnabled: true,
  setIsSyncEnabled: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncEnabled, setIsSyncEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    getSyncEnabled().then(setIsSyncEnabled);
  }, []);

  async function signIn({ session, user }: { session: AuthSession | null; user: AuthUser | null }) {
    Logger.log("signIn");
    setSession(session);
    setUser(user);
  }

  async function signOut() {
    Logger.log("signOut");
    const { error } = await supabase.supabaseClient.auth.signOut();

    setSession(null);
    setUser(null);

    if (error) {
      Logger.error(error);
    }
  }

  async function getSession() {
    // should be called elsewhere once we have login flow
    await supabase.login(TEST_EMAIL, TEST_PASSWORD);
    const { data } = await supabase.supabaseClient.auth.getSession();

    if (data.session) {
      setSession(data.session);
      setUser(data.session.user);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!session) getSession();
    // if (session && !user) getUser();
  }, [session, user]);

  if (isSyncEnabled === null || isLoading) {
    return <LoadingIcon />;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        signIn,
        signOut,
        isSyncEnabled,
        setIsSyncEnabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
