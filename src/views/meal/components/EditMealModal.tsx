import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Dropdown, Modal, Switch, TextInput, ViewRow } from "@/components";
import { useGetBooks } from "@/db/book";
import { useUpdateMeal } from "@/db/meal";
import { MealRecord, MealZodSchema } from "@/db/meal/schema";

type ModalBodyProps = {
  selectedMeal: MealRecord;
  handleClose: () => void;
};

function ModalBody({ selectedMeal, handleClose }: ModalBodyProps) {
  const { control, handleSubmit, formState } = useForm<MealRecord>({
    defaultValues: { ...selectedMeal },
    resolver: zodResolver(MealZodSchema),
  });

  const { data: books, isLoading: isLoadingBooks } = useGetBooks();
  const { mutate: updateMeal, isMutating: isUpdating } = useUpdateMeal();

  async function handleSave(data: MealRecord) {
    await updateMeal(data);
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
            placeholder="Enter meal name"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.name?.message}
          />
        )}
      />

      <Controller
        name="recipe_url"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Recipe URL"
            placeholder="Enter URL for recipe"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.recipe_url?.message}
          />
        )}
      />

      <Controller
        name="book_id"
        control={control}
        render={({ field }) => (
          <Dropdown
            label="Book"
            onChange={field.onChange}
            clearable
            placeholder="Select a book"
            labelField={"name"}
            valueField={"id"}
            data={books}
            search={!isLoadingBooks}
            value={field.value}
            error={formState.errors.book_id?.message}
          />
        )}
      />

      <Controller
        name="page"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Page Number"
            placeholder="Enter page for recipe"
            onChangeText={val => field.onChange(val ? parseInt(val) : null)}
            keyboardType="numeric"
            value={field.value?.toString()}
            error={formState.errors.page?.message}
          />
        )}
      />

      <ViewRow justifyContent="space-between" width="100%" marginTop={8}>
        <Controller
          name="is_simple"
          control={control}
          render={({ field }) => (
            <Switch label="Simple" onValueChange={val => field.onChange(val ? 1 : 0)} value={!!field.value} />
          )}
        />
        <Controller
          name="is_overnight"
          control={control}
          render={({ field }) => (
            <Switch label="Overnight" onValueChange={val => field.onChange(val ? 1 : 0)} value={!!field.value} />
          )}
        />
        <Controller
          name="is_long_cook"
          control={control}
          render={({ field }) => (
            <Switch label="Long Cook" onValueChange={val => field.onChange(val ? 1 : 0)} value={!!field.value} />
          )}
        />
        <Controller
          name="is_long_prep"
          control={control}
          render={({ field }) => (
            <Switch label="Long Prep" onValueChange={val => field.onChange(val ? 1 : 0)} value={!!field.value} />
          )}
        />
      </ViewRow>

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
  selectedMeal: MealRecord | null;
  handleClose: () => void;
};

export function EditMealModal({ show, selectedMeal, handleClose }: Props) {
  return (
    <Modal isVisible={show} handleClose={handleClose} title="Edit Meal">
      <ModalBody selectedMeal={selectedMeal!} handleClose={handleClose} />
    </Modal>
  );
}
