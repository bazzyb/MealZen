import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

import { tabColors } from "@/styles/colors";
import { SerifFont } from "@/styles/typography";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        ...tabColors,
        tabBarStyle: {
          height: 60,
        },
        headerTitleStyle: { fontFamily: SerifFont },
        tabBarLabelStyle: { fontFamily: SerifFont, paddingBottom: 4 },
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
