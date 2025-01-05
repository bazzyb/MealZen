import { router } from "expo-router";

import { Text, ViewColumn } from "@/components";

// import { Auth } from "./Auth";
// import { Category } from "./components/Category";
import { MenuItem } from "./components/MenuItem";

export default function SettingsView() {
  return (
    <ViewColumn>
      {/* {__DEV__ && (
        <>
          <Auth />
          <Category />
        </>
      )} */}

      <MenuItem role="link" onPress={() => router.navigate("/(settings)/books")} style={{ paddingVertical: 4 }}>
        <Text>Books</Text>
      </MenuItem>
      {__DEV__ && (
        <MenuItem role="link" onPress={() => router.navigate("/dev-settings")} style={{ paddingVertical: 4 }}>
          <Text>Dev Settings</Text>
        </MenuItem>
      )}
    </ViewColumn>
  );
}
