import "@azure/core-asynciterator-polyfill";
import { PowerSyncContext, PowerSyncDatabase, SyncStatus } from "@powersync/react-native";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Toast from "react-native-toast-message";

import { LoadingSplash } from "@/components/LoadingSplash";
import { schema } from "@/db/schemas";
import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

import { useAuth } from "./AuthProvider";

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { isSyncEnabled } = useAuth();

  const [status, setStatus] = useState<SyncStatus | null>(null);

  // create a new instance of PowerSyncDatabase should only be created once.
  // examples of this setup in powerSync include the handleDBConnect logic in same useMemo
  // however, this leads to issues reconnecting if user logs out and back in in the same session.
  const powerSync = useMemo(() => {
    const db = new PowerSyncDatabase({
      schema,
      database: { dbFilename: "sqlite.db" },
    });

    db.init().catch(error => {
      Toast.show({
        type: "error",
        text1: "PowerSyncDatabase init error",
        text2: error.message,
      });
      Logger.error("PowerSyncDatabase init error", error);
    });

    return db;
  }, []);

  const handleDBConnect = useCallback(async () => {
    try {
      if (isSyncEnabled) {
        await powerSync.connect(supabase);
        Logger.log("connected", powerSync.connected);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `PowerSyncDatabase ${isSyncEnabled ? "connection" : "disconnect"} error`,
        text2: String(error),
      });
      Logger.error("PowerSyncDatabase connection error", error);
    }
  }, [powerSync, isSyncEnabled]);

  useEffect(() => {
    // connect/disconnect from supabase when sync is enabled/disabled
    if (powerSync) {
      handleDBConnect();
    }
  }, [powerSync, isSyncEnabled]);

  useEffect(() => {
    if (powerSync) {
      // getting status directly from powerSync hook leads to stale data
      // so we listen to status changes and assign to state
      powerSync.registerListener({
        statusChanged: setStatus,
      });
    }
  }, [powerSync]);

  if (status === null || (status.connected && !status.hasSynced)) {
    return <LoadingSplash />;
  }

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
