import { PropsWithChildren } from "react";
import { Text as TextBase, TextProps, TextStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<TextProps, "style"> & {
  style?: TextStyle;
  color?: string;
  size?: number;
  bold?: boolean;
};

export function Heading({ children, style, color, size, bold, ...textProps }: PropsWithChildren<Props>) {
  const { colors, headerFontFamily } = useAppTheme();

  return (
    <TextBase
      style={{
        fontFamily: headerFontFamily,
        fontWeight: bold ? "bold" : "normal",
        fontSize: size,
        color: color || colors.text,
        ...style,
      }}
      {...textProps}
    >
      {children}
    </TextBase>
  );
}
