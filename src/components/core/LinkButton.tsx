import { LinkProps, router } from "expo-router";
import { PropsWithChildren } from "react";
import { Pressable, ViewStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<LinkProps<string>, "style"> & {
  style?: ViewStyle;
};

export function LinkButton({ children, style, href }: PropsWithChildren<Props>) {
  const { colors, borderRadius } = useAppTheme();

  return (
    <Pressable
      role="link"
      style={({ pressed }) => ({
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius,
        backgroundColor: pressed ? colors.blue[2] : colors.blue[3],
        ...style,
      })}
      onPress={() => router.navigate(href)}
    >
      <Text style={{ color: colors.white }}>{children}</Text>
    </Pressable>
  );
}
