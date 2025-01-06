import { router } from "expo-router";
import DeviceInfo from "react-native-device-info";

import { Text, ViewColumn } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

import { Category } from "./components/Category";
import { MenuItem } from "./components/MenuItem";

// import { Auth } from "./Auth";

export default function SettingsView() {
  const { colors } = useAppTheme();

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
      <Category />
      <MenuItem
        role="link"
        onPress={() => router.navigate("https://www.mealzen.co.uk/privacy-policy")}
        style={{ paddingVertical: 4 }}
      >
        <Text>Privacy Policy</Text>
      </MenuItem>
      <MenuItem style={{ paddingVertical: 6, minHeight: "auto" }}>
        <Text style={{ fontSize: 12 }} color={colors.textSecondary}>
          App Version: {DeviceInfo.getVersion()}
        </Text>
      </MenuItem>
      {__DEV__ && (
        <>
          <Category />
          <MenuItem role="link" onPress={() => router.navigate("/dev-settings")} style={{ paddingVertical: 4 }}>
            <Text>Dev Settings</Text>
          </MenuItem>
        </>
      )}
    </ViewColumn>
  );
}
