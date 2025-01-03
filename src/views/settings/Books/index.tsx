import { useState } from "react";
import { StyleSheet } from "react-native";

import { Button, TextInput, ViewColumn, ViewRow } from "@/components";
import { useCreateBook } from "@/db/book";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

import { BooksTable } from "./components/BooksTable";

export default function BooksView() {
  const [bookName, setBookName] = useState("");

  const { colors } = useAppTheme();

  const { mutate: createBook, isMutating: isCreatingBook } = useCreateBook();

  async function handleCreateBook() {
    if (!bookName) {
      return;
    }
    try {
      await createBook(bookName);
      setBookName("");
    } catch (err) {
      Logger.error("Failed to create book", err);
    }
  }

  return (
    <ViewColumn padding={0} flex={1}>
      <ViewRow
        justifyContent="center"
        gap={8}
        padding={16}
        borderBottomWidth={StyleSheet.hairlineWidth}
        borderBottomColor={colors.gray[5]}
      >
        <TextInput placeholder="Book name" value={bookName} onChangeText={setBookName} style={{ flex: 1 }} />
        <Button onPress={handleCreateBook} disabled={!bookName || isCreatingBook} color="success">
          Create Book
        </Button>
      </ViewRow>
      <BooksTable />
    </ViewColumn>
  );
}
