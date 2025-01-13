import React from "react";
import RevenueCatUI from "react-native-purchases-ui";

import { useAppTheme } from "@/styles/useAppTheme";

import { ViewRow } from "./Layout/ViewRow";

export function Paywall() {
  const { fontFamily } = useAppTheme();

  return (
    <ViewRow>
      <RevenueCatUI.PaywallFooterContainerView
        options={{
          fontFamily,
        }}
      />
    </ViewRow>
  );
}
