import { Entypo } from "@expo/vector-icons";
import { MenuView } from "@react-native-menu/menu";
import { Alert, Platform } from "react-native";

import { IconButton } from "@/components/core/IconButton";
import { useAppTheme } from "@/styles/useAppTheme";

type Props = {
  selectedItems: Array<string>;
  handleDeleteMany: () => void;
  deleteWarning?: string;
};

export function SelectMenu({ selectedItems, handleDeleteMany, deleteWarning }: Props) {
  const { colors } = useAppTheme();

  function openDeleteAlert() {
    Alert.alert("Delete selected items", deleteWarning || "Are you sure you want to delete the selected items?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDeleteMany,
      },
    ]);
  }

  return (
    <MenuView
      title="Menu Title"
      onPressAction={({ nativeEvent }) => {
        if (selectedItems.length === 0) {
          Alert.alert("No items selected", "Please select items before performing this action.");
          return;
        }
        if (nativeEvent.event === "delete-selected-items") {
          openDeleteAlert();
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
      <IconButton accessibilityLabel="Open selection menu">
        <Entypo name="dots-three-vertical" size={24} color={colors.text} />
      </IconButton>
    </MenuView>
  );
}
