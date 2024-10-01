import { PropsWithChildren } from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";

import { Colors, PRIMARY_COLOR } from "@/styles/colors";
import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<PressableProps, "style"> & {
  color?: Colors;
  textColor?: string;
  style?: ViewStyle;
};

export function Button({ children, color, textColor, style, ...buttonProps }: PropsWithChildren<Props>) {
  const { colors, fontFamily, borderRadius } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        fontFamily: fontFamily,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius,
        backgroundColor: pressed ? colors[color || PRIMARY_COLOR][5] : colors[color || PRIMARY_COLOR][4],
        ...style,
      })}
      {...buttonProps}
    >
      <Text color={textColor || colors.white}>{children}</Text>
    </Pressable>
  );
}
