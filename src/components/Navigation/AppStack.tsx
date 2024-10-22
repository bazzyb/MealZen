import { Text } from "../core/Text";
import { Stack } from "expo-router";
import { startCase } from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/styles/useAppTheme";

function getTitle(route: string) {
  if (route.endsWith("/index")) {
    return route.split("/").slice(-2)[0];
  }
  return route.split("/").slice(-1)[0];
}

export function AppStack() {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          height: 60 + insets.bottom,
        },
        headerTintColor: theme.colors.headerText,
        headerTitle: title => (
          <Text
            style={{
              fontFamily: theme.headerFontFamily,
              fontSize: 18,
              fontWeight: 600,
              color: theme.colors.headerText,
            }}
          >
            {startCase(getTitle(title.children))}
          </Text>
        ),
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
