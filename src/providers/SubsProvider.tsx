import { isEmpty } from "lodash";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";

import { LoadingSplash } from "@/components/LoadingSplash";
import { REVENUE_CAT_API_KEY } from "@/consts";

import { useAuth } from "./AuthProvider";

type SubsContextType = {
  isPremiumEnabled: boolean;
  isUserSubscribed: () => Promise<boolean>;
  getSubscriptionPrice: () => Promise<number>;
  getSubscriptionPriceAsString: () => Promise<string>;
};

export const SubsContext = createContext<SubsContextType | null>(null);

export function useSubs() {
  const context = useContext(SubsContext);

  if (!context) {
    throw new Error("useSubs must be used within an SubsProvider");
  }

  return context;
}

export function SubsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [isPremiumEnabled, setIsPremiumEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: REVENUE_CAT_API_KEY, appUserID: user?.id });
      // isUserSubscribed().then(isSubscribed => setIsPremiumEnabled(isSubscribed));
      setIsPremiumEnabled(true);
    }
  }, []);

  // useEffect(() => {
  //   console.log({ isPremiumEnabled });
  // }, [isPremiumEnabled]);

  async function isUserSubscribed() {
    const customerInfo = await Purchases.getCustomerInfo();
    return !isEmpty(customerInfo.entitlements.active);
  }

  async function getSubscriptionPrice() {
    const offerings = await Purchases.getOfferings();
    const monthlySub = offerings.current?.availablePackages[0].product;
    return monthlySub!.price;
  }

  async function getSubscriptionPriceAsString() {
    const offerings = await Purchases.getOfferings();
    const monthlySub = offerings.current?.availablePackages[0].product;
    return monthlySub!.priceString;
  }

  if (isPremiumEnabled === null) {
    return <LoadingSplash />;
  }

  return (
    <SubsContext.Provider
      value={{
        isPremiumEnabled,
        isUserSubscribed,
        getSubscriptionPrice,
        getSubscriptionPriceAsString,
      }}
    >
      {children}
    </SubsContext.Provider>
  );
}
