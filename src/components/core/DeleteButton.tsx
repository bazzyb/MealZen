import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ViewStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

export type CloseButtonProps = {
  id?: string;
  disabled?: boolean;
  style?: ViewStyle;
  onPress: () => void;
};

export function DeleteButton({ id, disabled, style, onPress }: CloseButtonProps) {
  const { colors, borderRadius } = useAppTheme();

  return (
    <Pressable
      accessibilityLabel={id || "Delete Button"}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.errorDark : colors.error,
        borderRadius,
        padding: 8,
        ...style,
      })}
      onPress={e => {
        e.stopPropagation();
        onPress();
      }}
      disabled={disabled}
    >
      <MaterialIcons name="delete-forever" size={20} color={colors.white} style={{ textAlign: "center" }} />
    </Pressable>
  );
}
