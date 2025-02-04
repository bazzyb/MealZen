import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Modal, TextInput, ViewRow } from "@/components";
import { useUpdateBook } from "@/db/book";
import { BookRecord, BookZodSchema } from "@/db/book/schema";

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
            placeholder="Enter book name"
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
            placeholder="Enter book author"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.author?.message}
          />
        )}
      />

      <ViewRow justifyContent="space-between" alignItems="flex-end" width="100%" marginTop={8}>
        <Button color="disabled" onPress={handleClose}>
          Cancel
        </Button>
        <Button disabled={isUpdating} onPress={handleSubmit(handleSave)}>
          Save
        </Button>
      </ViewRow>
    </>
  );
}

type Props = {
  show: boolean;
  selectedBook: BookRecord | null;
  handleClose: () => void;
};

export function EditBookModal({ show, selectedBook, handleClose }: Props) {
  return (
    <Modal isVisible={show} handleClose={handleClose} title="Edit Book">
      <ModalBody selectedBook={selectedBook!} handleClose={handleClose} />
    </Modal>
  );
}
