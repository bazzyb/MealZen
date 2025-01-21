import { AbstractPowerSyncDatabase } from "@powersync/react-native";

import { buildSchema, syncLocalChangesToSyncedTable } from "@/db";
import { supabase } from "@/supabase";

import { Logger } from "./logger";

export async function handleEnableSync(userId: string, isPremium: boolean, powerSync: AbstractPowerSyncDatabase) {
  if (isPremium) {
    // Update schema to use synced tables
    await powerSync.updateSchema(buildSchema(true));

    // Copy local data to synced tables
    await syncLocalChangesToSyncedTable(powerSync, userId);

    // Finish by having powerSync connect to supabase
    await powerSync.connect(supabase);
    Logger.log("connected");

    await waitForNewSync(powerSync);
  }
}

export async function handleDisableSync(isPremium: boolean, powerSync: AbstractPowerSyncDatabase) {
  if (powerSync.connected) {
    // Disconnect from supabase, and switch to local schema

    if (isPremium) {
      await powerSync.disconnectAndClear();
    } else if (powerSync.connected) {
      await powerSync.disconnect();
    }

    await powerSync.updateSchema(buildSchema(false));
    Logger.log("disconnected");
  }
}

export async function waitForNewSync(powerSync: AbstractPowerSyncDatabase) {
  const now = new Date();
  const timeLimit = new Date(now.getTime() + 1000 * 4); // 30 seconds

  while (
    timeLimit > new Date() &&
    (!powerSync.currentStatus.lastSyncedAt || powerSync.currentStatus.lastSyncedAt < now)
  ) {
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}
