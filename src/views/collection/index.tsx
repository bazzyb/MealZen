import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Text, ViewColumn, ViewRow } from "@/components";
import { MenuItem } from "@/components/MenuItem";

export default function CollectionView() {
  return (
    <ViewColumn>
      <MenuItem role="link" onPress={() => router.navigate("/(collection)/meals")}>
        <ViewRow alignItems="center" gap={8}>
          <Ionicons name="fast-food-outline" size={24} />
          <Text>Meals</Text>
        </ViewRow>
      </MenuItem>
      <MenuItem role="link" onPress={() => router.navigate("/(collection)/books")}>
        <ViewRow alignItems="center" gap={8}>
          <Entypo name="book" size={24} />
          <Text>Books</Text>
        </ViewRow>
      </MenuItem>
    </ViewColumn>
  );
}
