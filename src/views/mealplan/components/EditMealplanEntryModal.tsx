import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button, Dropdown, Modal, TextInput, ViewRow } from "@/components";
import { useUpdateMealplanEntry } from "@/db/mutations/useUpdateMealplanEntry";
import { Mealplan } from "@/db/queries/useGetMealplan";
import { useGetMeals } from "@/db/queries/useGetMeals";
import { MealplanRecord, MealplanZodSchema } from "@/db/schemas/mealplan";
import { useAppTheme } from "@/styles/useAppTheme";

type ModalBodyProps = {
  selectedMealplanEntry: Mealplan;
  handleClose: () => void;
};

function ModalBody({ selectedMealplanEntry, handleClose }: ModalBodyProps) {
  const { control, handleSubmit, formState, setValue } = useForm<MealplanRecord>({
    defaultValues: { ...selectedMealplanEntry },
    resolver: zodResolver(MealplanZodSchema),
  });

  const { borderRadius } = useAppTheme();

  const [mealSelector, setMealSelector] = useState<"select" | "custom">(() => {
    return selectedMealplanEntry.meal_id ? "select" : "custom";
  });

  const { data: meals, isLoading: isLoadingMeals } = useGetMeals();
  const { mutate, isMutating } = useUpdateMealplanEntry();

  function handleSetSelect() {
    setValue("name", null);
    setValue("meal_id", selectedMealplanEntry.meal_id);
    setMealSelector("select");
  }

  function handleSetCustom() {
    setValue("meal_id", null);
    setValue("name", selectedMealplanEntry.name);
    setMealSelector("custom");
  }

  async function handleSave(data: MealplanRecord) {
    await mutate(data);
    handleClose();
  }

  return (
    <>
      <ViewRow gap={0} width="100%" borderRadius={borderRadius} overflow="hidden">
        <Button
          color={mealSelector === "select" ? "purple" : "gray"}
          onPress={handleSetSelect}
          textStyle={{ textAlign: "center" }}
          style={{ flex: 1, borderRadius: 0 }}
        >
          Select
        </Button>
        <Button
          color={mealSelector === "custom" ? "purple" : "gray"}
          onPress={handleSetCustom}
          textStyle={{ textAlign: "center" }}
          style={{ flex: 1, borderRadius: 0 }}
        >
          Custom
        </Button>
      </ViewRow>

      {mealSelector === "select" && (
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
      )}

      {mealSelector === "custom" && (
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Custom Meal"
              onChangeText={field.onChange}
              value={field.value}
              error={formState.errors.name?.message}
            />
          )}
        />
      )}

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
