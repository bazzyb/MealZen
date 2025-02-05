import { ViewRow } from "../Layout/ViewRow";
import { Heading } from "../core/Heading";
import { Stack } from "expo-router";
import { startCase } from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SyncStatus } from "@/components/SyncStatus";
import { useAppTheme } from "@/styles/useAppTheme";

function getTitle(route: string) {
  if (route.endsWith("/books/[id]")) {
    return "Book Details";
  }
  if (route.endsWith("meals/[id]")) {
    return "Meal Details";
  }
  if (route.endsWith("cuisines/[id]")) {
    return "Cuisine Details";
  }
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
          <ViewRow justifyContent="space-between">
            <Heading
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: theme.colors.headerText,
                fontFamily: theme.headerFontFamily,
              }}
            >
              {startCase(getTitle(title.children))}
            </Heading>
            <SyncStatus />
          </ViewRow>
        ),
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="(tab-views)" options={{ headerShown: false }} />
    </Stack>
  );
}
