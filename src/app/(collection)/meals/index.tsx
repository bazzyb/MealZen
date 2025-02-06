import { Stack } from "expo-router";

import MealsView from "@/views/collection/meals";

export default function Meals() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Meals",
        }}
      />
      <MealsView />
    </>
  );
}
