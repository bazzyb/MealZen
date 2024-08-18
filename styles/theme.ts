import { ColorSchemeName } from "react-native";

import { colors } from "./colors";

export const lightColors = {
  headerText: colors.white,
  headerBackground: colors.purple[4],
  tabsBackground: colors.white,
  tabsActiveBackground: colors.purple[4],
  tabsActiveText: colors.white,

  text: colors.black,
  background: colors.white,

  primary: colors.purple[3],
  primaryLight: colors.purple[2],
  primaryDark: colors.purple[5],
};

export const darkColors: typeof lightColors = {
  headerText: colors.white,
  headerBackground: colors.purple[4],
  tabsBackground: colors.purple[4],
  tabsActiveBackground: colors.purple[6],
  tabsActiveText: colors.white,

  text: colors.white,
  background: colors.black,

  primary: colors.purple[3],
  primaryLight: colors.purple[2],
  primaryDark: colors.purple[5],
};

export function getTheme(theme: ColorSchemeName) {
  return {
    colors: {
      ...(theme === "light" ? lightColors : darkColors),
      ...colors,
    },
    fontFamily: "NotoSans_400Regular",
    fontBold: "NotoSans_700Bold",
    headerFontFamily: "NotoSerif_400Regular",
  };
}
