import { MenuItem } from "../components/MenuItem";
import { usePowerSync } from "@powersync/react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import { Text, ViewColumn } from "@/components";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useAuth } from "@/providers/AuthProvider";
import { handleDisableSync } from "@/utils/sync";

import { SubInfo } from "./Subs";
import { UpdateEmailModal } from "./UpdateEmailModal";
import { UserInfo } from "./User";

export default function AccountLayout() {
  const { signOut, user, resetPassword } = useAuth();
  const powerSync = usePowerSync();

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
      setIsChangingAuth(true);
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
      setIsChangingAuth(false);
    }
  }

  async function handleSignOut() {
    setIsChangingAuth(true);
    try {
      await handleDisableSync(powerSync);

      // Sign out of supabase auth
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

  return (
    <ScrollView>
      <ViewColumn height="100%">
        {isChangingAuth && <LoadingOverlay />}
        <UserInfo />
        <SubInfo />
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
    </ScrollView>
  );
}
