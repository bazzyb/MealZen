import { PropsWithChildren } from "react";

import { ViewRow } from "@/components/Views/ViewRow";
import { useAppTheme } from "@/styles/useAppTheme";

export function TableHeader({ children }: PropsWithChildren<unknown>) {
  const { colors } = useAppTheme();

  return (
    <ViewRow
      alignItems="center"
      height={40}
      borderBottomColor={colors.text}
      borderBottomWidth={2}
      backgroundColor={colors.background}
    >
      {children}
    </ViewRow>
  );
}
