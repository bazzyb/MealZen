import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";
import { Alert, Pressable } from "react-native";
import Toast from "react-native-toast-message";

import { Text, ViewColumn } from "@/components";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";

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
      await powerSync.disconnectAndClear();
      toggleSync();
      await signOut();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "An error occurred while signing out",
        // text2: error.message,
      });
    }
    setIsChangingAuth(false);
  }

  async function onPress() {
    if (user) {
      openSignOutAlert();
    } else {
      setSignInModalOpen(true);
    }
  }

  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          backgroundColor: pressed ? colors.rowActiveBackground : colors.background,
        })}
        disabled={isChangingAuth}
      >
        <ViewColumn padding={16} borderBottomColor={colors.text} borderBottomWidth={1}>
          <Text>{user ? "Sign Out" : "Sign In"}</Text>
          {user && (
            <Text size={12} color={colors.textSecondary}>
              {user.email}
            </Text>
          )}
        </ViewColumn>
      </Pressable>
      <SignInModal
        isVisible={signInModalOpen}
        handleClose={() => setSignInModalOpen(false)}
        setIsChangingAuth={setIsChangingAuth}
      />
    </>
  );
}
