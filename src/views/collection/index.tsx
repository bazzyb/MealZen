import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { ViewRow } from "@/components/Layout/ViewRow";
import { MenuItem } from "@/components/MenuItem";
import { Text } from "@/components/core/Text";
import { useAppTheme } from "@/styles/useAppTheme";

export default function CollectionView() {
  const { colors } = useAppTheme();

  return (
    <ViewColumn>
      <MenuItem role="link" onPress={() => router.navigate("/(collection)/meals")}>
        <ViewRow alignItems="center" gap={8}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={24} color={colors.text} />
          <Text>Meals</Text>
        </ViewRow>
      </MenuItem>
      <MenuItem role="link" onPress={() => router.navigate("/(collection)/books")}>
        <ViewRow alignItems="center" gap={8}>
          <Entypo name="book" size={24} color={colors.text} />
          <Text>Books</Text>
        </ViewRow>
      </MenuItem>
    </ViewColumn>
  );
}
