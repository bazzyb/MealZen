import { MenuItem } from "../components/MenuItem";
import { router } from "expo-router";
import { useState } from "react";

import { Text } from "@/components";
import { useAuth } from "@/providers/AuthProvider";

import { SignInModal } from "./SignInModal";

export function Auth() {
  const { user } = useAuth();

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [isChangingAuth, setIsChangingAuth] = useState(false);

  async function goToSignup() {
    router.navigate("/signup");
  }

  async function handleSignIn() {
    setSignInModalOpen(true);
  }

  async function goToAccount() {
    router.navigate("/(auth)/account");
  }

  return (
    <>
      {!user && (
        <>
          <MenuItem role="link" onPress={goToSignup} disabled={isChangingAuth}>
            <Text>Sign Up</Text>
          </MenuItem>
          <MenuItem onPress={handleSignIn} disabled={isChangingAuth}>
            <Text>Sign In</Text>
          </MenuItem>
        </>
      )}
      {user && (
        <MenuItem role="link" onPress={goToAccount}>
          <Text>Account</Text>
        </MenuItem>
      )}
      <SignInModal
        isVisible={signInModalOpen}
        handleClose={() => setSignInModalOpen(false)}
        setIsChangingAuth={setIsChangingAuth}
      />
    </>
  );
}
