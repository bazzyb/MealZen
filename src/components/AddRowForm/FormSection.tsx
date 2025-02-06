import { StyleSheet } from "react-native";

import { ViewColumn } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  children: React.ReactNode;
};

export function FormSection({ children }: Props) {
  const { colors } = useAppTheme();

  return (
    <ViewColumn
      gap={16}
      padding={16}
      borderTopWidth={StyleSheet.hairlineWidth}
      borderTopColor={colors.gray[5]}
      backgroundColor={colors.background}
    >
      {children}
    </ViewColumn>
  );
}
