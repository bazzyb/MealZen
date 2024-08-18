import { ViewRow } from "@/components/Views/ViewRow";
import { useAppTheme } from "@/styles/useAppTheme";

import { HeaderCell } from "./HeaderCell";
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
      {columns.map(({ label, width }) => (
        <HeaderCell key={label} width={width}>
          {label}
        </HeaderCell>
      ))}
    </ViewRow>
  );
}
