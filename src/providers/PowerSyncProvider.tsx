import "@azure/core-asynciterator-polyfill";
import { PowerSyncContext, PowerSyncDatabase, SyncStatus } from "@powersync/react-native";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { Text } from "@/components";
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

    db.init();
    return db;
  }, []);

  const handleDBConnect = useCallback(async () => {
    if (isSyncEnabled) {
      await powerSync.connect(supabase);
      Logger.log("connected", powerSync.connected);
    } else {
      await powerSync.disconnect();
      Logger.log("not connected", powerSync.connected);
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

  if (status === null) {
    return <Text>Connecting...</Text>;
  }

  if (status.connected && !status.hasSynced) {
    return <Text>Syncing...</Text>;
  }

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
