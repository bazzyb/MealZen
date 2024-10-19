import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/styles/useAppTheme";

export default function TabsLayout() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
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
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
