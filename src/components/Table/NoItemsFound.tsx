import { ViewColumn } from "../Layout/ViewColumn";
import { Text } from "../core/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";

import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  noItemsButton?: ReactNode;
};

export function NoItemsFound({ noItemsButton }: Props) {
  const { colors } = useAppTheme();
  return (
    <ViewColumn flex={1} justifyContent="center" alignItems="center">
      <MaterialCommunityIcons name="magnify-close" size={64} color={colors.gray[5]} />
      <Text bold style={{ textAlign: "center" }} size={20}>
        No items found
      </Text>
      {noItemsButton}
    </ViewColumn>
  );
}
