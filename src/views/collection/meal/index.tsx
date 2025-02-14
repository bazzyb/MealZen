import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LongCookIcon, LongPrepIcon, OvernightIcon, SimpleMealIcon } from "@/components/Icons";
import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Button } from "@/components/core/Button";
import { ExternalLink } from "@/components/core/ExternalLink";
import { Heading } from "@/components/core/Heading";
import { Text } from "@/components/core/Text";
import { useDeleteMeals, useGetMeal } from "@/db/meal";
import { useAppTheme } from "@/styles/useAppTheme";

import { EditMealModal } from "./components/EditMealModal";

export function MealView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const [showEditMealModal, setShowEditMealModal] = useState(false);
  const { mutate: deleteMeal, isMutating: isDeleting } = useDeleteMeals();
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
    await deleteMeal([id]);
    router.back();
  }

  if (!meal) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ViewColumn padding={16} height="100%">
        <ViewColumn>
          <Heading style={{ fontSize: 24 }}>{meal.name}</Heading>
          {meal.book && (
            <Text style={{ color: colors.textSecondary }}>
              <Text bold>Book:</Text> {meal.book}
            </Text>
          )}
          {meal.page && (
            <Text style={{ color: colors.textSecondary }}>
              <Text bold>Page:</Text> {meal.page}
            </Text>
          )}
          {meal.recipe_url && (
            <ViewRow gap={4} alignItems="center">
              <Text bold>Link:</Text>
              <ExternalLink url={meal.recipe_url}>{meal.recipe_url}</ExternalLink>
            </ViewRow>
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
            onPress={() => setShowEditMealModal(true)}
            leftIcon={<Feather name="edit" size={18} color={colors.text} />}
          >
            Edit Meal
          </Button>
          <Button
            color="error"
            onPress={openDeleteAlert}
            disabled={isDeleting}
            leftIcon={<MaterialIcons name="delete-forever" size={22} color={colors.white} />}
          >
            Delete Meal
          </Button>
        </ViewColumn>
      </ViewColumn>
      <EditMealModal show={showEditMealModal} selectedMeal={meal} handleClose={() => setShowEditMealModal(false)} />
    </>
  );
}
