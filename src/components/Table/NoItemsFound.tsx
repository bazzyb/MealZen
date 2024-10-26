import { ViewColumn } from "../Layout/ViewColumn";
import { Text } from "../core/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useAppTheme } from "@/styles/useAppTheme";

export function NoItemsFound() {
  const { colors, fontBold } = useAppTheme();
  return (
    <ViewColumn flex={1} justifyContent="center" alignItems="center">
      <MaterialCommunityIcons name="magnify-close" size={64} color={colors.gray[5]} />
      <Text style={{ textAlign: "center", fontFamily: fontBold }} size={20}>
        No items found
      </Text>
    </ViewColumn>
  );
}
