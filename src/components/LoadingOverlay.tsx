import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/styles/useAppTheme";

export function LoadingOverlay() {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        backgroundColor: `${colors.black}77`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* spinning loading icon with expo vector icons */}
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
}
