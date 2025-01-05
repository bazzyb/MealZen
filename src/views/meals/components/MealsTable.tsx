import { router } from "expo-router";
import { useState } from "react";

import { ExternalLink, Table, Text, ViewColumn, ViewRow } from "@/components";
import { LongCookIcon, LongPrepIcon, OvernightIcon, SimpleMealIcon } from "@/components/Icons";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useGetBooks } from "@/db/book";
import { useDeleteMeals, useGetMeals } from "@/db/meal";

import { BookInfo } from "./BookInfo";

type Props = {
  bookId?: string;
};

export function MealsTable({ bookId }: Props) {
  const [searchMeals, setSearchMeals] = useState("");

  const { data: meals, isLoading } = useGetMeals({ bookId, find: searchMeals });
  const { data: books, isLoading: isLoadingBooks } = useGetBooks();
  const { mutate: deleteMeals } = useDeleteMeals();

  if (isLoading || isLoadingBooks) {
    return <LoadingOverlay />;
  }

  return (
    <Table
      hideHeader
      onSearchChange={setSearchMeals}
      onDeleteMany={deleteMeals}
      data={meals}
      onRowPress={row =>
        router.navigate({
          pathname: "/meals/[id]",
          params: { id: row.id },
        })
      }
      columns={[
        {
          id: "name",
          accessorFn: meal => (
            <ViewRow alignItems="center" gap={8}>
              <ViewColumn paddingRight={8}>
                <ViewRow alignItems="center" gap={4}>
                  <Text>{meal.name}</Text>
                </ViewRow>
                {!!meal.recipe_url && (
                  <ExternalLink url={meal.recipe_url} size={11}>
                    Go to recipe
                  </ExternalLink>
                )}
                {!!meal.book_id && <BookInfo books={books} bookId={meal.book_id} page={meal.page} />}
              </ViewColumn>
              <ViewRow marginLeft="auto" gap={4} alignItems="center">
                {!!meal.is_simple && <SimpleMealIcon />}
                {!!meal.is_overnight && <OvernightIcon />}
                {!!meal.is_long_cook && <LongCookIcon />}
                {!!meal.is_long_prep && <LongPrepIcon />}
              </ViewRow>
            </ViewRow>
          ),
        },
      ]}
    />
  );
}
