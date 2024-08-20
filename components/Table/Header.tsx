import { Text } from "@/components/Text";
import { ViewRow } from "@/components/Views/ViewRow";
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
      borderBottomColor={colors.text}
      borderBottomWidth={2}
      backgroundColor={colors.background}
    >
      {columns.map(({ id, label, width }) => (
        <Text key={id || label} bold style={{ width, paddingLeft: 8 }}>
          {label}
        </Text>
      ))}
    </ViewRow>
  );
}
