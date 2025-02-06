import { Stack } from "expo-router";

import AccountLayout from "@/views/auth/account";

export default function Account() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Account",
        }}
      />
      <AccountLayout />
    </>
  );
}
