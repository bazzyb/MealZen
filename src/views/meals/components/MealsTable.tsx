import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View } from "react-native";

import { DeleteButton, ExternalLink, Table, Text, ViewColumn } from "@/components";
import { useDeleteMeal } from "@/db/mutations/useDeleteMeal";
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
  const { mutate: deleteMeal, isMutating: isDeletingMeal } = useDeleteMeal();
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
                <Text>{meal.name}</Text>
                {!!meal.recipe_url && (
                  <ExternalLink url={meal.recipe_url} size={11}>
                    Link to recipe
                  </ExternalLink>
                )}
                {!!meal.book_id && <BookInfo books={books} bookId={meal.book_id} page={meal.page} />}
              </ViewColumn>
              {!!meal.is_simple && <FontAwesome5 name="umbrella-beach" size={12} color={colors.success} />}
            </>
          ),
        },
        {
          id: "delete-row",
          accessorFn: meal => (
            <DeleteButton deleteId={meal.name} onPress={async () => deleteMeal(meal.id)} disabled={isDeletingMeal} />
          ),
          width: 28,
        },
      ]}
    />
  );
}
