import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";

import { Button, DeleteButton, Modal, TextInput, ViewRow } from "@/components";
import { useDeleteBook } from "@/db/mutations/useDeleteBook";
import { useUpdateBook } from "@/db/mutations/useUpdateBook";
import { BookRecord, BookZodSchema } from "@/db/schemas/book";

type ModalBodyProps = {
  selectedBook: BookRecord;
  handleClose: () => void;
};

function ModalBody({ selectedBook, handleClose }: ModalBodyProps) {
  const { control, handleSubmit, formState } = useForm<BookRecord>({
    defaultValues: { ...selectedBook },
    resolver: zodResolver(BookZodSchema),
  });

  const { mutate: updateBook, isMutating: isUpdating } = useUpdateBook();
  const { mutate: deleteBook, isMutating: isDeleting } = useDeleteBook();

  function openDeleteAlert() {
    Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDeleteBook,
      },
    ]);
  }

  async function handleDeleteBook() {
    await deleteBook(selectedBook.id);
    handleClose();
  }

  async function handleSave(data: BookRecord) {
    await updateBook(data);
    handleClose();
  }

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Name"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.name?.message}
          />
        )}
      />

      <Controller
        name="author"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Author"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.author?.message}
          />
        )}
      />

      <ViewRow justifyContent="space-between" alignItems="flex-end" width="100%" marginTop={8}>
        <Button color="success" disabled={isDeleting || isUpdating} onPress={handleSubmit(handleSave)}>
          Save
        </Button>
        <Button color="disabled" onPress={handleClose}>
          Cancel
        </Button>
        <DeleteButton disabled={isDeleting || isUpdating} onPress={openDeleteAlert} style={{ marginLeft: "auto" }} />
      </ViewRow>
    </>
  );
}

type Props = {
  selectedBook: BookRecord | null;
  handleClose: () => void;
};

export function EditBookModal({ selectedBook, handleClose }: Props) {
  return (
    <Modal isVisible={!!selectedBook} handleClose={handleClose} title="Edit Book">
      <ModalBody selectedBook={selectedBook!} handleClose={handleClose} />
    </Modal>
  );
}
