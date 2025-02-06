import { Stack } from "expo-router";

import { SignInLayout } from "@/views/auth/signin";

export default function SignIn() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Sign In",
        }}
      />
      <SignInLayout />
    </>
  );
}
