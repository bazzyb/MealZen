import AsyncStorage from "@react-native-async-storage/async-storage";

const SYNC_KEY = "mealzen-sync-enabled";

export async function getSyncEnabled() {
  const value = await AsyncStorage.getItem(SYNC_KEY);

  if (!value) {
    setSyncEnabled(false);
    return false;
  }

  return value === "TRUE";
}

export async function setSyncEnabled(enabled: boolean) {
  const enabledString = enabled ? "TRUE" : "FALSE";
  await AsyncStorage.setItem(SYNC_KEY, enabledString);
}
