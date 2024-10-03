import * as SplashScreen from "expo-splash-screen";
import { NotoSans_400Regular, NotoSans_700Bold, useFonts } from "@expo-google-fonts/noto-sans";
import { NotoSerif_400Regular } from "@expo-google-fonts/noto-serif";
import { PowerSyncContext } from "@powersync/react-native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { TEST_EMAIL, TEST_PASSWORD } from "@/config";
import { db, init, supabase } from "@/db";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [sessionChecked, setSessionChecked] = useState(false);

  const [loaded] = useFonts({
    NotoSerif_400Regular,
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    if (loaded && sessionChecked) {
      SplashScreen.hideAsync();
      init();
    }
  }, [loaded, sessionChecked]);

  useEffect(() => {
    supabase.login(TEST_EMAIL, TEST_PASSWORD).then(() => {
      setSessionChecked(true);
    });
  }, []);

  if (!loaded) {
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
