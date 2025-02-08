import { PropsWithChildren, ReactNode } from "react";
import { ActivityIndicator, Pressable, PressableProps, ViewStyle } from "react-native";

import { ViewRow } from "@/components/Layout/ViewRow";
import { ColorSet } from "@/styles/theme";
import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<PressableProps, "style"> & {
  color?: ColorSet;
  textColor?: string;
  variant?: "filled" | "outlined";
  style?: ViewStyle;
  fontSize?: number;
  loading?: boolean;
  leftIcon?: ReactNode;
};

export function Button({
  children,
  loading,
  color,
  textColor,
  fontSize,
  style,
  variant,
  disabled,
  leftIcon,
  ...buttonProps
}: PropsWithChildren<Props>) {
  const { colors, buttonStyles } = useAppTheme();

  const buttonFontSize = fontSize || 14;

  function getColor(dark?: boolean) {
    return colors[`${color || "success"}${dark ? "Dark" : ""}`];
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
        ...buttonStyles,
        backgroundColor: getBackgroundColor(pressed),
        borderWidth: variant === "outlined" ? 1 : 0,
        borderColor: variant === "outlined" ? getBackgroundColor(pressed) : undefined,
        ...style,
      })}
      accessible={!disabled}
      disabled={disabled}
      {...buttonProps}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <ViewRow alignItems="center" justifyContent="center" gap={8}>
          {leftIcon}
          <Text
            color={
              disabled || loading
                ? colors.disabledText
                : variant === "outlined"
                  ? getColor()
                  : textColor || colors.buttonText
            }
            style={{ textAlign: "center", height: buttonFontSize * 2, fontSize: buttonFontSize }}
          >
            {children}
          </Text>
        </ViewRow>
      )}
    </Pressable>
  );
}
