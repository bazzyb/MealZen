import { AuthError, type AuthSession, AuthSessionMissingError, type AuthUser } from "@supabase/supabase-js";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import Purchases from "react-native-purchases";
import Toast from "react-native-toast-message";

import { LoadingSplash } from "@/components/LoadingSplash";
import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

type AuthContextType = {
  session: AuthSession | null;
  user: AuthUser | null;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    user: AuthUser | null;
    session: AuthSession | null;
  }>;
  resendEmailConfirmation: (email: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
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

  async function signUp(email: string, password: string) {
    Logger.log("signUp");

    const { data, error } = await supabase.client.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error("We were unable to create your account at this time. Please try again later.");
    }

    setUser(data.session?.user || null);
    setSession(data.session);
    return data;
  }

  async function resendEmailConfirmation(email: string) {
    Logger.log("resendEmailConfirmation");

    const { error } = await supabase.client.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    Logger.log("signIn");

    const { data, error } = await supabase.client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.code === "email_not_confirmed") {
        throw new Error("confirm_email");
      }
      if (error.code === "invalid_credentials") {
        throw new Error("Invalid email or password.");
      }
      throw error;
    }

    if (!data.session || !data.user) {
      throw new Error("Could not sign in at this time. Please try again later.");
    }

    await Purchases.logIn(data.user.id);
    setSession(data.session);
    setUser(data.session.user);

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

  async function _handleGetSession(refresh = false) {
    if (refresh) {
      return supabase.client.auth.refreshSession();
    }
    return supabase.client.auth.getSession();
  }

  async function getSession(refresh = false) {
    try {
      const { data, error } = await _handleGetSession(refresh);

      if (error && error.name !== AuthSessionMissingError.name && !error?.message.includes("Refresh Token Not Found")) {
        throw error;
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }

      setIsLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to establish session",
        text2: error instanceof AuthError ? error.message : "",
      });
      Logger.error(error);
      setIsLoading(false);
    }
  }

  async function updateEmail(newEmail: string) {
    const { data, error } = await supabase.client.auth.updateUser({
      email: newEmail,
    });

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error("Could not update email at this time. Please try again later.");
    }

    await getSession(true);
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.client.auth.resetPasswordForEmail(email);
    if (error) {
      throw error;
    }
  }

  useEffect(() => {
    getSession(true);
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      signUp,
      resendEmailConfirmation,
      signIn,
      signOut,
      updateEmail,
      resetPassword,
    }),
    [session, user],
  );

  if (isLoading) {
    return <LoadingSplash />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
