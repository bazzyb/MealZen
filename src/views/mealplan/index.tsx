import { router } from "expo-router";
import { useState } from "react";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { SectionOverlay } from "@/components/SectionOverlay";
import { Button } from "@/components/core/Button";
import { LinkButton } from "@/components/core/LinkButton";
import { Text } from "@/components/core/Text";
import { useGetMeals } from "@/db/meal";
import { useGetMealplan } from "@/db/mealplan";
import { Mealplan } from "@/db/mealplan/schema";

import { EditMealplanEntryModal } from "./components/EditMealplanEntryModal";
import { MealplanTable } from "./components/MealplanTable";

export default function MealPlanView() {
  const [selectedMealplanEntry, setSelectedMealplanEntry] = useState<Mealplan | null>(null);

  const { data: meals } = useGetMeals();
  const { data: mealplan } = useGetMealplan();

  if (!mealplan.length && !meals.length) {
    return (
      <ViewColumn height="100%" alignItems="center" justifyContent="center">
        <Text>No meals found.</Text>
        <Text>Add some meals to generate a meal plan.</Text>
        <LinkButton href="/(collection)/meals" style={{ marginTop: 8 }}>
          Go to meals
        </LinkButton>
      </ViewColumn>
    );
  }

  return (
    <>
      <ViewColumn height="100%">
        <MealplanTable setSelectedMealplanEntry={setSelectedMealplanEntry} mealplan={mealplan} />
        <SectionOverlay position="bottom">
          <Button onPress={() => router.navigate("/generate")}>Generate New Meal Plan</Button>
        </SectionOverlay>
      </ViewColumn>
      <EditMealplanEntryModal
        selectedMealplanEntry={selectedMealplanEntry}
        handleClose={() => setSelectedMealplanEntry(null)}
      />
    </>
  );
}
