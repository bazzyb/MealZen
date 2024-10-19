import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Modal, TextInput } from "@/components";
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

  const { mutate, isMutating } = useUpdateBook();

  const handleSave = async (data: BookRecord) => {
    await mutate(data);
    handleClose();
  };

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

      <Button
        color="success"
        style={{ marginTop: 16, width: "auto" }}
        disabled={isMutating}
        onPress={handleSubmit(handleSave)}
      >
        Save
      </Button>
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
