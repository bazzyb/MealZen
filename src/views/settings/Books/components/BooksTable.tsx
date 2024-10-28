import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { useGetBooks } from "@/db/book";
import { useAppTheme } from "@/styles/useAppTheme";

export function BooksTable() {
  const { colors } = useAppTheme();

  const [searchBooks, setSearchBooks] = useState("");
  const { data: books, isLoading } = useGetBooks(searchBooks);

  if (isLoading) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Table
      hideHeader
      onSearchChange={setSearchBooks}
      data={books}
      onRowPress={row => router.navigate({ pathname: "/(settings)/books/[id]", params: { id: row.id } })}
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
