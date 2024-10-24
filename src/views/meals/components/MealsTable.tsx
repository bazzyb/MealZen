import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View } from "react-native";

import { ExternalLink, Table, Text, ViewColumn, ViewRow } from "@/components";
import { useGetBooks } from "@/db/queries/useGetBooks";
import { useGetMeals } from "@/db/queries/useGetMeals";
import { MealRecord } from "@/db/schemas/meal";
import { useAppTheme } from "@/styles/useAppTheme";

import { BookInfo } from "./BookInfo";

type Props = {
  setSelectedMeal: (meal: MealRecord | null) => void;
};

export function MealsTable({ setSelectedMeal }: Props) {
  const { colors } = useAppTheme();

  const { data: meals, isLoading } = useGetMeals();
  const { data: books, isLoading: isLoadingBooks } = useGetBooks();

  if (isLoading || isLoadingBooks) {
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
          accessorFn: meal => (
            <>
              <ViewColumn paddingRight={8}>
                <ViewRow alignItems="center" gap={4}>
                  <Text>{meal.name}</Text>
                  {!!meal.is_simple && <FontAwesome5 name="umbrella-beach" size={12} color={colors.success} />}
                </ViewRow>
                {!!meal.recipe_url && (
                  <ExternalLink url={meal.recipe_url} size={11}>
                    Link to recipe
                  </ExternalLink>
                )}
                {!!meal.book_id && <BookInfo books={books} bookId={meal.book_id} page={meal.page} />}
              </ViewColumn>
            </>
          ),
        },
      ]}
    />
  );
}
