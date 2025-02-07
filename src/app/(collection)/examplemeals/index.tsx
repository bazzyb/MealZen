import { Stack } from "expo-router";

import ExampleMealsView from "@/views/collection/examplemeals";

export default function ExampleMeals() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Inspiration",
        }}
      />
      <ExampleMealsView />
    </>
  );
}
