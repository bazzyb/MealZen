import { useState } from "react";
import { StyleSheet } from "react-native";

import { Button, TextInput, ViewRow } from "@/components";
import { useCreateMeal } from "@/db/meal";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

type Props = {
  bookId?: string;
};

export function AddMealForm({ bookId }: Props) {
  const [mealName, setMealName] = useState("");

  const { colors } = useAppTheme();

  const { mutate: createMeal, isMutating: isCreatingMeal } = useCreateMeal();

  async function handleCreateMeal() {
    if (!mealName) {
      return;
    }
    try {
      await createMeal({ name: mealName, bookId });
      setMealName("");
    } catch (err) {
      Logger.error("Failed to create meal", err);
    }
  }

  return (
    <ViewRow
      justifyContent="center"
      gap={8}
      padding={16}
      borderBottomWidth={StyleSheet.hairlineWidth}
      borderBottomColor={colors.gray[5]}
    >
      <TextInput placeholder="Meal name" value={mealName} onChangeText={setMealName} style={{ flex: 1 }} />
      <Button onPress={handleCreateMeal} disabled={!mealName || isCreatingMeal} color="success">
        Create Meal
      </Button>
    </ViewRow>
  );
}
