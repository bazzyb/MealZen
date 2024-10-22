import { router } from "expo-router";

import { Text, ViewColumn } from "@/components";

import { Auth } from "./Auth";
import { Category } from "./components/Category";
import { MenuItem } from "./components/MenuItem";

export default function SettingsView() {
  return (
    <ViewColumn>
      <Auth />

      <Category />
      <MenuItem role="link" onPress={() => router.navigate("/books")} style={{ paddingVertical: 4 }}>
        <Text>Books</Text>
      </MenuItem>
    </ViewColumn>
  );
}
