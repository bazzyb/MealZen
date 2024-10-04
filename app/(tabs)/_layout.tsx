import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePowerSync } from "@powersync/react-native";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";

import { Button } from "@/components";
import { switchToLocalSchema, switchToSyncedSchema } from "@/db/sync/switchTables";
import { getSyncEnabled } from "@/db/sync/utils";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";

export default function TabsLayout() {
  const theme = useAppTheme();
  const powerSync = usePowerSync();
  const [isEnabled, setIsEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    getSyncEnabled().then(setIsEnabled);
  }, []);

  async function handleSyncPress() {
    try {
      const isSynced = await getSyncEnabled();
      if (isSynced) {
        await switchToLocalSchema(powerSync);
        setIsEnabled(false);
      } else {
        await switchToSyncedSchema(powerSync);
        setIsEnabled(true);
      }
    } catch (err) {
      Logger.log(err);
    }
  }

  if (isEnabled === null) {
    return null;
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
          <Button onPress={handleSyncPress} color={isEnabled ? "green" : "red"}>
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
