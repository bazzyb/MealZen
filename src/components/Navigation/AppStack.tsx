import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SyncStatus } from "@/components/SyncStatus";
import { useAppTheme } from "@/styles/useAppTheme";

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
        headerTitleAlign: "left",
        headerTitleStyle: { fontFamily: theme.headerFontFamily },
        headerRight: () => <SyncStatus />,
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen name="(tab-views)" options={{ headerShown: false }} />
    </Stack>
  );
}
