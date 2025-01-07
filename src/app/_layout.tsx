import * as SplashScreen from "expo-splash-screen";
import { NotoSans_400Regular, NotoSans_700Bold, useFonts } from "@expo-google-fonts/noto-sans";
import { useEffect } from "react";
import Toast, { ErrorToast, InfoToast, SuccessToast } from "react-native-toast-message";

import { LoadingSplash } from "@/components/LoadingSplash";
import { AppStack } from "@/components/Navigation/AppStack";
import { AuthProvider } from "@/providers/AuthProvider";
import { PowerSyncProvider } from "@/providers/PowerSyncProvider";
import { SubsProvider } from "@/providers/SubsProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { colors } from "@/styles/colors";
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
          <SubsProvider>
            <PowerSyncProvider>
              <AppStack />
            </PowerSyncProvider>
          </SubsProvider>
        </AuthProvider>
      </ThemeProvider>
      <Toast
        config={{
          info: props => (
            <InfoToast
              {...props}
              style={{
                height: "auto",
                paddingVertical: 8,
                borderLeftColor: colors.blue[6],
              }}
              text1NumberOfLines={2}
              text2NumberOfLines={5}
            />
          ),
          success: props => (
            <SuccessToast
              {...props}
              style={{
                height: "auto",
                paddingVertical: 8,
                borderLeftColor: colors.green[6],
              }}
              text1NumberOfLines={2}
              text2NumberOfLines={5}
            />
          ),
          error: props => (
            <ErrorToast
              {...props}
              style={{
                height: "auto",
                paddingVertical: 8,
                borderLeftColor: colors.red[6],
              }}
              text1NumberOfLines={2}
              text2NumberOfLines={5}
            />
          ),
        }}
      />
    </>
  );
}
