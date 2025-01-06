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
  const [page, setPage] = useState("");

  const { colors } = useAppTheme();

  const { mutate: createMeal, isMutating: isCreatingMeal } = useCreateMeal();

  async function handleCreateMeal() {
    if (!mealName) {
      return;
    }
    try {
      await createMeal({ name: mealName, bookId, page: page ? parseInt(page) : undefined });
      setMealName("");
      setPage("");
    } catch (err) {
      Logger.error("Failed to create meal", err);
    }
  }

  return (
    <ViewRow
      gap={8}
      paddingVertical={16}
      paddingHorizontal={8}
      borderBottomWidth={StyleSheet.hairlineWidth}
      borderBottomColor={colors.gray[5]}
      flexWrap="wrap"
    >
      <ViewRow flex={1} minWidth="50%">
        <TextInput placeholder="Name" value={mealName} onChangeText={setMealName} />
      </ViewRow>
      {bookId && (
        <ViewRow flexBasis="20%">
          <TextInput placeholder="Page" value={page} onChangeText={setPage} keyboardType="numeric" />
        </ViewRow>
      )}
      <ViewRow>
        <Button onPress={handleCreateMeal} disabled={!mealName || isCreatingMeal} color="success">
          Add Meal
        </Button>
      </ViewRow>
    </ViewRow>
  );
}
