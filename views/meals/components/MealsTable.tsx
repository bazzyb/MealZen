import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View } from "react-native";

import { CloseButton, ExternalLink, Table, Text, ViewColumn, ViewRow } from "@/components";
import { useDeleteMeal } from "@/db/mutations/useDeleteMeal";
import { useGetMeals } from "@/db/queries/useGetMeals";
import { MealRecord } from "@/db/schemas/meal";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  setSelectedMeal: (meal: MealRecord | null) => void;
};

export function MealsTable({ setSelectedMeal }: Props) {
  const { colors } = useAppTheme();

  const { data: meals, isLoading } = useGetMeals();
  const { mutate: deleteMeal, isMutating: isDeletingMeal } = useDeleteMeal();

  if (isLoading) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!meals.length) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text>No meals found</Text>
      </View>
    );
  }

  return (
    <Table
      hideHeader
      data={meals}
      onRowPress={setSelectedMeal}
      columns={[
        {
          id: "name",
          accessorFn: ({ recipe_url, ...meal }) => (
            <ViewRow alignItems="center">
              <ViewColumn paddingRight={8}>
                <Text>{meal.name}</Text>
                {!!recipe_url && (
                  <ExternalLink url={recipe_url} size={11}>
                    Recipe
                  </ExternalLink>
                )}
              </ViewColumn>
              {!!meal.is_simple && <FontAwesome5 name="umbrella-beach" size={12} color={colors.success} />}
            </ViewRow>
          ),
        },
        {
          id: "delete-row",
          accessorFn: meal => <CloseButton onPress={async () => deleteMeal(meal.id)} disabled={isDeletingMeal} />,
          width: 28,
        },
      ]}
    />
  );
}
