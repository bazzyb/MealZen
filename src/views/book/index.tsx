import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";

import { Button, Text, ViewColumn, ViewRow } from "@/components";
import { useDeleteBooks } from "@/db/book";
import { useGetBook } from "@/db/book";
import { useAppTheme } from "@/styles/useAppTheme";
import { EditBookModal } from "@/views/book/components/EditBookModal";
import { AddMealForm } from "@/views/meals/components/AddMealForm";
import { MealsTable } from "@/views/meals/components/MealsTable";

import { BookDetails } from "./components/BookDetails";

export function BookView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useAppTheme();

  const [showEditBookModal, setShowEditBookModal] = useState(false);
  const { data: book } = useGetBook(id);
  const { mutate: deleteBook, isMutating: isDeleting } = useDeleteBooks();

  function openDeleteAlert() {
    Alert.alert(
      "Delete Book",
      "⚠️ WARNING ⚠️\n\nAll meals assosciated with this book will also be deleted.\n\nAre you sure you want to delete this book?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: handleDeleteBook,
        },
      ],
    );
  }

  async function handleDeleteBook() {
    await deleteBook([id]);
    router.navigate("/(settings)/books");
  }

  if (!book[0]) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ViewColumn width="100%" height="100%">
        <ViewRow
          padding={16}
          borderBottomColor={colors.gray[5]}
          borderBottomWidth={StyleSheet.hairlineWidth}
          gap={16}
          height="auto"
        >
          <BookDetails book={book[0]} />
          <ViewColumn gap={8}>
            <Button
              color="success"
              style={{ paddingVertical: 6 }}
              textStyle={{ textAlign: "center" }}
              onPress={() => setShowEditBookModal(true)}
            >
              Edit
            </Button>
            <Button
              color="error"
              style={{ paddingVertical: 6 }}
              textStyle={{ textAlign: "center" }}
              onPress={openDeleteAlert}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </ViewColumn>
        </ViewRow>
        <AddMealForm bookId={id} />
        <MealsTable bookId={id} />
      </ViewColumn>
      <EditBookModal show={showEditBookModal} selectedBook={book[0]} handleClose={() => setShowEditBookModal(false)} />
    </>
  );
}
