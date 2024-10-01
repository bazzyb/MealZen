import { useState } from "react";
import { Modal, View } from "react-native";

import { Button, CloseButton, Text, TextInput, ViewColumn, ViewRow } from "@/components";
import { useUpdateMeal } from "@/db/mutations/useUpdateMeal";
import { MealRecord, MealZodSchema } from "@/db/schemas/meal";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

type ModalBodyProps = {
  selectedMeal: MealRecord;
  setSelectedMeal: (meal: MealRecord | null) => void;
};

function ModalBody({ selectedMeal, setSelectedMeal }: ModalBodyProps) {
  const { colors } = useAppTheme();

  const [name, setName] = useState(selectedMeal?.name);
  const [recipeUrl, setRecipeUrl] = useState(selectedMeal?.recipe_url || "");

  const { mutate, isMutating } = useUpdateMeal();

  async function handleSave() {
    const validMeal = MealZodSchema.safeParse({
      ...selectedMeal,
      name,
      recipe_url: recipeUrl || null,
    });

    if (!validMeal.success) {
      Logger.error(validMeal.error);
      return;
    }

    await mutate(validMeal.data);
    setSelectedMeal(null);
  }

  return (
    <View
      style={{
        backgroundColor: "#222A",
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
          <TextInput label="Name" value={name} onChangeText={setName} />
          <TextInput label="Recipe URL" value={recipeUrl} onChangeText={setRecipeUrl} />
          <Button color="green" style={{ marginTop: 16, width: "auto" }} disabled={isMutating} onPress={handleSave}>
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
