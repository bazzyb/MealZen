import { Stack } from "expo-router";

import GenerateView from "@/views/generate";

export default function Generate() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Generate Meal Plan",
        }}
      />
      <GenerateView />
    </>
  );
}
