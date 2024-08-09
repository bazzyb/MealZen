import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useCallback, useState } from "react";
import { Colors, SortableList, SortableListItemProps, Text, TouchableOpacity, View } from "react-native-ui-lib";

interface Item extends SortableListItemProps {
  text: string;
  text2: string;
  text3: string;
}

const data = Array.from({ length: 30 }, (_, index) => ({
  text: `${index}`,
  text2: `2 - ${index}`,
  text3: `3 - ${index}`,
  id: `${index}`,
}));

export default function MealPlan() {
  const [orderedItems, setOrderedItems] = useState<Item[]>(data);

  const keyExtractor = useCallback((item: Item) => {
    return `${item.id}`;
  }, []);

  const onOrderChange = useCallback((newData: Item[]) => {
    setOrderedItems(newData);
  }, []);

  const renderItem = useCallback(({ item }: { item: Item; index: number }) => {
    return (
      <TouchableOpacity centerV>
        <View flex row centerV>
          <MaterialIcons style={{ width: 44 }} name="drag-indicator" size={24} color={Colors.$iconDefault} />
          <Text style={{ width: 60 }}>{item.text}</Text>
          <Text style={{ width: 100 }}>{item.text2}</Text>
          <Text>{item.text3}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View flex>
      <Text text30 $textDefault margin10>
        Sortable List
      </Text>
      <View flex useSafeArea>
        <SortableList
          flexMigration
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={() => (
            <View flex row centerV backgroundColor="white">
              <Text style={{ width: 44 }} />
              <Text style={{ width: 60 }}>Date</Text>
              <Text style={{ width: 100 }}>Name</Text>
              <Text>Notes</Text>
            </View>
          )}
          stickyHeaderIndices={[0]}
          keyExtractor={keyExtractor}
          onOrderChange={onOrderChange}
          scale={1.02}
          initialNumToRender={data.length}
        />
      </View>
    </View>
  );
}
