import { Stack } from "expo-router";

import CuisinesView from "@/views/collection/cuisines";

export default function Cuisines() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Cuisines",
        }}
      />
      <CuisinesView />
    </>
  );
}
