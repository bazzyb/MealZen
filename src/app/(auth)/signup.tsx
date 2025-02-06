import { Stack } from "expo-router";

import { SignupLayout } from "@/views/auth/signup";

export default function Signup() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Sign Up",
        }}
      />
      <SignupLayout />
    </>
  );
}
