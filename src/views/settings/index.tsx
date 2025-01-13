import { router } from "expo-router";
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
      {/* {__DEV__ && (
        <>
      <Auth />
      <Category />
        </>
      )} */}

      <MenuItem role="link" pv={4} onPress={() => router.navigate("/(settings)/books")}>
        <Text>Books</Text>
      </MenuItem>
      <Category />
      <MenuItem role="link" pv={4} onPress={() => router.navigate("https://www.mealzen.co.uk/privacy-policy")}>
        <Text>Privacy Policy</Text>
      </MenuItem>
      <MenuItem pv={6} style={{ minHeight: "auto" }}>
        <Text style={{ fontSize: 12 }} color={colors.textSecondary}>
          App Version: {DeviceInfo.getVersion()}
        </Text>
      </MenuItem>
      {__DEV__ && (
        <>
          <Category />
          <MenuItem role="link" pv={4} onPress={() => router.navigate("/dev-settings")}>
            <Text>Dev Settings</Text>
          </MenuItem>
        </>
      )}
    </ViewColumn>
  );
}
