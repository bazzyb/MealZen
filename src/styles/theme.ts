import { ColorSchemeName } from "react-native";

import { colors } from "./colors";

const colorSet = {
  primary: colors.purple[4],
  primaryLight: colors.purple[5],
  primaryDark: colors.purple[3],
  secondary: colors.yellow[4],
  secondaryLight: colors.yellow[5],
  secondaryDark: colors.yellow[3],
  success: colors.green[4],
  successLight: colors.green[5],
  successDark: colors.green[3],
  error: colors.red[4],
  errorLight: colors.red[5],
  errorDark: colors.red[3],
  disabled: colors.gray[4],
  disabledLight: colors.gray[8],
  disabledDark: colors.gray[2],
};

export type ColorSet = "primary" | "secondary" | "success" | "error" | "disabled";

const lightTextColors = {
  text: colors.black,
  textSecondary: colors.gray[1],
  headerText: colors.white,
  tabsText: colors.black,
  tabsActiveText: colors.white,
  buttonText: colors.white,
  link: colors.blue[4],
  linkLight: colors.blue[5],
  linkDark: colors.blue[3],
  formErrorText: colorSet.error,
  disabledText: colors.gray[8],
};

const lightBackgroundColors = {
  background: colors.white,
  activeBackground: colors.gray[7],
  headerBackground: colorSet.primary,
  tabsBackground: colors.white,
  tabsActiveBackground: colorSet.primary,
  modalBlurBackground: `${colors.black}AA`,
  rowDragBackground: colors.blue[7],
};

const lightColors = {
  ...lightTextColors,
  ...lightBackgroundColors,
};

const darkTextColors = {
  text: colors.white,
  textSecondary: colors.gray[6],
  headerText: colors.white,
  tabsText: colors.white,
  tabsActiveText: colors.white,
  buttonText: colors.white,
  link: colors.blue[5],
  linkLight: colors.blue[6],
  linkDark: colors.blue[4],
  formErrorText: colorSet.errorLight,
  disabledText: colors.gray[8],
};

const darkBackgroundColors = {
  background: colors.black,
  activeBackground: colors.gray[1],
  headerBackground: colorSet.primary,
  tabsBackground: colors.black,
  tabsActiveBackground: colorSet.primary,
  modalBlurBackground: `${colors.gray[1]}AA`,
  rowDragBackground: colors.blue[1],
};

const darkColors = {
  ...darkTextColors,
  ...darkBackgroundColors,
};

export function getTheme(theme: ColorSchemeName) {
  return {
    colors: {
      ...colorSet,
      ...colors,
      ...(theme === "light" ? lightColors : darkColors),
    },
    borderRadius: 4,
    buttonStyles: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    fontFamily: "NotoSans_400Regular",
    fontBold: "NotoSans_700Bold",
    headerFontFamily: "Wittgenstein",
  };
}
