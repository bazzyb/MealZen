import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button, Dropdown, Modal, TextInput } from "@/components";
import { useUpdateMealplanEntry } from "@/db/mutations/useUpdateMealplanEntry";
import { Mealplan } from "@/db/queries/useGetMealplan";
import { useGetMeals } from "@/db/queries/useGetMeals";
import { MealplanRecord, MealplanZodSchema } from "@/db/schemas/mealplan";

type ModalBodyProps = {
  selectedMealplanEntry: Mealplan;
  handleClose: () => void;
};

function ModalBody({ selectedMealplanEntry, handleClose }: ModalBodyProps) {
  const { control, handleSubmit, formState } = useForm<MealplanRecord>({
    defaultValues: { ...selectedMealplanEntry },
    resolver: zodResolver(MealplanZodSchema),
  });

  const { data: meals, isLoading: isLoadingMeals } = useGetMeals();
  const { mutate, isMutating } = useUpdateMealplanEntry();

  async function handleSave(data: MealplanRecord) {
    await mutate(data);
    handleClose();
  }

  return (
    <>
      <Controller
        name="meal_id"
        control={control}
        render={({ field }) => (
          <Dropdown
            label="Select Meal"
            onChange={item => {
              field.onChange(item.id);
            }}
            labelField={"name"}
            valueField={"id"}
            data={meals.map(meal => ({ id: meal.id, name: meal.name }))}
            search={!isLoadingMeals}
            value={field.value}
            error={formState.errors.meal_id?.message}
          />
        )}
      />

      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Notes"
            onChangeText={field.onChange}
            value={field.value}
            error={formState.errors.notes?.message}
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
  selectedMealplanEntry: Mealplan | null;
  handleClose: () => void;
};

export function EditMealplanEntryModal({ selectedMealplanEntry, handleClose }: Props) {
  return (
    <Modal isVisible={!!selectedMealplanEntry} handleClose={handleClose} title="Update Mealplan Entry">
      <ModalBody selectedMealplanEntry={selectedMealplanEntry!} handleClose={handleClose} />
    </Modal>
  );
}
