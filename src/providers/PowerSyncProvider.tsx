import "@azure/core-asynciterator-polyfill";
import { AbstractPowerSyncDatabase, PowerSyncContext, PowerSyncDatabase, SyncStatus } from "@powersync/react-native";
import { ReactNode, useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";

import { LoadingSplash } from "@/components/LoadingSplash";
import { buildSchema } from "@/db";
import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

import { useAuth } from "./AuthProvider";

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { isSyncEnabled } = useAuth();
  const [powerSync, setPowersync] = useState<AbstractPowerSyncDatabase | null>(null);
  const powerSyncRef = useRef<AbstractPowerSyncDatabase | null>(null);
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [connector] = useState(supabase);

  // Need to use this convoluted approach to avoid DB getting locked.
  async function buildDB() {
    let attempts = 0;
    let db: AbstractPowerSyncDatabase;

    while (attempts < 5) {
      try {
        db = new PowerSyncDatabase({
          schema: buildSchema(isSyncEnabled),
          database: { dbFilename: "mealzen.db" },
        });

        await db.init();
        return db;
      } catch (err) {
        // retry after 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      attempts += 1;
    }
  }

  const handleDBConnect = async (syncEnabled: boolean) => {
    // try to ensure previous connection is closed
    if (powerSyncRef.current) {
      await powerSyncRef.current.close();
    }

    const db = await buildDB();
    if (!db) {
      Toast.show({
        type: "error",
        text1: "PowerSyncDatabase init error",
        text2: "Database is locked. Please restart the app.",
      });
      throw new Error("PowerSyncDatabase init error. Database is locked.");
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
      powerSyncRef.current = powerSync;
      // getting status directly from powerSync hook leads to stale data
      // so we listen to status changes and assign to state
      powerSync.registerListener({
        statusChanged: setStatus,
      });
    }
  }, [powerSync]);

  useEffect(() => {
    return () => {
      // Ensure the database connection is closed when the app is closed or hot reloads
      if (powerSyncRef.current) {
        powerSyncRef.current.close();
      }
    };
  }, []);

  if (powerSync === null || status === null) {
    return <LoadingSplash />;
  }

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
