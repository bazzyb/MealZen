import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Modal, View } from "react-native";

import { Button, CloseButton, Text, TextInput, ViewColumn, ViewRow } from "@/components";
import { useUpdateMeal } from "@/db/mutations/useUpdateMeal";
import { MealRecord, MealZodSchema } from "@/db/schemas/meal";
import { useAppTheme } from "@/styles/useAppTheme";

type ModalBodyProps = {
  selectedMeal: MealRecord;
  setSelectedMeal: (meal: MealRecord | null) => void;
};

function ModalBody({ selectedMeal, setSelectedMeal }: ModalBodyProps) {
  const { colors } = useAppTheme();
  const { control, handleSubmit, formState } = useForm({
    defaultValues: { ...selectedMeal },
    resolver: zodResolver(MealZodSchema),
  });

  const { mutate, isMutating } = useUpdateMeal();

  const handleSave = async (data: MealRecord) => {
    await mutate(data);
    setSelectedMeal(null);
  };

  return (
    <View
      style={{
        backgroundColor: colors.modalBlurBackground,
        position: "absolute",
        bottom: 0,
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "90%",
          maxWidth: 600,
        }}
      >
        <ViewRow
          backgroundColor={colors.gray[5]}
          borderTopLeftRadius={8}
          borderTopRightRadius={8}
          paddingVertical={8}
          paddingHorizontal={16}
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color={colors.white} bold>
            Edit Meal
          </Text>
          <CloseButton width={32} onPress={() => setSelectedMeal(null)} />
        </ViewRow>
        <ViewColumn
          padding={16}
          alignItems="flex-start"
          gap={8}
          backgroundColor={colors.background}
          borderBottomLeftRadius={8}
          borderBottomRightRadius={8}
        >
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

          <Button
            color="green"
            style={{ marginTop: 16, width: "auto" }}
            disabled={isMutating}
            onPress={handleSubmit(handleSave)}
          >
            Save
          </Button>
        </ViewColumn>
      </View>
    </View>
  );
}

type Props = {
  selectedMeal: MealRecord | null;
  setSelectedMeal: (meal: MealRecord | null) => void;
};

export function EditMealModal({ selectedMeal, setSelectedMeal }: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!selectedMeal}
      onDismiss={() => setSelectedMeal(null)}
      onRequestClose={() => setSelectedMeal(null)}
    >
      <ModalBody selectedMeal={selectedMeal!} setSelectedMeal={setSelectedMeal} />
    </Modal>
  );
}
