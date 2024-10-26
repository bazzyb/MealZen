import { useState } from "react";

import { Button, TextInput, ViewColumn, ViewRow } from "@/components";
import { useCreateMeal } from "@/db/mutations/useCreateMeal";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

import { MealsTable } from "./components/MealsTable";

export default function MealsView() {
  const [mealName, setMealName] = useState("");

  const { colors } = useAppTheme();

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
    <ViewColumn padding={0} flex={1}>
      <ViewRow justifyContent="center" gap={8} padding={16} borderBottomWidth={1} borderBottomColor={colors.gray[5]}>
        <TextInput placeholder="Meal name" value={mealName} onChangeText={setMealName} style={{ flex: 1 }} />
        <Button onPress={handleCreateMeal} disabled={isCreatingMeal} color="success">
          Create Meal
        </Button>
      </ViewRow>
      <MealsTable />
    </ViewColumn>
  );
}
