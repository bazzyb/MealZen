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
      setUserInfo();
    }

    // Check subscription status every 5 minutes
    const refetchSubsInterval = setInterval(refetchSubs, 1000 * 5);
    return () => clearInterval(refetchSubsInterval);
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: REVENUE_CAT_ANDROID_API_KEY, appUserID: user?.id });
      setUserInfo();

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
      setUserInfo();
    } else {
      setIsPremiumEnabled(false);
      setCustomerInfo(null);
    }
  }, [user]);

  function setUserInfo() {
    Purchases.getCustomerInfo().then(info => {
      setIsPremiumEnabled(!isEmpty(info.entitlements.active));
      setCustomerInfo(info);
    });
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
        getSubscriptionPrice,
        getSubscriptionPriceAsString,
      }}
    >
      {children}
    </SubsContext.Provider>
  );
}
