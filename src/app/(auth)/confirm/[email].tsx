import { Stack } from "expo-router";

import { ConfirmLayout } from "@/views/auth/confirm";

export default function Confirm() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Confirm Email",
        }}
      />
      <ConfirmLayout />
    </>
  );
}
