import { Entypo } from "@expo/vector-icons";
import { MenuView } from "@react-native-menu/menu";
import { Alert, Platform } from "react-native";

import { IconButton } from "@/components/core/IconButton";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  selectedItems: Array<string>;
  handleDeleteMany: () => void;
};

export function SelectMenu({ selectedItems, handleDeleteMany }: Props) {
  const { colors } = useAppTheme();

  return (
    <MenuView
      title="Menu Title"
      onPressAction={({ nativeEvent }) => {
        if (selectedItems.length === 0) {
          Alert.alert("No items selected", "Please select items before performing this action.");
        }
        if (nativeEvent.event === "delete-selected-items") {
          handleDeleteMany();
        }
      }}
      actions={[
        {
          id: "delete-selected-items",
          title: "Delete Items",
          attributes: {
            destructive: true,
          },
          image: Platform.select({
            ios: "trash",
            android: "ic_menu_delete",
          }),
        },
      ]}
    >
      <IconButton accessibilityLabel="Clear selection">
        <Entypo name="dots-three-vertical" size={24} color={colors.text} />
      </IconButton>
    </MenuView>
  );
}
