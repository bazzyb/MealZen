import { useCallback, useState } from "react";
import DraggableFlatList, { DragEndParams, RenderItemParams } from "react-native-draggable-flatlist";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

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
      <TouchableOpacity centerV style={{ height: 50 }} onLongPress={drag} delayLongPress={300} disabled={isActive}>
        <View flex row centerV height={50}>
          <Text style={{ width: 60 }}>{item.text}</Text>
          <Text style={{ width: 100 }}>{item.text2}</Text>
          <Text>{item.text3}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View flex>
      <View flex useSafeArea>
        <DraggableFlatList
          data={orderedItems}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View flex row centerV backgroundColor="white">
              <Text style={{ width: 60 }}>Date</Text>
              <Text style={{ width: 100 }}>Name</Text>
              <Text>Notes</Text>
            </View>
          )}
          renderPlaceholder={() => <View flex center backgroundColor="#DDD" />}
          stickyHeaderIndices={[0]}
          keyExtractor={keyExtractor}
          onDragEnd={onOrderChange}
          initialNumToRender={orderedItems.length}
        />
      </View>
    </View>
  );
}
