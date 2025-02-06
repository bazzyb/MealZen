import { Stack } from "expo-router";

import { DevSettingsView } from "@/views/settings/DevSettings";

export default function DevSettings() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Dev Settings",
        }}
      />
      <DevSettingsView />
    </>
  );
}
