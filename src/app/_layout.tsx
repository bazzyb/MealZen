import * as SplashScreen from "expo-splash-screen";
import { NotoSans_400Regular, NotoSans_700Bold, useFonts } from "@expo-google-fonts/noto-sans";
import { NotoSerif_400Regular } from "@expo-google-fonts/noto-serif";
import { Stack } from "expo-router";
import { useEffect } from "react";

import { AuthProvider } from "@/providers/AuthProvider";
import { PowerSyncProvider } from "@/providers/PowerSyncProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NotoSerif_400Regular,
    NotoSans_400Regular,
    NotoSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <PowerSyncProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </PowerSyncProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
