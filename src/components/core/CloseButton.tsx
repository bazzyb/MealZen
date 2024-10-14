import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

export type CloseButtonProps = {
  id?: string;
  disabled?: boolean;
  onPress: () => void;
  width?: number;
};

export function CloseButton({ id, disabled, onPress, width }: CloseButtonProps) {
  const { colors, borderRadius } = useAppTheme();

  return (
    <Pressable
      accessibilityLabel={id || "Close Button"}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.errorDark : colors.error,
        borderRadius,
        width: width || "100%",
        paddingVertical: 2,
      })}
      onPress={e => {
        e.stopPropagation();
        onPress();
      }}
      disabled={disabled}
    >
      <Entypo name="cross" size={24} color={colors.white} style={{ textAlign: "center" }} />
    </Pressable>
  );
}
