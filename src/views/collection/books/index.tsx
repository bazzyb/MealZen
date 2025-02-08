import { AddRowForm } from "@/components/AddRowForm";
import { ViewColumn } from "@/components/Layout/ViewColumn";
import { useCreateBook } from "@/db/book";
import { Logger } from "@/utils/logger";

import { BooksTable } from "./components/BooksTable";

export default function BooksView() {
  const { mutate: createBook, isMutating: isCreatingBook } = useCreateBook();

  return (
    <ViewColumn padding={0} flex={1}>
      <BooksTable />
      <AddRowForm
        addButtonText="Add Books"
        isAdding={isCreatingBook}
        onAdd={createBook}
        onError={err => Logger.error("Failed to create book", err)}
      />
    </ViewColumn>
  );
}
