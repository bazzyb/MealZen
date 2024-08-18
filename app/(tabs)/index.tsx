import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import DraggableFlatList, { DragEndParams, RenderItemParams } from "react-native-draggable-flatlist";

import { Text, ViewColumn, ViewRow } from "@/app/components";

interface Item {
  id: string;
  text: string;
  text2: string;
  text3: string;
}

const data = Array.from({ length: 30 }, (_, index) => ({
  id: `${index}`,
  text: `${index}`,
  text2: `2 - ${index}`,
  text3: `3 - ${index}`,
}));

export default function MealPlan() {
  const [orderedItems, setOrderedItems] = useState<Item[]>(data);

  const keyExtractor = useCallback((item: Item) => item.id, []);

  const onOrderChange = useCallback((params: DragEndParams<Item>) => {
    setOrderedItems(params.data);
  }, []);

  const renderItem = useCallback(({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <TouchableOpacity
        style={{ height: 50, alignItems: "center" }}
        onLongPress={drag}
        delayLongPress={300}
        disabled={isActive}
      >
        <ViewRow alignItems="center" height={50}>
          <Text style={{ width: 60 }}>{item.text}</Text>
          <Text style={{ width: 100 }}>{item.text2}</Text>
          <Text>{item.text3}</Text>
        </ViewRow>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{ display: "flex" }}>
      <ViewColumn>
        <DraggableFlatList
          data={orderedItems}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <ViewRow alignItems="center" backgroundColor="white">
              <Text style={{ width: 60 }}>Date</Text>
              <Text style={{ width: 100 }}>Name</Text>
              <Text>Notes</Text>
            </ViewRow>
          )}
          renderPlaceholder={() => <ViewColumn alignItems="center" backgroundColor="#DDD" />}
          stickyHeaderIndices={[0]}
          keyExtractor={keyExtractor}
          onDragEnd={onOrderChange}
          initialNumToRender={orderedItems.length}
        />
      </ViewColumn>
    </View>
  );
}
