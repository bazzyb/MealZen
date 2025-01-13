import { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<PressableProps, "style"> & {
  style?: ViewStyle;
  pv?: number;
};

export function MenuItem({ style, pv, children, ...props }: PropsWithChildren<Props>) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.activeBackground : colors.background,
        width: "100%",
        minHeight: 40,
        paddingHorizontal: 16,
        paddingVertical: pv || 16,
        borderBottomColor: colors.gray[5],
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
        ...style,
      })}
      {...props}
    >
      {children}
    </Pressable>
  );
}
