import { MenuItem } from "../components/MenuItem";
import { usePowerSync } from "@powersync/react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { Text, ViewColumn, ViewRow } from "@/components";
import { buildSchema } from "@/db";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

export default function AccountLayout() {
  const { signOut, user, toggleSync } = useAuth();
  const powerSync = usePowerSync();

  const { colors } = useAppTheme();

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

      router.navigate("/(tab-views)/settings");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "An error occurred while signing out",
        // text2: error.message,
      });
    }
    setIsChangingAuth(false);
  }

  return (
    <ViewColumn height="100%">
      <ViewRow
        paddingHorizontal={16}
        paddingVertical={8}
        borderBottomColor={colors.gray[5]}
        borderBottomWidth={StyleSheet.hairlineWidth}
      >
        <Text size={12} color={colors.textSecondary}>
          {user?.email}
        </Text>
      </ViewRow>
      <MenuItem onPress={openSignOutAlert} disabled={isChangingAuth}>
        <Text>Sign Out</Text>
      </MenuItem>
    </ViewColumn>
  );
}
