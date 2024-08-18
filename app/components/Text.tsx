import { PropsWithChildren } from "react";
import { Text as TextBase, TextProps, TextStyle } from "react-native";

import { SansFont } from "@/styles/typography";

type Props = Omit<TextProps, "style"> & {
  style?: TextStyle;
};

export function Text({ children, style, ...textProps }: PropsWithChildren<Props>) {
  return (
    <TextBase style={{ fontFamily: SansFont, ...style }} {...textProps}>
      {children}
    </TextBase>
  );
}
