import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { ViewColumn } from "@/components";
import { AddRowForm } from "@/components/AddRowForm";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { useGetBook } from "@/db/book";
import { useCreateMeal } from "@/db/meal";
import { Logger } from "@/utils/logger";
import { EditBookModal } from "@/views/collection/book/components/EditBookModal";
import { MealsTable } from "@/views/collection/meals/components/MealsTable";

import { BookDetails } from "./components/BookDetails";

export function BookView() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const { data: book } = useGetBook(id);

  const { mutate: createMeal, isMutating: isCreatingMeal } = useCreateMeal();

  async function handleCreateMeal(mealName: string, page: string) {
    try {
      await createMeal({ name: mealName, bookId: id, page: page ? parseInt(page) : undefined });
    } catch (err) {
      Logger.error("Failed to create meal", err);
    }
  }

  if (!book[0]) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ViewColumn width="100%" height="100%">
        <BookDetails book={book[0]} setShowEditBookModal={setShowEditBookModal} />
        <MealsTable bookId={id} />
        <AddRowForm
          addButtonText="Add Meals"
          isAdding={isCreatingMeal}
          onAdd={handleCreateMeal}
          onError={err => Logger.error("Failed to create meal", err)}
          secondaryProps={{
            placeholder: "Page",
            keyboardType: "numeric",
          }}
        />
      </ViewColumn>
      <EditBookModal show={showEditBookModal} selectedBook={book[0]} handleClose={() => setShowEditBookModal(false)} />
    </>
  );
}
