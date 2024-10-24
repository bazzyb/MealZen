import { router } from "expo-router";
import { View } from "react-native";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { useGetBooks } from "@/db/queries/useGetBooks";
import { useAppTheme } from "@/styles/useAppTheme";

export function BooksTable() {
  const { colors } = useAppTheme();

  const { data: books, isLoading } = useGetBooks();

  if (isLoading) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!books.length) {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <Text>No books found</Text>
      </View>
    );
  }

  return (
    <Table
      hideHeader
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
