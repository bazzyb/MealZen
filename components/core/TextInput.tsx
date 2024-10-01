import { ViewColumn } from "../Views/ViewColumn";
import { PropsWithChildren } from "react";
import { TextInput as TextInputBase, TextInputProps, TextStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

import { Text } from "./Text";

type Props = Omit<TextInputProps, "style"> & {
  label?: string;
  style?: TextStyle;
  color?: string;
  size?: number;
  bold?: boolean;
};

export function TextInput({ children, label, style, color, size, bold, ...textInputProps }: PropsWithChildren<Props>) {
  const { colors, fontFamily, fontBold, borderRadius } = useAppTheme();

  return (
    <ViewColumn width={style?.width || "100%"} flex={style?.flex} gap={2}>
      {label && (
        <Text style={{ marginLeft: 8, fontSize: 12, color: colors.label }} bold={bold}>
          {label}
        </Text>
      )}
      <TextInputBase
        style={{
          fontFamily: bold ? fontBold : fontFamily,
          color: color || colors.black,
          fontSize: size,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius,
          borderWidth: 1,
          borderColor: `1px solid ${colors.gray[2]}`,
          backgroundColor: colors.white,
          ...style,
        }}
        placeholderTextColor={colors.gray[4]}
        {...textInputProps}
      >
        {children}
      </TextInputBase>
    </ViewColumn>
  );
}
