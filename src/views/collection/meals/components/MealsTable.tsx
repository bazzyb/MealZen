import { router } from "expo-router";
import { useState } from "react";

import { LongCookIcon, LongPrepIcon, OvernightIcon, SimpleMealIcon } from "@/components/Icons";
import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Table } from "@/components/Table";
import { ExternalLink } from "@/components/core/ExternalLink";
import { LinkButton } from "@/components/core/LinkButton";
import { Text } from "@/components/core/Text";
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
      onSearchChange={setSearchMeals}
      onDeleteMany={deleteMeals}
      data={meals}
      noItemsButton={
        <LinkButton href="/(collection)/examplemeals" style={{ marginTop: 16 }}>
          Looking for inspiration?
        </LinkButton>
      }
      onRowPress={row =>
        router.navigate({
          pathname: "/(collection)/meals/[id]",
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
