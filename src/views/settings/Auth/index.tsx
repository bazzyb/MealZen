import { MenuItem } from "../components/MenuItem";
import { router } from "expo-router";

import { Text } from "@/components";
import { useAuth } from "@/providers/AuthProvider";

export function Auth() {
  const { user } = useAuth();

  async function goToSignup() {
    router.navigate("/signup");
  }

  async function goToSignIn() {
    router.navigate("/signin");
  }

  async function goToAccount() {
    router.navigate("/(auth)/account");
  }

  return (
    <>
      {!user && (
        <>
          <MenuItem role="link" onPress={goToSignup}>
            <Text>Sign Up</Text>
          </MenuItem>
          <MenuItem role="link" onPress={goToSignIn}>
            <Text>Sign In</Text>
          </MenuItem>
        </>
      )}
      {user && (
        <MenuItem role="link" onPress={goToAccount}>
          <Text>Account</Text>
        </MenuItem>
      )}
    </>
  );
}
