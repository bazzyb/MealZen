import { AntDesign } from "@expo/vector-icons";
import { useMemo, useState } from "react";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Table } from "@/components/Table";
import { IconButton } from "@/components/core/IconButton";
import { Text } from "@/components/core/Text";
import { useGetExampleMeals } from "@/db/examplemeal";
import { useCreateMeal, useGetMeals } from "@/db/meal";
import { useAppTheme } from "@/styles/useAppTheme";

function isMealAlreadyAdded(meal: string, mealNames: Array<string>) {
  return mealNames.includes(meal.toLowerCase());
}

export function ExampleMealsTable() {
  const { colors } = useAppTheme();

  const [searchMeals, setSearchMeals] = useState("");

  const { data: exampleMeals, isLoading: isExamplesLoading } = useGetExampleMeals();
  const { data: meals, isLoading: isMealsLoading } = useGetMeals();
  const { mutate: createMeal, isMutating } = useCreateMeal();

  const existingMealNames = meals.map(meal => meal.name.toLowerCase());

  const filteredMeals = useMemo(() => {
    return exampleMeals.filter(meal => {
      return meal.name.toLowerCase().includes(searchMeals);
    });
  }, [exampleMeals, searchMeals]);

  async function handleCreateMeal(name: string) {
    await createMeal({ name });
  }

  if (isExamplesLoading || isMealsLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Table
      data={filteredMeals}
      onSearchChange={setSearchMeals}
      columns={[
        {
          id: "name",
          accessorFn: exampleMeal => {
            const mealAdded = isMealAlreadyAdded(exampleMeal.name, existingMealNames);
            return (
              <ViewRow alignItems="center" gap={8}>
                <ViewColumn paddingRight={8}>
                  <Text>{exampleMeal.name}</Text>
                  <Text color={colors.textSecondary} size={11}>
                    {exampleMeal.cuisine}
                  </Text>
                </ViewColumn>
                <ViewRow marginLeft="auto">
                  {mealAdded && (
                    <IconButton onPress={() => handleCreateMeal(exampleMeal.name)} disabled={mealAdded || isMutating}>
                      <AntDesign name="checkcircle" size={24} color={colors.success} />
                    </IconButton>
                  )}
                  {!mealAdded && (
                    <IconButton onPress={() => handleCreateMeal(exampleMeal.name)} disabled={mealAdded || isMutating}>
                      <AntDesign name="pluscircle" size={24} color={colors.white} />
                    </IconButton>
                  )}
                </ViewRow>
              </ViewRow>
            );
          },
        },
      ]}
    />
  );
}
