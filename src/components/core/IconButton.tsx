import { PropsWithChildren } from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<PressableProps, "style"> & {
  style?: ViewStyle;
};

export function IconButton({ children, style, ...buttonProps }: PropsWithChildren<Props>) {
  const { colors, buttonStyles } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        ...buttonStyles,
        backgroundColor: pressed ? colors.activeBackground : colors.background,
        ...style,
      })}
      {...buttonProps}
    >
      {children}
    </Pressable>
  );
}
