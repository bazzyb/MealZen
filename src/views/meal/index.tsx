import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, ExternalLink, Text, ViewColumn, ViewRow } from "@/components";
import { LongCookIcon, LongPrepIcon, OvernightIcon, SimpleMealIcon } from "@/components/Icons";
import { useDeleteMeal } from "@/db/mutations/useDeleteMeal";
import { useGetMeal } from "@/db/queries/useGetMeal";
import { useAppTheme } from "@/styles/useAppTheme";

import { EditMealModal } from "./components/EditMealModal";

export function MealView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, headerFontFamily, fontBold } = useAppTheme();
  const insets = useSafeAreaInsets();

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
      <ViewColumn padding={16} height="100%">
        <ViewColumn>
          <Text style={{ fontFamily: headerFontFamily, fontSize: 24 }}>{meal.name}</Text>
          {meal.book && (
            <Text style={{ color: colors.textSecondary }}>
              <Text style={{ fontFamily: fontBold }}>Book:</Text> {meal.book}
            </Text>
          )}
          {meal.page && (
            <Text style={{ color: colors.textSecondary }}>
              <Text style={{ fontFamily: fontBold }}>Page:</Text> {meal.page}
            </Text>
          )}
          {meal.recipe_url && (
            <ExternalLink url={meal.recipe_url} size={11}>
              {meal.recipe_url}
            </ExternalLink>
          )}
        </ViewColumn>
        <ViewColumn marginTop={32} gap={8}>
          <ViewRow gap={8} alignItems="center">
            <SimpleMealIcon disabled={!meal.is_simple} />
            <Text
              style={{
                color: meal.is_simple ? colors.text : colors.gray[5],
                textDecorationLine: meal.is_simple ? "none" : "line-through",
              }}
            >
              Simple
            </Text>
          </ViewRow>
          <ViewRow gap={8} alignItems="center">
            <OvernightIcon disabled={!meal.is_overnight} />
            <Text
              style={{
                color: meal.is_overnight ? colors.text : colors.gray[5],
                textDecorationLine: meal.is_overnight ? "none" : "line-through",
              }}
            >
              Overnight Prep
            </Text>
          </ViewRow>
          <ViewRow gap={8} alignItems="center">
            <LongCookIcon disabled={!meal.is_long_cook} />
            <Text
              style={{
                color: meal.is_long_cook ? colors.text : colors.gray[5],
                textDecorationLine: meal.is_long_cook ? "none" : "line-through",
              }}
            >
              Long Cook
            </Text>
          </ViewRow>
          <ViewRow gap={8} alignItems="center">
            <LongPrepIcon disabled={!meal.is_long_prep} />
            <Text
              style={{
                color: meal.is_long_prep ? colors.text : colors.gray[5],
                textDecorationLine: meal.is_long_prep ? "none" : "line-through",
              }}
            >
              Long Prep
            </Text>
          </ViewRow>
        </ViewColumn>
        <ViewColumn gap={8} marginTop="auto" marginBottom={insets.bottom + 16}>
          <Button
            color="success"
            style={{ paddingVertical: 6 }}
            textStyle={{ textAlign: "center" }}
            onPress={() => setShowEditMealModal(true)}
          >
            Edit Meal
          </Button>
          <Button
            color="error"
            style={{ paddingVertical: 6 }}
            textStyle={{ textAlign: "center" }}
            onPress={openDeleteAlert}
            disabled={isDeleting}
          >
            Delete Meal
          </Button>
        </ViewColumn>
      </ViewColumn>
      <EditMealModal show={showEditMealModal} selectedMeal={meal} handleClose={() => setShowEditMealModal(false)} />
    </>
  );
}
