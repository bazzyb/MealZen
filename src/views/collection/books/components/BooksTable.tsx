import { router } from "expo-router";
import { useState } from "react";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Table } from "@/components/Table";
import { Text } from "@/components/core/Text";
import { useDeleteBooks, useGetBooks } from "@/db/book";
import { useAppTheme } from "@/styles/useAppTheme";

export function BooksTable() {
  const { colors } = useAppTheme();

  const [searchBooks, setSearchBooks] = useState("");
  const { data: books, isLoading } = useGetBooks(searchBooks);
  const { mutate: deleteBooks } = useDeleteBooks();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Table
      onSearchChange={setSearchBooks}
      onDeleteMany={deleteBooks}
      data={books}
      onRowPress={row => router.navigate({ pathname: "/(collection)/books/[id]", params: { id: row.id } })}
      deleteWarning={`⚠️ WARNING ⚠️\n\nAll meals assosciated with these books will also be deleted.\n\nAre you sure you want to delete these books?`}
      columns={[
        {
          id: "name",
          accessorFn: book => (
            <ViewRow alignItems="center">
              <ViewColumn paddingRight={8}>
                <Text>{book.name}</Text>
                {book.author && (
                  <Text color={colors.textSecondary} size={11}>
                    {book.author}
                  </Text>
                )}
              </ViewColumn>
            </ViewRow>
          ),
        },
      ]}
    />
  );
}
