import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Dropdown, Modal, Switch, TextInput, ViewRow } from "@/components";
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

      <ViewRow justifyContent="space-between" width="100%" marginTop={8}>
        <Controller
          name="is_simple"
          control={control}
          render={({ field }) => (
            <Switch
              label="Simple"
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={field.value ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={val => field.onChange(val ? 1 : 0)}
              value={!!field.value}
              alignLabel="center"
            />
          )}
        />
        <Controller
          name="is_overnight"
          control={control}
          render={({ field }) => (
            <Switch
              label="Overnight"
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={field.value ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={val => field.onChange(val ? 1 : 0)}
              value={!!field.value}
              alignLabel="center"
            />
          )}
        />
        <Controller
          name="is_long_cook"
          control={control}
          render={({ field }) => (
            <Switch
              label="Long Cook"
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={field.value ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={val => field.onChange(val ? 1 : 0)}
              value={!!field.value}
              alignLabel="center"
            />
          )}
        />
        <Controller
          name="is_long_prep"
          control={control}
          render={({ field }) => (
            <Switch
              label="Long Prep"
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={field.value ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={val => field.onChange(val ? 1 : 0)}
              value={!!field.value}
              alignLabel="center"
            />
          )}
        />
      </ViewRow>

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
