import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, StyleSheet } from "react-native";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { Button } from "@/components/core/Button";
import { Heading } from "@/components/core/Heading";
import { Text } from "@/components/core/Text";
import { useDeleteBooks } from "@/db/book";
import { BookRecord } from "@/db/book/schema";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  book: BookRecord;
  setShowEditBookModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function BookDetails({ book, setShowEditBookModal }: Props) {
  const { colors } = useAppTheme();

  const { mutate: deleteBook, isMutating: isDeleting } = useDeleteBooks();

  async function handleDeleteBook() {
    await deleteBook([book.id]);
    router.navigate("/(collection)/books");
  }

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

  return (
    <ViewRow
      padding={16}
      borderBottomColor={colors.gray[5]}
      borderBottomWidth={StyleSheet.hairlineWidth}
      gap={16}
      height="auto"
    >
      <ViewColumn flex={1}>
        <Heading size={18}>{book.name}</Heading>
        <Text style={{ color: colors.textSecondary }}>{book.author}</Text>
      </ViewColumn>
      <ViewColumn gap={8}>
        <Button
          onPress={() => setShowEditBookModal(true)}
          leftIcon={<Feather name="edit" size={18} color={colors.text} />}
        >
          Edit
        </Button>
        <Button
          color="error"
          onPress={openDeleteAlert}
          disabled={isDeleting}
          leftIcon={<MaterialIcons name="delete-forever" size={22} color={colors.white} />}
        >
          Delete
        </Button>
      </ViewColumn>
    </ViewRow>
  );
}
