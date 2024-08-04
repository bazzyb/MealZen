import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Colors } from "react-native-ui-lib";

import { tabColors } from "@/styles/colors";
import { SerifFont } from "@/styles/typography";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        ...tabColors,
        headerTitleStyle: { fontFamily: SerifFont },
        tabBarLabelStyle: { fontFamily: SerifFont, textAlign: "center" },
      }}
    >
      <Tabs.Screen
        name="meal-plan"
        options={{
          title: "Meal Plan",
          tabBarIcon: () => <FontAwesome6 name="calendar-days" size={24} color={Colors.white} />,
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          tabBarIcon: () => <Ionicons name="fast-food-outline" size={24} color={Colors.white} />,
        }}
      />
    </Tabs>
  );
}
