import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert } from "react-native";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/core/Button";
import { DeleteButton } from "@/components/core/DeleteButton";
import { Dropdown } from "@/components/core/Dropdown";
import { TextInput } from "@/components/core/TextInput";
import { useGetMeals } from "@/db/meal";
import { useUpdateMealplanEntry } from "@/db/mealplan";
import { Mealplan, MealplanRecord, MealplanZodSchema } from "@/db/mealplan/schema";
import { useDeleteMealplanEntry } from "@/db/mealplan/useDeleteMealplanEntry";
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
  const { mutate: updateEntry, isMutating: isUpdatingEntry } = useUpdateMealplanEntry();
  const { mutate: deleteEntry, isMutating: isDeletingEntry } = useDeleteMealplanEntry();

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
    await updateEntry(data);
    handleClose();
  }

  async function openDeleteConfirmAlert() {
    Alert.alert("Delete Mealplan Entry", "Are you sure you want to delete this mealplan entry?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteEntry(selectedMealplanEntry.id);
          handleClose();
        },
      },
    ]);
  }

  return (
    <>
      <ViewRow gap={0} width="100%" borderRadius={borderRadius} overflow="hidden">
        <Button
          color={mealSelector === "select" ? "primary" : "disabled"}
          onPress={handleSetSelect}
          style={{ flex: 1, borderRadius: 0 }}
        >
          Select
        </Button>
        <Button
          color={mealSelector === "custom" ? "primary" : "disabled"}
          onPress={handleSetCustom}
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
            variant="outlined"
            style={{ paddingVertical: 4, borderWidth: 1, borderColor: colors.success }}
            fontSize={12}
            leftIcon={<Entypo name="shuffle" size={12} color={colors.success} />}
          >
            Pick Random
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

      <ViewRow marginTop={8} justifyContent="space-between" width="100%" gap={8}>
        <DeleteButton style={{ marginRight: "auto" }} onPress={openDeleteConfirmAlert} />
        <Button
          color="disabled"
          disabled={isUpdatingEntry || isDeletingEntry}
          onPress={handleClose}
          leftIcon={<AntDesign name="close" size={20} color={colors.text} />}
        >
          Cancel
        </Button>
        <Button
          disabled={isUpdatingEntry || isDeletingEntry}
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
