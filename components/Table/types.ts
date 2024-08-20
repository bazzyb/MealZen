import { ReactNode } from "react";

export type GenericData = {
  id: string | number;
} & Record<string, string | ReactNode>;

type Accessor<TData extends GenericData> =
  | {
      accessor: string;
    }
  | {
      accessorFn: (data: TData) => ReactNode;
    };

export type Column<TData extends GenericData> = {
  id?: string;
  label?: string;
  width?: number;
  onSort?: (data: TData[]) => void;
} & Accessor<TData>;

export type TableProps<TData extends GenericData> = {
  data: TData[];
  columns: Array<Column<TData>>;
  isSortable?: boolean;
};
