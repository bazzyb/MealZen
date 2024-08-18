import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

import { useAppTheme } from "@/styles/useAppTheme";

export default function TabsLayout() {
  const theme = useAppTheme();

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
    </Tabs>
  );
}
