import { AntDesign, Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { ViewRow } from "@/components/Layout/ViewRow";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/core/Button";
import { TextInput } from "@/components/core/TextInput";
import { useUpdateBook } from "@/db/book";
import { BookRecord, BookZodSchema } from "@/db/book/schema";
import { useAppTheme } from "@/styles/useAppTheme";

type ModalBodyProps = {
  selectedBook: BookRecord;
  handleClose: () => void;
};

function ModalBody({ selectedBook, handleClose }: ModalBodyProps) {
  const { colors } = useAppTheme();

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
        <Button
          color="disabled"
          onPress={handleClose}
          leftIcon={<AntDesign name="close" size={20} color={colors.text} />}
        >
          Cancel
        </Button>
        <Button
          disabled={isUpdating}
          onPress={handleSubmit(handleSave)}
          leftIcon={<Feather name="save" size={20} color={colors.text} />}
        >
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
