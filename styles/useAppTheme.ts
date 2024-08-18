import { useColorScheme } from "react-native";

import { getTheme } from "./theme";

export function useAppTheme() {
  const scheme = useColorScheme();
  return getTheme(scheme);
}
