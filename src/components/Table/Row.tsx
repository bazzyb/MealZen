import { PropsWithChildren } from "react";
import { TouchableHighlight, View } from "react-native";

import { ViewRow } from "@/components/Layout/ViewRow";
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
  const { colors } = useAppTheme();

  if (draggableProps) {
    return (
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={colors.rowActiveBackground}
        style={{ alignItems: "center" }}
        onPress={onPress}
        onLongPress={draggableProps.drag}
        delayLongPress={300}
        disabled={draggableProps.isActive}
      >
        {children}
      </TouchableHighlight>
    );
  }

  if (onPress) {
    return (
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={colors.rowActiveBackground}
        onPress={onPress}
        accessible={false} // ensure buttons on row are accessible, and clickable in maestro
      >
        {children}
      </TouchableHighlight>
    );
  }

  return children;
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
        backgroundColor={draggableProps?.isActive ? colors.rowDragBackground : "transparent"}
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
