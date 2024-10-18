import { LoadingIcon } from "../LoadingIcon";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, TextStyle, ViewStyle } from "react-native";

import { Colors, PRIMARY_COLOR } from "@/styles/colors";
import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<PressableProps, "style"> & {
  color?: Colors;
  textColor?: string;
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
  ...buttonProps
}: PropsWithChildren<Props>) {
  const { colors, fontFamily, borderRadius } = useAppTheme();

  function getBackgroundColor(pressed: boolean) {
    if (pressed) {
      return colors[color || PRIMARY_COLOR][5];
    }
    if (loading) {
      return colors.gray[0];
    }
    return colors[color || PRIMARY_COLOR][4];
  }

  return (
    <Pressable
      style={({ pressed }) => ({
        fontFamily: fontFamily,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius,
        backgroundColor: getBackgroundColor(pressed),
        ...style,
      })}
      {...buttonProps}
    >
      {loading ? (
        <LoadingIcon />
      ) : (
        <Text color={textColor || colors.white} style={textStyle}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
