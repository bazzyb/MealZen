import { useState } from "react";

import { Button, TextInput, ViewColumn, ViewRow } from "@/components";
import { useCreateMeal } from "@/db/mutations/useCreateMeal";
import { Logger } from "@/utils/logger";

import { MealsTable } from "./components/MealsTable";

export default function MealsView() {
  const [mealName, setMealName] = useState("");

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
    <ViewColumn gap={16} padding={0} flex={1}>
      <ViewRow justifyContent="center" gap={8} paddingHorizontal={16} paddingTop={16}>
        <TextInput placeholder="Meal name" value={mealName} onChangeText={setMealName} style={{ flex: 1 }} />
        <Button onPress={handleCreateMeal} disabled={isCreatingMeal} color="green">
          Create Meal
        </Button>
      </ViewRow>
      <MealsTable />
    </ViewColumn>
  );
}
