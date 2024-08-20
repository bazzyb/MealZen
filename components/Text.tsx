import { PropsWithChildren } from "react";
import { Text as TextBase, TextProps, TextStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<TextProps, "style"> & {
  style?: TextStyle;
  color?: string;
  size?: number;
  bold?: boolean;
};

export function Text({ children, style, color, size, bold, ...textProps }: PropsWithChildren<Props>) {
  const { colors, fontFamily, fontBold } = useAppTheme();

  return (
    <TextBase
      style={{ fontFamily: bold ? fontBold : fontFamily, color: color || colors.text, fontSize: size, ...style }}
      {...textProps}
    >
      {children}
    </TextBase>
  );
}
