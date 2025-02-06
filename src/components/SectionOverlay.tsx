import { StyleSheet, ViewStyle } from "react-native";

import { ViewColumn } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  children: React.ReactNode;
  styles?: ViewStyle;
};

export function SectionOverlay({ children, styles }: Props) {
  const { colors } = useAppTheme();

  return (
    <ViewColumn
      gap={16}
      padding={16}
      borderTopWidth={StyleSheet.hairlineWidth}
      borderTopColor={colors.gray[5]}
      backgroundColor={colors.background}
      {...styles}
    >
      {children}
    </ViewColumn>
  );
}
