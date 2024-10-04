import { SupabaseConnector } from "../supabase";
import "@azure/core-asynciterator-polyfill";
import { PowerSyncDatabase } from "@powersync/react-native";

import { TEST_EMAIL, TEST_PASSWORD } from "@/config";
import { Logger } from "@/utils/logger";

import { buildSchema } from "./schemas/buildSchema";
import { getSyncEnabled } from "./sync/utils";

export let supabase: SupabaseConnector;
export let db: PowerSyncDatabase;

export async function init() {
  try {
    const syncEnabled = await getSyncEnabled();

    db = new PowerSyncDatabase({
      schema: buildSchema(syncEnabled),
      database: {
        dbFilename: "sqlite.db",
      },
    });
    await db.init();

    supabase = new SupabaseConnector();

    if (syncEnabled) {
      // connect enables syncing between local sqlite db and remote supabase db
      await db.connect(supabase);
    }

    await supabase.login(TEST_EMAIL, TEST_PASSWORD);
  } catch (err) {
    Logger.error("Failed to initialize database", err);
  }
}
