import { PropsWithChildren } from "react";

import { Text, ViewRow } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

export function Category({ children }: PropsWithChildren<object>) {
  const { colors, fontBold } = useAppTheme();

  return (
    <ViewRow
      borderBottomColor={colors.gray[5]}
      borderBottomWidth={1}
      paddingHorizontal={10}
      backgroundColor={colors.disabledLight}
    >
      <Text style={{ color: colors.black, fontFamily: fontBold, fontSize: 12 }}>{children}</Text>
    </ViewRow>
  );
}
