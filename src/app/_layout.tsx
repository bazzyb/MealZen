import * as SplashScreen from "expo-splash-screen";
import { NotoSans_400Regular, NotoSans_700Bold, useFonts } from "@expo-google-fonts/noto-sans";
import { NotoSerif_400Regular } from "@expo-google-fonts/noto-serif";
import { PowerSyncContext } from "@powersync/react-native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

import { db, init } from "@/db";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  const [fontsLoaded] = useFonts({
    NotoSerif_400Regular,
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    init().then(() => {
      setAppReady(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!fontsLoaded || !appReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <PowerSyncContext.Provider value={db}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PowerSyncContext.Provider>
    </ThemeProvider>
  );
}
