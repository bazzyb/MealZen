import * as SplashScreen from "expo-splash-screen";
import { NotoSans_400Regular, useFonts } from "@expo-google-fonts/noto-sans";
import { NotoSerif_400Regular } from "@expo-google-fonts/noto-serif";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";

import { stackColors } from "@/styles/colors";
import "@/styles/typography";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    NotoSerif_400Regular,
    NotoSans_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ ...stackColors }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
