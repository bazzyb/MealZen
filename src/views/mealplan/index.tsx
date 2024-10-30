import { router } from "expo-router";
import { useState } from "react";

import { Button, Text, ViewColumn } from "@/components";
import { LinkButton } from "@/components/core/LinkButton";
import { useGetMeals } from "@/db/meal";
import { Mealplan } from "@/db/mealplan/schema";

import { EditMealplanEntryModal } from "./components/EditMealplanEntryModal";
import { MealplanTable } from "./components/MealplanTable";

export default function MealPlanView() {
  const [selectedMealplanEntry, setSelectedMealplanEntry] = useState<Mealplan | null>(null);

  const { data: meals } = useGetMeals();

  if (!meals.length) {
    return (
      <ViewColumn height="100%" alignItems="center" justifyContent="center">
        <Text>No meals found.</Text>
        <Text>Add some meals to generate a meal plan.</Text>
        <LinkButton href="/meals" style={{ marginTop: 8 }}>
          Go to meals
        </LinkButton>
      </ViewColumn>
    );
  }

  return (
    <>
      <ViewColumn height="100%">
        <Button style={{ width: "auto", margin: 16 }} onPress={() => router.navigate("/generate")}>
          Generate New Meal Plan
        </Button>
        <MealplanTable setSelectedMealplanEntry={setSelectedMealplanEntry} />
      </ViewColumn>
      <EditMealplanEntryModal
        selectedMealplanEntry={selectedMealplanEntry}
        handleClose={() => setSelectedMealplanEntry(null)}
      />
    </>
  );
}
