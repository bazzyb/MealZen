import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Dropdown, Modal, TextInput } from "@/components";
import { useUpdateMeal } from "@/db/mutations/useUpdateMeal";
import { useGetBooks } from "@/db/queries/useGetBooks";
import { MealRecord, MealZodSchema } from "@/db/schemas/meal";

type ModalBodyProps = {
  selectedMeal: MealRecord;
  setSelectedMeal: (meal: MealRecord | null) => void;
};

function ModalBody({ selectedMeal, setSelectedMeal }: ModalBodyProps) {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: { ...selectedMeal },
    resolver: zodResolver(MealZodSchema),
  });

  const { data: books, isLoading: isLoadingBooks } = useGetBooks();
  const { mutate, isMutating } = useUpdateMeal();

  const handleSave = async (data: MealRecord) => {
    await mutate(data);
    setSelectedMeal(null);
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
            onChange={item => {
              field.onChange(item.id);
            }}
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
  selectedMeal: MealRecord | null;
  setSelectedMeal: (meal: MealRecord | null) => void;
};

export function EditMealModal({ selectedMeal, setSelectedMeal }: Props) {
  return (
    <Modal isVisible={!!selectedMeal} handleClose={() => setSelectedMeal(null)} title="Edit Meal">
      <ModalBody selectedMeal={selectedMeal!} setSelectedMeal={setSelectedMeal} />
    </Modal>
  );
}
