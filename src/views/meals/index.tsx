import { useState } from "react";

import { Button, TextInput, ViewColumn, ViewRow } from "@/components";
import { useCreateMeal } from "@/db/mutations/useCreateMeal";
import { MealRecord } from "@/db/schemas/meal";
import { Logger } from "@/utils/logger";

import { EditMealModal } from "./components/EditMealModal";
import { MealsTable } from "./components/MealsTable";

export default function MealsView() {
  const [mealName, setMealName] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<MealRecord | null>(null);

  const { mutate: createMeal, isMutating: isCreatingMeal } = useCreateMeal();

  async function handleCreateMeal() {
    if (!mealName) {
      return;
    }
    try {
      await createMeal(mealName);
      setMealName("");
    } catch (err) {
      Logger.error("Failed to create meal", err);
    }
  }

  return (
    <>
      <ViewColumn gap={16} padding={0} flex={1}>
        <ViewRow justifyContent="center" gap={8} paddingHorizontal={16} paddingTop={16}>
          <TextInput placeholder="Meal name" value={mealName} onChangeText={setMealName} style={{ flex: 1 }} />
          <Button onPress={handleCreateMeal} disabled={isCreatingMeal} color="success">
            Create Meal
          </Button>
        </ViewRow>
        <MealsTable setSelectedMeal={setSelectedMeal} />
      </ViewColumn>
      <EditMealModal selectedMeal={selectedMeal} handleClose={() => setSelectedMeal(null)} />
    </>
  );
}
