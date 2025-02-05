import Checkbox from "expo-checkbox";
import { PropsWithChildren } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";

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
  isSelectMode: boolean;
};

type RowProps<TData extends GenericData> = {
  item: TData;
  columns: Array<Column<TData>>;
  isSelected: boolean;
  handleSelectedItem: (id: string, isSelected: boolean) => void;
} & SharedProps;

function DraggableWrapper({ draggableProps, onPress, isSelectMode, children }: PropsWithChildren<SharedProps>) {
  const { colors } = useAppTheme();

  if (!isSelectMode && draggableProps) {
    return (
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={colors.activeBackground}
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

  if (!isSelectMode && onPress) {
    return (
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={colors.activeBackground}
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
  isSelectMode,
  isSelected,
  handleSelectedItem,
}: PropsWithChildren<RowProps<TData>>) {
  const { colors } = useAppTheme();

  return (
    <DraggableWrapper draggableProps={draggableProps} onPress={onPress} isSelectMode={isSelectMode}>
      <ViewRow
        width="100%"
        justifyContent="flex-start"
        alignItems="center"
        paddingVertical={12}
        paddingHorizontal={16}
        gap={8}
        minHeight={60}
        borderBottomWidth={StyleSheet.hairlineWidth}
        borderBottomColor={colors.gray[0]}
        backgroundColor={draggableProps?.isActive ? colors.rowDragBackground : colors.background}
      >
        {isSelectMode && (
          <Checkbox
            style={{ padding: 14 }}
            value={isSelected}
            onValueChange={checked => handleSelectedItem(item.id, checked)}
          />
        )}
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
