import { ColorSchemeName } from "react-native";

import { PRIMARY_COLOR, colors } from "./colors";

export const lightColors = {
  headerText: colors.white,
  headerBackground: colors[PRIMARY_COLOR][4],
  tabsBackground: colors.white,
  tabsActiveBackground: colors[PRIMARY_COLOR][4],
  tabsActiveText: colors.white,

  text: colors.black,
  textSecondary: colors.gray[6],
  link: colors.blue[5],
  label: colors.gray[7],

  background: colors.white,
  modalBlurBackground: `${colors.black}A`,

  rowActiveBackground: colors.gray[2],
  rowDragBackground: colors.blue[1],

  primary: colors[PRIMARY_COLOR][3],
  primaryLight: colors[PRIMARY_COLOR][2],
  primaryDark: colors[PRIMARY_COLOR][5],

  success: colors.green[4],
  successLight: colors.green[2],
  successDark: colors.green[5],

  error: colors.red[3],
  errorLight: colors.red[2],
  errorDark: colors.red[4],
};

export const darkColors: typeof lightColors = {
  headerText: colors.white,
  headerBackground: colors[PRIMARY_COLOR][4],
  tabsBackground: colors[PRIMARY_COLOR][4],
  tabsActiveBackground: colors[PRIMARY_COLOR][6],
  tabsActiveText: colors.white,

  text: colors.white,
  textSecondary: colors.gray[1],
  link: colors.blue[1],
  label: colors.gray[1],

  background: colors.black,
  modalBlurBackground: `${colors.white}3`,

  rowActiveBackground: colors.gray[6],
  rowDragBackground: colors.blue[6],

  primary: colors[PRIMARY_COLOR][3],
  primaryLight: colors[PRIMARY_COLOR][2],
  primaryDark: colors[PRIMARY_COLOR][5],

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
    borderRadius: 4,
    fontFamily: "NotoSans_400Regular",
    fontBold: "NotoSans_700Bold",
    headerFontFamily: "NotoSerif_400Regular",
  };
}
