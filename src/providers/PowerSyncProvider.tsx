import "@azure/core-asynciterator-polyfill";
import { AbstractPowerSyncDatabase, PowerSyncContext, PowerSyncDatabase, SyncStatus } from "@powersync/react-native";
import { ReactNode, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { LoadingSplash } from "@/components/LoadingSplash";
import { buildSchema } from "@/db/schemas";
import { supabase } from "@/supabase";
import { parseError } from "@/utils/errors";
import { Logger } from "@/utils/logger";

import { useAuth } from "./AuthProvider";

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { isSyncEnabled } = useAuth();
  const [powerSync, setPowersync] = useState<AbstractPowerSyncDatabase | null>(null);
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [connector] = useState(supabase);

  const handleDBConnect = async (syncEnabled: boolean) => {
    const db = new PowerSyncDatabase({
      schema: buildSchema(syncEnabled),
      database: { dbFilename: "mealzen.db" },
    });

    try {
      await db.init();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "PowerSyncDatabase init error",
        text2: parseError(error),
      });
      Logger.error("PowerSyncDatabase init error", error);
    }

    try {
      if (syncEnabled) {
        await db.connect(connector);
        Logger.log("connected", db.connected);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `PowerSyncDatabase ${syncEnabled ? "connection" : "disconnect"} error`,
        text2: String(error),
      });
      Logger.error("PowerSyncDatabase connection error", error);
    }

    setStatus(db.currentStatus);
    setPowersync(db);
  };

  useEffect(() => {
    // connect/disconnect from supabase when sync is enabled/disabled
    handleDBConnect(isSyncEnabled);
  }, [isSyncEnabled]);

  useEffect(() => {
    if (powerSync) {
      // getting status directly from powerSync hook leads to stale data
      // so we listen to status changes and assign to state
      powerSync.registerListener({
        statusChanged: setStatus,
      });
    }
  }, [powerSync]);

  if (powerSync === null || status === null) {
    return <LoadingSplash />;
  }

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
