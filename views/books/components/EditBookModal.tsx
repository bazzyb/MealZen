import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Modal, TextInput } from "@/components";
import { useUpdateBook } from "@/db/mutations/useUpdateBook";
import { BookRecord, BookZodSchema } from "@/db/schemas/book";

type ModalBodyProps = {
  selectedBook: BookRecord;
  setSelectedBook: (book: BookRecord | null) => void;
};

function ModalBody({ selectedBook, setSelectedBook }: ModalBodyProps) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: { ...selectedBook },
    resolver: zodResolver(BookZodSchema),
  });

  const { mutate, isMutating } = useUpdateBook();

  const handleSave = async (data: BookRecord) => {
    await mutate(data);
    setSelectedBook(null);
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
        color="green"
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
  setSelectedBook: (book: BookRecord | null) => void;
};

export function EditBookModal({ selectedBook, setSelectedBook }: Props) {
  return (
    <Modal isVisible={!!selectedBook} handleClose={() => setSelectedBook(null)} title="Edit Book">
      <ModalBody selectedBook={selectedBook!} setSelectedBook={setSelectedBook} />
    </Modal>
  );
}
