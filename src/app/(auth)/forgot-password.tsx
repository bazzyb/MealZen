import { Stack } from "expo-router";

import { ForgotPasswordLayout } from "@/views/auth/forgotPassword";

export default function ForgotPassword() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Forgot Password",
        }}
      />
      <ForgotPasswordLayout />
    </>
  );
}
