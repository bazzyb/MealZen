import { useMemo, useState } from "react";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useGetExampleMeals } from "@/db/examplemeal";
import { useAppTheme } from "@/styles/useAppTheme";

export function ExampleMealsTable() {
  const { colors } = useAppTheme();

  const [searchMeals, setSearchMeals] = useState("");
  const { data: exampleMeals, isLoading } = useGetExampleMeals();

  const filteredMeals = useMemo(() => {
    return exampleMeals.filter(meal => {
      return meal.name.toLowerCase().includes(searchMeals);
    });
  }, [exampleMeals, searchMeals]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Table
      data={filteredMeals}
      onSearchChange={setSearchMeals}
      columns={[
        {
          id: "name",
          accessorFn: exampleMeal => (
            <ViewRow alignItems="center" gap={8}>
              <ViewColumn paddingRight={8}>
                <Text>{exampleMeal.name}</Text>
                <Text color={colors.textSecondary} size={11}>
                  {exampleMeal.cuisine}
                </Text>
              </ViewColumn>
            </ViewRow>
          ),
        },
      ]}
    />
  );
}
