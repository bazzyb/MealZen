import { PropsWithChildren } from "react";
import { TouchableOpacity, View } from "react-native";

import { Text } from "@/components/Text";
import { ViewRow } from "@/components/Views/ViewRow";

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
      <ViewRow width="100%" justifyContent="flex-start" alignItems="center" minHeight={50} paddingVertical={4}>
        {columns.map(({ id, label, width, ...accessors }) => {
          const accessor = "accessor" in accessors ? accessors.accessor : accessors.accessorFn;
          return (
            <View key={id || label} style={{ flex: width ? 0 : 1, width, paddingHorizontal: 8 }}>
              {typeof accessor === "string" ? <Text>{item[accessor]}</Text> : accessor(item)}
            </View>
          );
        })}
      </ViewRow>
    </DraggableWrapper>
  );
}
