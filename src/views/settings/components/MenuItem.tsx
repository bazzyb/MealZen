import { PropsWithChildren } from "react";
import { Pressable, PressableProps, ViewStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<PressableProps, "style"> & {
  style?: ViewStyle;
};

export function MenuItem({ style, children, ...props }: PropsWithChildren<Props>) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.rowActiveBackground : colors.background,
        width: "100%",
        minHeight: 40,
        padding: 16,
        borderBottomColor: colors.gray[5],
        borderBottomWidth: 1,
        justifyContent: "center",
        ...style,
      })}
      {...props}
    >
      {children}
    </Pressable>
  );
}
