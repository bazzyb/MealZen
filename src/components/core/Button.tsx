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
  disabled,
  ...buttonProps
}: PropsWithChildren<Props>) {
  const { colors, fontFamily, borderRadius } = useAppTheme();

  function getColor(dark?: boolean) {
    return colors[`${color || "primary"}${dark ? "Dark" : ""}`];
  }

  function getBackgroundColor(pressed?: boolean) {
    if (pressed) {
      return variant === "outlined" ? colors.gray[8] : getColor(true);
    }
    if (disabled || loading) {
      return colors.disabled;
    }
    return variant === "outlined" ? colors.white : getColor();
  }

  return (
    <Pressable
      style={({ pressed }) => ({
        fontFamily: fontFamily,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius,
        backgroundColor: getBackgroundColor(pressed),
        borderWidth: variant === "outlined" ? 1 : 0,
        borderColor: variant === "outlined" ? getBackgroundColor(pressed) : undefined,
        ...style,
      })}
      disabled={disabled}
      {...buttonProps}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text
          color={
            disabled || loading
              ? colors.disabledText
              : variant === "outlined"
                ? getColor()
                : textColor || colors.buttonText
          }
          style={textStyle}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
