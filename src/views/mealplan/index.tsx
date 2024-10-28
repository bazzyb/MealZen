import { useState } from "react";

import { Button, Text, ViewColumn } from "@/components";
import { LinkButton } from "@/components/core/LinkButton";
import { useGetMeals } from "@/db/meal";
import { Mealplan } from "@/db/schemas/mealplan";
import { GenerateMealplanModal } from "@/views/mealplan/components/GenerateMealplanModal";

import { EditMealplanEntryModal } from "./components/EditMealplanEntryModal";
import { MealplanTable } from "./components/MealplanTable";

export default function MealPlanView() {
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
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
        <Button style={{ width: "auto", margin: 16 }} onPress={() => setGenerateModalOpen(true)}>
          Generate New Meal Plan
        </Button>
        <MealplanTable setSelectedMealplanEntry={setSelectedMealplanEntry} />
      </ViewColumn>
      <GenerateMealplanModal isVisible={generateModalOpen} handleClose={() => setGenerateModalOpen(false)} />
      <EditMealplanEntryModal
        selectedMealplanEntry={selectedMealplanEntry}
        handleClose={() => setSelectedMealplanEntry(null)}
      />
    </>
  );
}
