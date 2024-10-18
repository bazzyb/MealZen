import { useState } from "react";

import { Button, ViewColumn } from "@/components";
import { Mealplan } from "@/db/queries/useGetMealplan";
import { GenerateMealplanModal } from "@/views/mealplan/components/GenerateMealplanModal";

import { EditMealplanEntryModal } from "./components/EditMealplanEntryModal";
import { MealplanTable } from "./components/MealplanTable";

export default function MealPlanView() {
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [selectedMealplanEntry, setSelectedMealplanEntry] = useState<Mealplan | null>(null);

  return (
    <>
      <ViewColumn>
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
