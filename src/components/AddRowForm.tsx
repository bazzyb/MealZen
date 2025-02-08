import { AntDesign } from "@expo/vector-icons";
import { ReactNode, useState } from "react";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { SectionOverlay } from "@/components/SectionOverlay";
import { Button } from "@/components/core/Button";
import { TextInput, TextInputProps } from "@/components/core/TextInput";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  onAdd: (val: string, secondaryVal: string) => Promise<void>;
  onError: (err: Error) => void;
  addButtonText: string;
  isAdding: boolean;
  secondaryProps?: TextInputProps;
  leftButton?: ReactNode;
};

export function AddRowForm(props: Props) {
  const { onAdd, onError, addButtonText, isAdding, secondaryProps, leftButton } = props;
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
      <SectionOverlay position="bottom">
        <Button
          onPress={() => setShowAddRowForm(true)}
          style={{ width: "100%", alignItems: "center", gap: 8 }}
          leftIcon={<AntDesign name="pluscircle" size={20} color={colors.text} />}
        >
          {addButtonText}
        </Button>
      </SectionOverlay>
    );
  }

  return (
    <ViewColumn height="100%" width="100%" backgroundColor="#2228" position="absolute" justifyContent="flex-end">
      <SectionOverlay position="bottom">
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
          {leftButton}
          <Button
            onPress={handleClose}
            color="error"
            leftIcon={<AntDesign name="close" size={20} color={colors.text} />}
          >
            Cancel
          </Button>
          <Button
            onPress={handleSubmit}
            disabled={!value || isAdding}
            leftIcon={<AntDesign name="pluscircle" size={20} color={colors.text} />}
          >
            Add
          </Button>
        </ViewRow>
      </SectionOverlay>
    </ViewColumn>
  );
}
