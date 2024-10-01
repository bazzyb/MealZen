import { View } from "react-native";

import { CloseButton, Table, Text, ViewColumn, ViewRow } from "@/components";
import { useDeleteBook } from "@/db/mutations/useDeleteBook";
import { useGetBooks } from "@/db/queries/useGetBooks";

export function BooksTable() {
  const { data: books, isLoading } = useGetBooks();
  const { mutate: deleteBook, isMutating: isDeletingBook } = useDeleteBook();

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
      columns={[
        {
          id: "name",
          accessorFn: book => (
            <ViewRow alignItems="center">
              <ViewColumn paddingRight={8}>
                <Text>{book.name}</Text>
              </ViewColumn>
            </ViewRow>
          ),
        },
        {
          id: "delete-row",
          accessorFn: book => <CloseButton onPress={async () => deleteBook(book.id)} disabled={isDeletingBook} />,
          width: 28,
        },
      ]}
    />
  );
}
