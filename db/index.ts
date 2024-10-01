import { SupabaseConnector } from "../supabase";
import "@azure/core-asynciterator-polyfill";
import { PowerSyncDatabase } from "@powersync/react-native";

import { Logger } from "@/utils/logger";

import { appSchema } from "./schemas";

export const supabase = new SupabaseConnector();
export const db = new PowerSyncDatabase({
  schema: appSchema,
  database: {
    dbFilename: "sqlite.db",
  },
});

export async function init() {
  try {
    await db.init();
    await db.connect(supabase);
  } catch (err) {
    Logger.error("Failed to initialize database", err);
  }
}
