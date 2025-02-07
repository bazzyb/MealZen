import { StyleSheet, ViewStyle } from "react-native";

import { ViewColumn } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  children: React.ReactNode;
  position: "top" | "bottom";
  style?: ViewStyle;
};

export function SectionOverlay({ children, position, style }: Props) {
  const { colors } = useAppTheme();

  return (
    <ViewColumn
      gap={16}
      padding={16}
      borderTopWidth={position === "bottom" ? StyleSheet.hairlineWidth : undefined}
      borderTopColor={position === "bottom" ? colors.gray[5] : undefined}
      borderBottomWidth={position === "top" ? StyleSheet.hairlineWidth : undefined}
      borderBottomColor={position === "top" ? colors.gray[5] : undefined}
      backgroundColor={colors.background}
      {...style}
    >
      {children}
    </ViewColumn>
  );
}
