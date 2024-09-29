import * as SplashScreen from "expo-splash-screen";
import { NotoSans_400Regular, NotoSans_700Bold, useFonts } from "@expo-google-fonts/noto-sans";
import { NotoSerif_400Regular } from "@expo-google-fonts/noto-serif";
import { PowerSyncContext } from "@powersync/react-native";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { db, init } from "@/db";
import { useAppTheme } from "@/styles/useAppTheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const { colors } = useAppTheme();

  const providerTheme = scheme === "dark" ? DarkTheme : DefaultTheme;

  const [loaded] = useFonts({
    NotoSerif_400Regular,
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      init();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={{
        ...providerTheme,
        colors: {
          ...providerTheme.colors,
          card: colors.headerBackground,
          background: colors.background,
        },
      }}
    >
      <GestureHandlerRootView>
        <PowerSyncContext.Provider value={db}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </PowerSyncContext.Provider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
