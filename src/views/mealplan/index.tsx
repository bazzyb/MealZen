import { useState } from "react";

import { Button, ViewColumn } from "@/components";
import { GenerateMealplanModal } from "@/views/mealplan/components/GenerateMealplanModal";

import { MealplanTable } from "./components/MealplanTable";

export default function MealPlanView() {
  const [generateModalOpen, setGenerateModalOpen] = useState(false);

  return (
    <>
      <ViewColumn>
        <Button style={{ width: "auto", margin: 16 }} onPress={() => setGenerateModalOpen(true)}>
          Generate New Meal Plan
        </Button>
        <MealplanTable />
      </ViewColumn>
      <GenerateMealplanModal isVisible={generateModalOpen} handleClose={() => setGenerateModalOpen(false)} />
    </>
  );
}
