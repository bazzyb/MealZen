import { ReactNode, createContext, useContext, useEffect, useMemo } from "react";

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
    //
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
