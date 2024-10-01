import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  disabled?: boolean;
  onPress: () => void;
  width?: number;
};

export function CloseButton({ disabled, onPress, width }: Props) {
  const { colors, borderRadius } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.errorDark : colors.error,
        borderRadius,
        width: width || "100%",
        paddingVertical: 2,
      })}
      onPress={onPress}
      disabled={disabled}
    >
      <Entypo name="cross" size={24} color={colors.white} style={{ textAlign: "center" }} />
    </Pressable>
  );
}
