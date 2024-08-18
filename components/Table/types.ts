import { ReactNode } from "react";

export type GenericData = {
  id: string | number;
} & Record<string, string | ReactNode>;

export type Column<TData extends GenericData> = {
  label: string;
  accessor: keyof TData;
  width?: number;
  onSort?: (data: TData[]) => void;
};

export type TableProps<TData extends GenericData> = {
  data: TData[];
  columns: Array<Column<TData>>;
  isSortable?: boolean;
};
