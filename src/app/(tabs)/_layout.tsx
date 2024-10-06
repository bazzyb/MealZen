import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePowerSync } from "@powersync/react-native";
import { Tabs } from "expo-router";

import { Button } from "@/components";
import { syncLocalChangesToSyncedTable } from "@/db/sync/switchTables";
import { getSyncEnabled, setSyncEnabled } from "@/db/sync/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

export default function TabsLayout() {
  const theme = useAppTheme();
  const powerSync = usePowerSync();
  const { isSyncEnabled, setIsSyncEnabled, user } = useAuth();

  async function handleSyncPress() {
    try {
      const isSynced = await getSyncEnabled();
      if (isSynced) {
        await setSyncEnabled(false);
        setIsSyncEnabled(false);
      } else {
        await syncLocalChangesToSyncedTable(powerSync, user!.id);
        await setSyncEnabled(true);
        setIsSyncEnabled(true);
      }
    } catch (err) {
      Logger.log(err);
    }
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: theme.colors.tabsActiveBackground,
        tabBarInactiveBackgroundColor: theme.colors.tabsBackground,
        tabBarActiveTintColor: theme.colors.tabsActiveText,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: {
          height: 60,
        },
        headerTintColor: theme.colors.headerText,
        headerTitleAlign: "left",
        headerRight: () => (
          <Button onPress={handleSyncPress} color={isSyncEnabled ? "green" : "red"}>
            Sync
          </Button>
        ),
        headerTitleStyle: { fontFamily: theme.headerFontFamily },
        tabBarLabelStyle: { fontFamily: theme.headerFontFamily, paddingBottom: 4 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Meal Plan",
          tabBarIcon: ({ color, size }) => <FontAwesome6 name="calendar-days" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          tabBarIcon: ({ color, size }) => <Ionicons name="fast-food-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: "Books",
          tabBarIcon: ({ color, size }) => <Entypo name="book" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
