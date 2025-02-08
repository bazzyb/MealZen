import * as Sentry from "@sentry/react-native";
import * as SplashScreen from "expo-splash-screen";
import { NotoSans_400Regular, NotoSans_700Bold, useFonts } from "@expo-google-fonts/noto-sans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import Toast, { ErrorToast, InfoToast, SuccessToast } from "react-native-toast-message";

import { LoadingSplash } from "@/components/LoadingSplash";
import { AppStack } from "@/components/Navigation/AppStack";
import { AuthProvider } from "@/providers/AuthProvider";
import { PowerSyncProvider } from "@/providers/PowerSyncProvider";
import { SubsProvider } from "@/providers/SubsProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { colors } from "@/styles/colors";
import { Logger } from "@/utils/logger";

Sentry.init({
  dsn: "https://e357865f04533a08889509729444e51a@o4508784199991296.ingest.de.sentry.io/4508784206217296",

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
    Wittgenstein: require("../../assets/fonts/Wittgenstein-VariableFont_wght.ttf"),
  });

  const queryClient = useMemo(() => new QueryClient(), []);

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
            <QueryClientProvider client={queryClient}>
              <PowerSyncProvider>
                <AppStack />
              </PowerSyncProvider>
            </QueryClientProvider>
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
