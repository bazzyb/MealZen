import { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";

import { ViewRow } from "@/components/Views/ViewRow";

import { RowCell } from "./RowCell";
import { Column, GenericData } from "./types";

type DraggableProps = {
  drag: () => void;
  isActive: boolean;
};

type SharedProps = {
  draggableProps?: DraggableProps;
};

type RowProps<TData extends GenericData> = {
  item: TData;
  columns: Array<Column<TData>>;
} & SharedProps;

function DraggableWrapper({ draggableProps, children }: PropsWithChildren<SharedProps>) {
  if (draggableProps) {
    return (
      <TouchableOpacity
        style={{ height: 50, alignItems: "center" }}
        onLongPress={draggableProps.drag}
        delayLongPress={300}
        disabled={draggableProps.isActive}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return children;
}

export function TableRow<TData extends GenericData>({
  item,
  draggableProps,
  columns,
}: PropsWithChildren<RowProps<TData>>) {
  return (
    <DraggableWrapper draggableProps={draggableProps}>
      <ViewRow width="100%" justifyContent="flex-start" alignItems="center" height={50}>
        {columns.map(({ label, accessor, width }) => (
          <RowCell key={label} width={width}>
            {item[accessor]}
          </RowCell>
        ))}
      </ViewRow>
    </DraggableWrapper>
  );
}
