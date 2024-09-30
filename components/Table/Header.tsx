import { ViewRow } from "@/components/Views/ViewRow";
import { Text } from "@/components/core/Text";
import { useAppTheme } from "@/styles/useAppTheme";

import { Column, GenericData } from "./types";

type Props<TData extends GenericData> = {
  columns: Array<Column<TData>>;
};

export function TableHeader<TData extends GenericData>({ columns }: Props<TData>) {
  const { colors } = useAppTheme();

  return (
    <ViewRow
      alignItems="center"
      height={40}
      paddingHorizontal={16}
      borderBottomColor={colors.text}
      borderBottomWidth={2}
      backgroundColor={colors.background}
      gap={8}
    >
      {columns.map(({ id, label, width }) => (
        <Text key={id || label} bold style={{ width }}>
          {label}
        </Text>
      ))}
    </ViewRow>
  );
}
