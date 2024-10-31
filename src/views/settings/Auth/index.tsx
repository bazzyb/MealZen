import { MenuItem } from "../components/MenuItem";
import { usePowerSync } from "@powersync/react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

import { Text } from "@/components";
import { buildSchema } from "@/db";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

import { SignInModal } from "./SignInModal";

export function Auth() {
  const { signOut, user, toggleSync } = useAuth();
  const { colors } = useAppTheme();
  const powerSync = usePowerSync();

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [isChangingAuth, setIsChangingAuth] = useState(false);

  function openSignOutAlert() {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: handleSignOut,
      },
    ]);
  }

  async function handleSignOut() {
    setIsChangingAuth(true);
    try {
      // Disconnect from supabase, and switch to local schema
      await powerSync.disconnectAndClear();
      await powerSync.updateSchema(buildSchema(false));
      Logger.log("disconnected");

      // Sign out of supabase auth
      await signOut();

      // Turn off sync
      toggleSync();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "An error occurred while signing out",
        // text2: error.message,
      });
    }
    setIsChangingAuth(false);
  }

  async function goToSignup() {
    router.navigate("/signup");
  }

  async function handleSignInSignOut() {
    if (user) {
      openSignOutAlert();
    } else {
      setSignInModalOpen(true);
    }
  }

  return (
    <>
      {!user && (
        <MenuItem role="link" onPress={goToSignup} disabled={isChangingAuth}>
          <Text>Sign Up</Text>
        </MenuItem>
      )}
      <MenuItem onPress={handleSignInSignOut} disabled={isChangingAuth}>
        <Text>{user ? "Sign Out" : "Sign In"}</Text>
        {user && (
          <Text size={12} color={colors.textSecondary}>
            {user.email}
          </Text>
        )}
      </MenuItem>
      <SignInModal
        isVisible={signInModalOpen}
        handleClose={() => setSignInModalOpen(false)}
        setIsChangingAuth={setIsChangingAuth}
      />
    </>
  );
}
