import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SyncAlerts } from "@/components/SyncAlerts";
import { useAppTheme } from "@/styles/useAppTheme";

export default function TabsLayout() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveBackgroundColor: theme.colors.tabsActiveBackground,
          tabBarInactiveBackgroundColor: theme.colors.tabsBackground,
          tabBarActiveTintColor: theme.colors.tabsActiveText,
          tabBarInactiveTintColor: theme.colors.tabsText,
          tabBarStyle: {
            height: 60 + insets.bottom,
          },
          headerTintColor: theme.colors.headerText,
          headerTitleAlign: "left",
          headerTitleStyle: { fontFamily: theme.headerFontFamily },
          tabBarLabelStyle: { fontFamily: theme.headerFontFamily, paddingBottom: 4 },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Meal Plan",
            tabBarIcon: ({ color, size }) => <FontAwesome name="calendar" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="collection"
          options={{
            title: "Collection",
            tabBarIcon: ({ color, size }) => <Ionicons name="library" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
          }}
        />
      </Tabs>
      <SyncAlerts />
    </>
  );
}
