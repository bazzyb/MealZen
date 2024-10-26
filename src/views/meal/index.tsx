import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { Button, Text, ViewColumn, ViewRow } from "@/components";
import { useDeleteMeal } from "@/db/mutations/useDeleteMeal";
import { useGetMeal } from "@/db/queries/useGetMeal";
import { useAppTheme } from "@/styles/useAppTheme";

import { EditMealModal } from "./components/EditMealModal";

export function MealView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, headerFontFamily } = useAppTheme();

  const [showEditMealModal, setShowEditMealModal] = useState(false);
  const { mutate: deleteMeal, isMutating: isDeleting } = useDeleteMeal();
  const { data: mealData } = useGetMeal(id);
  const meal = mealData[0];

  function openDeleteAlert() {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDeleteMeal,
      },
    ]);
  }

  async function handleDeleteMeal() {
    await deleteMeal(id);
    router.back();
  }

  if (!meal) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ViewRow padding={16} borderBottomColor={colors.gray[5]} borderBottomWidth={1} gap={16} height="auto">
        <ViewColumn flex={1}>
          <Text style={{ fontFamily: headerFontFamily, fontSize: 18 }}>{meal[0].name}</Text>
          {/* <Text style={{ color: colors.textSecondary }}>{meal[0]}</Text> */}
        </ViewColumn>
        <ViewColumn gap={8}>
          <Button
            color="success"
            style={{ paddingVertical: 6 }}
            textStyle={{ textAlign: "center" }}
            onPress={() => setShowEditMealModal(true)}
          >
            Edit
          </Button>
          <Button
            color="error"
            style={{ paddingVertical: 6 }}
            textStyle={{ textAlign: "center" }}
            onPress={openDeleteAlert}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </ViewColumn>
      </ViewRow>
      <EditMealModal show={showEditMealModal} selectedMeal={meal} handleClose={() => setShowEditMealModal(false)} />
    </>
  );
}
