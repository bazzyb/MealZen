import { PropsWithChildren } from "react";
import { Text as TextBase, TextProps, TextStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<TextProps, "style"> & {
  style?: TextStyle;
  bold?: boolean;
};

export function Text({ children, style, bold, ...textProps }: PropsWithChildren<Props>) {
  const { colors, fontFamily, fontBold } = useAppTheme();

  return (
    <TextBase style={{ fontFamily: bold ? fontBold : fontFamily, color: colors.text, ...style }} {...textProps}>
      {children}
    </TextBase>
  );
}
