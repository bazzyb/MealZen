import "@azure/core-asynciterator-polyfill";
import { PowerSyncContext, PowerSyncDatabase } from "@powersync/react-native";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { buildSchema } from "@/db";
import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

import { useAuth } from "./AuthProvider";

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { isSyncEnabled } = useAuth();
  const [connector] = useState(supabase);

  const powerSync = useMemo(() => {
    const db = new PowerSyncDatabase({
      schema: buildSchema(isSyncEnabled),
      database: { dbFilename: "mealzen.db" },
    });

    db.init();

    return db;
  }, []);

  useEffect(() => {
    // connect/disconnect from supabase when sync is enabled/disabled
    if (isSyncEnabled) {
      powerSync.connect(connector).then(() => {
        Logger.log("connected", powerSync.connected);
      });
    }

    return () => {
      if (powerSync.connected) {
        powerSync.disconnect();
      }
    };
  }, [powerSync, isSyncEnabled]);

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
