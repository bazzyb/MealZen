import { PropsWithChildren } from "react";
import { Text as TextBase, TextProps, TextStyle } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<TextProps, "style"> & {
  style?: TextStyle;
};

export function Text({ children, style, ...textProps }: PropsWithChildren<Props>) {
  const { colors, fontFamily } = useAppTheme();

  return (
    <TextBase style={{ fontFamily, color: colors.text, ...style }} {...textProps}>
      {children}
    </TextBase>
  );
}
