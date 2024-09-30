import { PropsWithChildren } from "react";
import { TextInput as TextInputBase, TextInputProps, TextStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<TextInputProps, "style"> & {
  style?: TextStyle;
  color?: string;
  size?: number;
  bold?: boolean;
};

export function TextInput({ children, style, color, size, bold, ...textInputProps }: PropsWithChildren<Props>) {
  const { colors, fontFamily, fontBold, borderRadius } = useAppTheme();

  return (
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
  );
}
