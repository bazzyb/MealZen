import { TextInputProps } from "../core/TextInput";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

import { Button, TextInput, ViewColumn, ViewRow } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

import { FormSection } from "./FormSection";

type Props = {
  onAdd: (val: string, secondaryVal: string) => Promise<void>;
  onError: (err: Error) => void;
  addButtonText: string;
  isAdding: boolean;
  secondaryProps?: TextInputProps;
};

export function AddRowForm(props: Props) {
  const { onAdd, onError, addButtonText, isAdding, secondaryProps } = props;
  const [showAddRowForm, setShowAddRowForm] = useState(false);
  const [value, setValue] = useState("");
  const [secondaryValue, setSecondaryValue] = useState("");

  const { colors } = useAppTheme();

  function handleClose() {
    setShowAddRowForm(false);
    setValue("");
    setSecondaryValue("");
  }

  async function handleSubmit() {
    if (!value) {
      return;
    }
    try {
      await onAdd(value, secondaryValue);
      handleClose();
    } catch (err) {
      onError?.(err as Error);
    }
  }

  if (!showAddRowForm) {
    return (
      <FormSection>
        <Button
          onPress={() => setShowAddRowForm(true)}
          textStyle={{ textAlign: "center" }}
          style={{ width: "100%", alignItems: "center", gap: 8 }}
        >
          <AntDesign name="pluscircle" size={16} color={colors.text} /> {addButtonText}
        </Button>
      </FormSection>
    );
  }

  return (
    <ViewColumn height="100%" width="100%" backgroundColor="#2228" position="absolute" justifyContent="flex-end">
      <FormSection>
        <ViewRow gap={8}>
          <ViewRow flex={1} minWidth="50%">
            <TextInput placeholder="Name" value={value} onChangeText={setValue} />
          </ViewRow>
          {secondaryProps && (
            <ViewRow flexBasis="20%">
              <TextInput {...secondaryProps} value={secondaryValue} onChangeText={setSecondaryValue} />
            </ViewRow>
          )}
        </ViewRow>
        <ViewRow gap={8} justifyContent="flex-end">
          <Button onPress={handleClose} color="error">
            <AntDesign name="close" size={16} color={colors.text} /> Cancel
          </Button>
          <Button onPress={handleSubmit} disabled={!value || isAdding}>
            <AntDesign name="pluscircle" size={16} color={colors.text} /> Add
          </Button>
        </ViewRow>
      </FormSection>
    </ViewColumn>
  );
}
