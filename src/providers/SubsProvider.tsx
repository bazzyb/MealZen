import { isEmpty } from "lodash";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, { CustomerInfo, PurchasesOfferings } from "react-native-purchases";

import { LoadingSplash } from "@/components/LoadingSplash";
import { REVENUE_CAT_ANDROID_API_KEY } from "@/consts";

import { useAuth } from "./AuthProvider";

type SubsContextType = {
  isPremiumEnabled: boolean;
  customerInfo: CustomerInfo | null;
  offerings: PurchasesOfferings | null;
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
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);

  useEffect(() => {
    function refetchSubs() {
      Purchases.syncPurchases();
    }

    // Check subscription status every 5 minutes
    const refetchSubsInterval = setInterval(refetchSubs, 1000 * 60 * 5);
    return () => clearInterval(refetchSubsInterval);
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: REVENUE_CAT_ANDROID_API_KEY, appUserID: user?.id });
      isUserSubscribed().then(isSubscribed => setIsPremiumEnabled(isSubscribed));

      // can listen for changes trigged by app, but won't catch things like sub expiring
      Purchases.addCustomerInfoUpdateListener(info => {
        setIsPremiumEnabled(!isEmpty(info.entitlements.active));
        setCustomerInfo(info);
      });
    }
  }, []);

  useEffect(() => {
    Purchases.getOfferings().then(offerings => setOfferings(offerings));
    if (user) {
      Purchases.getCustomerInfo().then(info => setCustomerInfo(info));
    } else {
      setCustomerInfo(null);
    }
  }, [user]);

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
        customerInfo,
        offerings,
        isUserSubscribed,
        getSubscriptionPrice,
        getSubscriptionPriceAsString,
      }}
    >
      {children}
    </SubsContext.Provider>
  );
}
