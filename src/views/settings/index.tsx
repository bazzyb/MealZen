import { router } from "expo-router";
import { Linking } from "react-native";
import DeviceInfo from "react-native-device-info";

import { Text, ViewColumn } from "@/components";
import { useAppTheme } from "@/styles/useAppTheme";

import { Auth } from "./Auth";
import { Category } from "./components/Category";
import { MenuItem } from "./components/MenuItem";

export default function SettingsView() {
  const { colors } = useAppTheme();

  return (
    <ViewColumn>
      <Auth />
      <Category />

      <MenuItem role="link" onPress={() => router.navigate("/(settings)/books")}>
        <Text>Books</Text>
      </MenuItem>
      <Category />
      <MenuItem role="link" onPress={() => Linking.openURL("https://www.mealzen.co.uk/privacy-policy")}>
        <Text>Privacy Policy</Text>
      </MenuItem>
      <MenuItem style={{ minHeight: "auto" }}>
        <Text style={{ fontSize: 12 }} color={colors.textSecondary}>
          App Version: {DeviceInfo.getVersion()}
        </Text>
      </MenuItem>
      {__DEV__ && (
        <>
          <Category />
          <MenuItem role="link" onPress={() => router.navigate("/dev-settings")}>
            <Text>Dev Settings</Text>
          </MenuItem>
        </>
      )}
    </ViewColumn>
  );
}
