import { useState } from "react";

import { Button, TextInput, ViewColumn, ViewRow } from "@/components";
import { useCreateBook } from "@/db/mutations/useCreateBook";
import { Logger } from "@/utils/logger";

import { BooksTable } from "./components/BooksTable";

export default function BooksView() {
  const [bookName, setBookName] = useState("");

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
    <ViewColumn gap={16} padding={0} flex={1}>
      <ViewRow justifyContent="center" gap={8} paddingHorizontal={16} paddingTop={16}>
        <TextInput placeholder="Book name" value={bookName} onChangeText={setBookName} style={{ flex: 1 }} />
        <Button onPress={handleCreateBook} disabled={isCreatingBook} color="success">
          Create Book
        </Button>
      </ViewRow>
      <BooksTable />
    </ViewColumn>
  );
}
