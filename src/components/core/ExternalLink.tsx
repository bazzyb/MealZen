import { PropsWithChildren } from "react";
import { Linking, Text as TextBase, TextProps, TextStyle, TouchableOpacity } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = Omit<TextProps, "style"> & {
  url: string;
  style?: TextStyle;
  color?: string;
  size?: number;
  bold?: boolean;
};

export function ExternalLink({ children, url, style, color, size, bold, ...textProps }: PropsWithChildren<Props>) {
  const { colors, fontFamily, fontBold } = useAppTheme();

  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <TextBase
        style={{
          fontFamily: bold ? fontBold : fontFamily,
          color: color || colors.link,
          fontSize: size,
          textDecorationLine: "underline",
          ...style,
        }}
        {...textProps}
      >
        {children}
      </TextBase>
    </TouchableOpacity>
  );
}
