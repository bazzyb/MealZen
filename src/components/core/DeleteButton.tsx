import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ViewStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

export type DeleteButtonProps = {
  id?: string;
  disabled?: boolean;
  style?: ViewStyle;
  onPress: () => void;
};

export function DeleteButton({ id, disabled, style, onPress }: DeleteButtonProps) {
  const { colors, buttonStyles } = useAppTheme();

  return (
    <Pressable
      accessibilityLabel={id || "Delete Button"}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.errorDark : colors.error,
        ...buttonStyles,
        ...style,
      })}
      onPress={e => {
        e.stopPropagation();
        onPress();
      }}
      disabled={disabled}
    >
      <MaterialIcons name="delete-forever" size={24} color={colors.white} />
    </Pressable>
  );
}
