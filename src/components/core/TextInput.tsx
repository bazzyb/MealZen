import { ViewColumn } from "../Layout/ViewColumn";
import { PropsWithChildren, forwardRef } from "react";
import { TextInput as TextInputBase, TextInputProps, TextStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<TextInputProps, "style" | "value"> & {
  label?: string;
  value?: string | null;
  style?: TextStyle;
  color?: string;
  size?: number;
  bold?: boolean;
  error?: string;
};

export const TextInput = forwardRef<TextInputBase, PropsWithChildren<Props>>((props, ref) => {
  const { children, label, value, error, style, color, size, bold, ...textInputProps } = props;

  const { colors, fontFamily, fontBold, borderRadius } = useAppTheme();

  return (
    <ViewColumn width={style?.width || "100%"} flex={style?.flex} gap={2}>
      {label && (
        <Text style={{ marginLeft: 8, fontSize: 12, color: colors.textSecondary }} bold={bold}>
          {label}
        </Text>
      )}
      <TextInputBase
        ref={ref}
        value={value || ""}
        accessibilityLabel={`${label} input`}
        style={{
          fontFamily: bold ? fontBold : fontFamily,
          color: color || colors.black,
          fontSize: size,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius,
          borderWidth: error ? 2 : 1,
          borderColor: error ? colors.errorLight : colors.gray[2],
          backgroundColor: colors.white,
          ...style,
        }}
        placeholderTextColor={colors.gray[4]}
        {...textInputProps}
      >
        {children}
      </TextInputBase>
      {error && (
        <Text style={{ marginLeft: 8, fontSize: 12, color: colors.error }} bold>
          {error}
        </Text>
      )}
    </ViewColumn>
  );
});
