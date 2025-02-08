import { ActivityIndicator, StyleSheet } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

import { ViewColumn } from "./Layout/ViewColumn";

export function LoadingOverlay() {
  const { colors } = useAppTheme();

  return (
    <ViewColumn
      {...StyleSheet.absoluteFillObject}
      zIndex={10}
      backgroundColor={`${colors.black}77`}
      justifyContent="center"
      alignItems="center"
      gap={16}
    >
      <ActivityIndicator size="large" color={colors.white} />
    </ViewColumn>
  );
}
