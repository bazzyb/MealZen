import { DarkTheme, DefaultTheme, ThemeProvider as ThemeProviderBase } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useAppTheme } from "@/styles/useAppTheme";

export function ThemeProvider({ children }: PropsWithChildren<object>) {
  const scheme = useColorScheme();
  const { colors } = useAppTheme();

  const providerTheme = scheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ThemeProviderBase
      value={{
        ...providerTheme,
        colors: {
          ...providerTheme.colors,
          card: colors.headerBackground,
          background: colors.background,
        },
      }}
    >
      <GestureHandlerRootView>{children}</GestureHandlerRootView>
    </ThemeProviderBase>
  );
}
