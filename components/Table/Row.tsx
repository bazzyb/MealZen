import { PropsWithChildren } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

import { ViewRow } from "@/components/Views/ViewRow";
import { Text } from "@/components/core/Text";
import { useAppTheme } from "@/styles/useAppTheme";

import { Column, GenericData } from "./types";

type DraggableProps = {
  drag: () => void;
  isActive: boolean;
};

type SharedProps = {
  draggableProps?: DraggableProps;
  onPress?: () => void;
};

type RowProps<TData extends GenericData> = {
  item: TData;
  columns: Array<Column<TData>>;
} & SharedProps;

function DraggableWrapper({ draggableProps, onPress, children }: PropsWithChildren<SharedProps>) {
  if (draggableProps) {
    return (
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={onPress}
        onLongPress={draggableProps.drag}
        delayLongPress={300}
        disabled={draggableProps.isActive}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <Pressable onPress={onPress}>{children}</Pressable>;
}

export function TableRow<TData extends GenericData>({
  item,
  draggableProps,
  onPress,
  columns,
}: PropsWithChildren<RowProps<TData>>) {
  const { colors } = useAppTheme();

  return (
    <DraggableWrapper draggableProps={draggableProps} onPress={onPress}>
      <ViewRow
        width="100%"
        justifyContent="flex-start"
        alignItems="center"
        paddingVertical={8}
        paddingHorizontal={16}
        gap={8}
        borderBottomWidth={1}
        borderBottomColor={colors.gray[0]}
      >
        {columns.map(({ id, label, width, ...accessors }) => {
          const accessor = "accessor" in accessors ? accessors.accessor : accessors.accessorFn;
          return (
            <View key={id || label} style={{ flex: width ? 0 : 1, width }}>
              {typeof accessor === "string" ? <Text>{item[accessor]}</Text> : accessor(item)}
            </View>
          );
        })}
      </ViewRow>
    </DraggableWrapper>
  );
}
