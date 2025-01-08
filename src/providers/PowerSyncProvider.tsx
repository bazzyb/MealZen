import "@azure/core-asynciterator-polyfill";
import { PowerSyncContext, PowerSyncDatabase } from "@powersync/react-native";
import { ReactNode, useEffect, useMemo } from "react";

import { buildSchema } from "@/db";
import { supabase } from "@/supabase";

// import { useSubs } from "./SubsProvider";
import { useAuth } from "./AuthProvider";

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  // const { isPremiumEnabled } = useSubs();
  const { user } = useAuth();

  const powerSync = useMemo(() => {
    const syncEnabled = !!user?.id;

    const db = new PowerSyncDatabase({
      schema: buildSchema(syncEnabled),
      database: { dbFilename: "mealzen.db" },
    });

    db.init();

    if (syncEnabled) {
      db.connect(supabase);
    }

    return db;
  }, []);

  useEffect(() => {
    return () => {
      if (powerSync.connected) {
        powerSync.disconnect();
      }
    };
  }, []);

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
