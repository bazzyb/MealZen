import { ReactNode, createContext, useContext, useEffect, useMemo } from "react";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";

import { REVENUE_CAT_API_KEY } from "@/consts";

type SubsContextType = {
  //
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
  useEffect(() => {
    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: REVENUE_CAT_API_KEY });
      // Can add userId later with Purchases.logIn("<userId>"). Not needed, but gives better insights in RevenueCat dashboard
      // If using `logIn`, Purchases.logOut(); shouldn't be called at anytime, as it will generate anonymous user id.
      // Just call Purchases.logIn("<userId>") to switch user.
    }
  }, []);

  const value = useMemo(
    () => ({
      //
    }),
    [],
  );

  // if (true) {
  // return <LoadingSplash />;
  // }

  return <SubsContext.Provider value={{ ...value }}>{children}</SubsContext.Provider>;
}
