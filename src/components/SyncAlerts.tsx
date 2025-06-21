import { useStatus } from "@powersync/react-native";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export function SyncAlerts() {
  const status = useStatus();

  useEffect(() => {
    if (status.dataFlowStatus.uploadError || status.dataFlowStatus.downloadError) {
      Toast.show({
        type: "error",
        text1: "Sync Error",
        text2: status.dataFlowStatus.uploadError?.message || status.dataFlowStatus.downloadError?.message || "",
        visibilityTime: 5000,
      });
    }
  }, [status.dataFlowStatus]);

  return null;
}
