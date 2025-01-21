import "@azure/core-asynciterator-polyfill";
import { PowerSyncContext, PowerSyncDatabase } from "@powersync/react-native";
import { ReactNode, useEffect, useMemo } from "react";

import { buildSchema, copySyncedChangesToLocalTable } from "@/db";
import { handleDisableSync, handleEnableSync } from "@/utils/sync";

import { useAuth } from "./AuthProvider";
import { useSubs } from "./SubsProvider";

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { isPremiumEnabled } = useSubs();
  const { user } = useAuth();

  const powerSync = useMemo(() => {
    const db = new PowerSyncDatabase({
      schema: buildSchema(isPremiumEnabled),
      database: { dbFilename: "mealzen.db" },
    });

    db.init();

    return db;
  }, []);

  useEffect(() => {
    return () => {
      if (powerSync.connected) {
        powerSync.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (user && isPremiumEnabled) {
      handleEnableSync(user.id, powerSync);
    }

    if (user && !isPremiumEnabled) {
      // This is for is a premium user's subscription expires
      handleDisableSync(powerSync);
      copySyncedChangesToLocalTable(powerSync, user.id);
    }
  }, [user, isPremiumEnabled]);

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
