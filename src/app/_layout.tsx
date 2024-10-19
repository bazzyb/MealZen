import * as SplashScreen from "expo-splash-screen";
import { NotoSans_400Regular, NotoSans_700Bold, useFonts } from "@expo-google-fonts/noto-sans";
import { Stack } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { LoadingSplash } from "@/components/LoadingSplash";
import { AuthProvider } from "@/providers/AuthProvider";
import { PowerSyncProvider } from "@/providers/PowerSyncProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Logger } from "@/utils/logger";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
    Wittgenstein: require("../../assets/fonts/Wittgenstein-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "Failed to load fonts",
        text2: error.message,
      });
      Logger.error("Failed to load fonts", error);
    }
  }, [error]);

  if (!fontsLoaded && !error) {
    return <LoadingSplash />;
  }

  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <PowerSyncProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </PowerSyncProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toast />
    </>
  );
}
