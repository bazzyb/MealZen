import { MenuItem } from "../components/MenuItem";
import { usePowerSync } from "@powersync/react-native";

import { Text, ViewColumn } from "@/components";
import { TEST_EMAIL, TEST_PASSWORD } from "@/consts";
import { buildSchema, syncLocalChangesToSyncedTable } from "@/db/schemas";
import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

import { buildTestUser } from "./utils/buildTestUser";

export function DevSettingsView() {
  const { user, signIn, signOut, toggleSync } = useAuth();
  const powerSync = usePowerSync();

  async function signInToTestUser() {
    // Sign in to supabase auth
    const { id } = await signIn(TEST_EMAIL, TEST_PASSWORD);

    // Update schema to use synced tables
    await powerSync.updateSchema(buildSchema(true));

    // Copy local data to synced tables
    await syncLocalChangesToSyncedTable(powerSync, id);

    // Turn on sync
    toggleSync();
  }

  async function signOutOfTestUser() {
    // Disconnect from supabase, and switch to local schema
    await powerSync.disconnectAndClear();
    await powerSync.updateSchema(buildSchema(false));
    Logger.log("disconnected");

    // Sign out of supabase auth
    await signOut();

    // Turn off sync
    toggleSync();
  }

  async function setupUser() {
    if (!user || user?.email !== TEST_EMAIL) {
      Logger.info("Log in to the test user before running this action");
      return;
    }

    await buildTestUser(powerSync, user.id);
  }

  if (!__DEV__) {
    return (
      <ViewColumn justifyContent="center" alignItems="center" height="100%">
        <Text style={{ fontSize: 48 }}>⚠️</Text>
        <Text style={{ width: 200, textAlign: "center" }}>Dev Settings are only available in development mode.</Text>
      </ViewColumn>
    );
  }

  return (
    <ViewColumn>
      <MenuItem onPress={user ? signOutOfTestUser : signInToTestUser} style={{ paddingVertical: 4 }}>
        <Text>Sign {user ? "out of" : "in to"} Test User</Text>
      </MenuItem>
      <MenuItem onPress={setupUser} style={{ paddingVertical: 4 }}>
        <Text>Reset Test User</Text>
      </MenuItem>
    </ViewColumn>
  );
}
