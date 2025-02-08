import { Linking } from "react-native";
import RevenueCatUI from "react-native-purchases-ui";

import { MenuItem } from "@/components/MenuItem";
import { Text } from "@/components/core/Text";
import { useSubs } from "@/providers/SubsProvider";

export function SubInfo() {
  const { isPremiumEnabled, customerInfo } = useSubs();

  async function showPaywall() {
    await RevenueCatUI.presentPaywall();
  }

  return (
    <>
      {!isPremiumEnabled && (
        <MenuItem onPress={showPaywall}>
          <Text>Subscribe</Text>
        </MenuItem>
      )}
      {isPremiumEnabled && !!customerInfo?.managementURL && (
        <MenuItem role="link" onPress={() => Linking.openURL(customerInfo.managementURL!)}>
          <Text>Manage Subscription</Text>
        </MenuItem>
      )}
    </>
  );
}
