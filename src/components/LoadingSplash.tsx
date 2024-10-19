import { ActivityIndicator, Image } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

import { ViewColumn } from "./Layout/ViewColumn";

export function LoadingSplash() {
  const { colors } = useAppTheme();

  return (
    <ViewColumn height="100%" backgroundColor={colors.primary} justifyContent="center" alignItems="center">
      <Image
        source={require("../../assets/images/mealzen-logo.png")}
        style={{ width: "100%", height: 150, resizeMode: "contain" }}
      />
      <ActivityIndicator size="large" color={colors.white} />
    </ViewColumn>
  );
}
