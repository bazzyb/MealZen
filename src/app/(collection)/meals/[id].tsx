import { Stack } from "expo-router";

import { MealView } from "@/views/collection/meal";

export default function Meal() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Meal Details",
        }}
      />
      <MealView />
    </>
  );
}
