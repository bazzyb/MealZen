import { MenuItem } from "../components/MenuItem";
import { usePowerSync } from "@powersync/react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { Text, ViewColumn } from "@/components";
import { buildSchema } from "@/db";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

import { UpdateEmailModal } from "./UpdateEmailModal";

export default function AccountLayout() {
  const { signOut, user, toggleSync, resetPassword } = useAuth();
  const powerSync = usePowerSync();

  const { colors, fontBold } = useAppTheme();

  const [updateEmailModalOpen, setUpdateEmailModalOpen] = useState(false);
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

  async function handleResetPassword() {
    if (user) {
      try {
        await resetPassword(user.email!);
        Toast.show({
          type: "success",
          text1: "Password reset email sent",
          text2: "Please check your email for instructions on how to reset your password.",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "An error occurred while sending the password reset email",
          // text2: error.message,
        });
      }
    }
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
    <>
      <ViewColumn height="100%">
        <ViewColumn
          paddingHorizontal={16}
          paddingVertical={8}
          borderBottomColor={colors.gray[5]}
          borderBottomWidth={StyleSheet.hairlineWidth}
        >
          <Text size={12} color={colors.textSecondary}>
            {user?.email}
          </Text>
          {user?.new_email && (
            <Text
              size={12}
              color={colors.green[1]}
              style={{ backgroundColor: colors.green[7], padding: 8, marginVertical: 4, fontFamily: fontBold }}
            >
              Your email change request is pending verification. You should have received an email to your old and new
              email addresses. Click the link in each email to verify your new email address.
            </Text>
          )}
        </ViewColumn>
        <MenuItem onPress={() => setUpdateEmailModalOpen(true)} disabled={isChangingAuth}>
          <Text>Change Email</Text>
        </MenuItem>
        <MenuItem onPress={handleResetPassword} disabled={isChangingAuth}>
          <Text>Reset Password</Text>
        </MenuItem>
        <MenuItem onPress={openSignOutAlert} disabled={isChangingAuth}>
          <Text>Sign Out</Text>
        </MenuItem>
      </ViewColumn>
      <UpdateEmailModal isVisible={updateEmailModalOpen} handleClose={() => setUpdateEmailModalOpen(false)} />
    </>
  );
}
