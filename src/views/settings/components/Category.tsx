import { PropsWithChildren } from "react";

import { Text, ViewRow } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

export function Category({ children }: PropsWithChildren<object>) {
  const { colors } = useAppTheme();

  return (
    <ViewRow
      borderBottomColor={colors.gray[5]}
      borderBottomWidth={1}
      minHeight={2}
      paddingHorizontal={10}
      backgroundColor={colors.disabledLight}
    >
      {children && (
        <Text bold style={{ color: colors.black, fontSize: 12 }}>
          {children}
        </Text>
      )}
    </ViewRow>
  );
}
