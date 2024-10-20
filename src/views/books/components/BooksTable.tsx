import { View } from "react-native";

import { Table, Text, ViewColumn, ViewRow } from "@/components";
import { useGetBooks } from "@/db/queries/useGetBooks";
import { BookRecord } from "@/db/schemas/book";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  setSelectedBook: (meal: BookRecord | null) => void;
};

export function BooksTable({ setSelectedBook }: Props) {
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
      onRowPress={setSelectedBook}
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
