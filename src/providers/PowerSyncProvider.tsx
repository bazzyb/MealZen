import "@azure/core-asynciterator-polyfill";
import { PowerSyncContext, PowerSyncDatabase } from "@powersync/react-native";
import { ReactNode, useMemo } from "react";

import { buildSchema } from "@/db/schemas/buildSchema";
import { supabase } from "@/supabase";
import { Logger } from "@/utils/logger";

import { useAuth } from "./AuthProvider";

export const PowerSyncProvider = ({ children }: { children: ReactNode }) => {
  const { isSyncEnabled } = useAuth();

  const powerSync = useMemo(() => {
    const db = new PowerSyncDatabase({
      schema: buildSchema(isSyncEnabled),
      database: { dbFilename: "sqlite.db" },
    });

    db.init().then(() => {
      if (isSyncEnabled) {
        db.connect(supabase)
          .then(() => Logger.log("connected", db.connected))
          .catch(Logger.error);
      } else {
        db.disconnect()
          .then(() => Logger.log("not connected", db.connected))
          .catch(Logger.error);
      }
    });

    return db;
  }, [isSyncEnabled]);

  return <PowerSyncContext.Provider value={powerSync}>{children}</PowerSyncContext.Provider>;
};
