import { usePowerSync, useStatus } from "@powersync/react-native";
import { useState } from "react";

import { ViewColumn } from "@/components/Layout/ViewColumn";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { MenuItem } from "@/components/MenuItem";
import { Text } from "@/components/core/Text";
import { TEST_EMAIL, TEST_FREE_EMAIL, TEST_PASSWORD } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";
import { useSubs } from "@/providers/SubsProvider";
import { useAppTheme } from "@/styles/useAppTheme";
import { Logger } from "@/utils/logger";
import { handleDisableSync, waitForNewSync } from "@/utils/sync";

import { buildTestUser } from "./utils/buildTestUser";

export function DevSettingsView() {
  const { user, signIn, signOut } = useAuth();
  const { isPremiumEnabled } = useSubs();
  const powerSync = usePowerSync();
  const psStatus = useStatus();
  const { colors } = useAppTheme();

  const [isUpdating, setIsUpdating] = useState(false);

  const isTestUser = [TEST_FREE_EMAIL, TEST_EMAIL].includes(user?.email || "");

  async function signInToFreeTestUser() {
    setIsUpdating(true);
    await signIn(TEST_FREE_EMAIL, TEST_PASSWORD);
    setIsUpdating(false);
  }

  async function signInToTestUser() {
    setIsUpdating(true);
    await signIn(TEST_EMAIL, TEST_PASSWORD);
    await waitForNewSync(powerSync);
    setIsUpdating(false);
  }

  async function signOutOfUser() {
    setIsUpdating(true);

    await handleDisableSync(powerSync);

    // Sign out of supabase auth
    await signOut();

    setIsUpdating(false);
  }

  async function setupUser() {
    setIsUpdating(true);

    if (!user || !isTestUser) {
      Logger.info("Log in to the test user before running this action");
      return;
    }

    await buildTestUser(powerSync, user.id, user.email);

    setIsUpdating(false);
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
      {isUpdating && <LoadingOverlay />}
      <MenuItem>
        <Text>User ID: {user?.id}</Text>
        <Text>Email: {user?.email}</Text>
        <Text>Premium enabled: {String(isPremiumEnabled)}</Text>
        <Text>Is connected: {String(powerSync.connected)}</Text>
      </MenuItem>
      {!user && (
        <>
          <MenuItem disabled={isUpdating} pv={4} onPress={signInToFreeTestUser}>
            <Text>Sign in to Free Test User</Text>
          </MenuItem>
          <MenuItem disabled={isUpdating} pv={4} onPress={signInToTestUser}>
            <Text>Sign in to Test User</Text>
          </MenuItem>
        </>
      )}
      {user && (
        <MenuItem disabled={isUpdating} pv={4} onPress={signOutOfUser}>
          <Text>Sign Out</Text>
        </MenuItem>
      )}
      {isTestUser && (
        <MenuItem disabled={isUpdating} pv={4} onPress={setupUser}>
          <Text>Reset Test User</Text>
        </MenuItem>
      )}
      {isTestUser && (
        <Text style={{ padding: 8 }} color={colors.textSecondary}>
          Last synced at: {psStatus.lastSyncedAt?.toLocaleString()}
        </Text>
      )}
    </ViewColumn>
  );
}
