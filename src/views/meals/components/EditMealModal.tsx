import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";

import { Button, DeleteButton, Dropdown, Modal, Switch, TextInput, ViewRow } from "@/components";
import { useDeleteMeal } from "@/db/mutations/useDeleteMeal";
import { useUpdateMeal } from "@/db/mutations/useUpdateMeal";
import { useGetBooks } from "@/db/queries/useGetBooks";
import { MealRecord, MealZodSchema } from "@/db/schemas/meal";

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
  const { mutate: deleteMeal, isMutating: isDeleting } = useDeleteMeal();

  function openDeleteAlert() {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDeleteMeal,
      },
    ]);
  }

  async function handleDeleteMeal() {
    await deleteMeal(selectedMeal.id);
    handleClose();
  }

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
            onChangeText={val => field.onChange(parseInt(val))}
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
  selectedMeal: MealRecord | null;
  handleClose: () => void;
};

export function EditMealModal({ selectedMeal, handleClose }: Props) {
  return (
    <Modal isVisible={!!selectedMeal} handleClose={handleClose} title="Edit Meal">
      <ModalBody selectedMeal={selectedMeal!} handleClose={handleClose} />
    </Modal>
  );
}
