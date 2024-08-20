import { ColorSchemeName } from "react-native";

import { colors } from "./colors";

export const lightColors = {
  headerText: colors.white,
  headerBackground: colors.purple[4],
  tabsBackground: colors.white,
  tabsActiveBackground: colors.purple[4],
  tabsActiveText: colors.white,

  text: colors.black,
  textSecondary: colors.gray[6],
  background: colors.white,

  primary: colors.purple[3],
  primaryLight: colors.purple[2],
  primaryDark: colors.purple[5],

  success: colors.green[4],
  successLight: colors.green[2],
  successDark: colors.green[5],

  error: colors.red[3],
  errorLight: colors.red[2],
  errorDark: colors.red[4],
};

export const darkColors: typeof lightColors = {
  headerText: colors.white,
  headerBackground: colors.purple[4],
  tabsBackground: colors.purple[4],
  tabsActiveBackground: colors.purple[6],
  tabsActiveText: colors.white,

  text: colors.white,
  textSecondary: colors.gray[1],
  background: colors.black,

  primary: colors.purple[3],
  primaryLight: colors.purple[2],
  primaryDark: colors.purple[5],

  success: colors.green[2],
  successLight: colors.green[1],
  successDark: colors.green[3],

  error: colors.red[2],
  errorLight: colors.red[1],
  errorDark: colors.red[3],
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
