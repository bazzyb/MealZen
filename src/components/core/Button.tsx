import { PropsWithChildren } from "react";
import { ActivityIndicator, Pressable, PressableProps, TextStyle, ViewStyle } from "react-native";

import { ColorSet } from "@/styles/theme";
import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<PressableProps, "style"> & {
  color?: ColorSet;
  textColor?: string;
  variant?: "filled" | "outlined";
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
};

export function Button({
  children,
  loading,
  color,
  textColor,
  textStyle,
  style,
  variant,
  ...buttonProps
}: PropsWithChildren<Props>) {
  const { colors, fontFamily, borderRadius } = useAppTheme();

  function getBackgroundColor(pressed?: boolean) {
    if (pressed) {
      return colors[`${color || "primary"}Dark`];
    }
    if (loading) {
      return colors.disabled;
    }
    return colors[color || "primary"];
  }

  return (
    <Pressable
      style={({ pressed }) => ({
        fontFamily: fontFamily,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius,
        backgroundColor: variant === "outlined" ? colors.white : getBackgroundColor(pressed),
        borderWidth: variant === "outlined" ? 1 : 0,
        borderColor: variant === "outlined" ? getBackgroundColor(pressed) : undefined,
        ...style,
      })}
      {...buttonProps}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text
          color={
            loading ? colors.disabled : variant === "outlined" ? getBackgroundColor() : textColor || colors.buttonText
          }
          style={textStyle}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
