import { ThemeManager, Typography } from "react-native-ui-lib";

export const SansFont = "NotoSans_400Regular";
export const SerifFont = "NotoSerif_400Regular";

Typography.loadTypographies({
  body: { fontFamily: "NotoSans_400Regular" },
  heading: { fontFamily: "NotoSerif_400Regular" },
});

ThemeManager.setComponentTheme("Text", {
  style: Typography.body,
});
