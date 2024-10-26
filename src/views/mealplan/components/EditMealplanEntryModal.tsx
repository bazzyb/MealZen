import Entypo from "@expo/vector-icons/Entypo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button, Dropdown, Modal, TextInput, ViewColumn, ViewRow } from "@/components";
import { useUpdateMealplanEntry } from "@/db/mutations/useUpdateMealplanEntry";
import { useGetMeals } from "@/db/queries/useGetMeals";
import { Mealplan, MealplanRecord, MealplanZodSchema } from "@/db/schemas/mealplan";
import { useAppTheme } from "@/styles/useAppTheme";

type ModalBodyProps = {
  selectedMealplanEntry: Mealplan;
  handleClose: () => void;
};

function ModalBody({ selectedMealplanEntry, handleClose }: ModalBodyProps) {
  const { control, handleSubmit, formState, setValue, clearErrors } = useForm<MealplanRecord>({
    defaultValues: { ...selectedMealplanEntry },
    resolver: zodResolver(MealplanZodSchema),
  });

  const { borderRadius, colors } = useAppTheme();

  const [mealSelector, setMealSelector] = useState<"select" | "custom">(() => {
    return selectedMealplanEntry.meal_id ? "select" : "custom";
  });

  const { data: meals, isLoading: isLoadingMeals } = useGetMeals();
  const { mutate, isMutating } = useUpdateMealplanEntry();

  function handleSetSelect() {
    clearErrors();
    setValue("name", null);
    setValue("meal_id", selectedMealplanEntry.meal_id);
    setMealSelector("select");
  }

  function handleSetCustom() {
    clearErrors();
    setValue("meal_id", null);
    setValue("name", selectedMealplanEntry.name);
    setMealSelector("custom");
  }

  function pickRandomMeal() {
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];
    setValue("meal_id", randomMeal.id);
  }

  async function handleSave(data: MealplanRecord) {
    await mutate(data);
    handleClose();
  }

  return (
    <>
      <ViewRow gap={0} width="100%" borderRadius={borderRadius} overflow="hidden">
        <Button
          color={mealSelector === "select" ? "primary" : "disabled"}
          onPress={handleSetSelect}
          textStyle={{ textAlign: "center" }}
          style={{ flex: 1, borderRadius: 0 }}
        >
          Select
        </Button>
        <Button
          color={mealSelector === "custom" ? "primary" : "disabled"}
          onPress={handleSetCustom}
          textStyle={{ textAlign: "center" }}
          style={{ flex: 1, borderRadius: 0 }}
        >
          Custom
        </Button>
      </ViewRow>

      {mealSelector === "select" && (
        <ViewColumn width="100%" gap={4}>
          <Controller
            name="meal_id"
            control={control}
            render={({ field }) => (
              <Dropdown
                label="Select Meal"
                onChange={field.onChange}
                placeholder="Select a meal"
                labelField={"name"}
                valueField={"id"}
                data={meals.map(meal => ({ id: meal.id, name: meal.name }))}
                search={!isLoadingMeals}
                value={field.value}
                error={formState.errors.meal_id?.message}
              />
            )}
          />
          <Button
            onPress={pickRandomMeal}
            color="success"
            variant="outlined"
            style={{ paddingVertical: 4, borderWidth: 1, borderColor: colors.success }}
            textStyle={{ fontSize: 10, textAlign: "center" }}
          >
            <Entypo name="shuffle" size={10} color={colors.success} /> Pick Random
          </Button>
        </ViewColumn>
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
            multiline
            style={{ minHeight: 80 }}
          />
        )}
      />

      <ViewRow marginTop={8} justifyContent="space-between" width="100%">
        <Button color="success" disabled={isMutating} onPress={handleSubmit(handleSave)}>
          Save
        </Button>
        <Button color="disabled" disabled={isMutating} onPress={handleClose}>
          Cancel
        </Button>
      </ViewRow>
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
