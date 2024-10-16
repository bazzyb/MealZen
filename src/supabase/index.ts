import { AbstractPowerSyncDatabase, CrudEntry, PowerSyncBackendConnector, UpdateType } from "@powersync/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { LOCAL_USER_ID, POWERSYNC_URL, SUPABASE_ANON_KEY, SUPABASE_URL } from "@/consts";
import { Logger } from "@/utils/logger";

/// Postgres Response codes that we cannot recover from by retrying.
const FATAL_RESPONSE_CODES = [
  // Class 22 — Data Exception
  // Examples include data type mismatch.
  new RegExp("^22...$"),
  // Class 23 — Integrity Constraint Violation.
  // Examples include NOT NULL, FOREIGN KEY and UNIQUE violations.
  new RegExp("^23...$"),
  // INSUFFICIENT PRIVILEGE - typically a row-level security violation
  new RegExp("^42501$"),
];

export class SupabaseConnector implements PowerSyncBackendConnector {
  client: SupabaseClient;

  constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        storage: AsyncStorage,
        detectSessionInUrl: false,
        autoRefreshToken: true,
      },
    });
  }

  async fetchCredentials() {
    const {
      data: { session },
      error,
    } = await this.client.auth.getSession();

    if (error) {
      throw new Error(`Could not fetch Supabase credentials: ${error}`);
    }

    if (!session) {
      return null;
    }

    return {
      endpoint: POWERSYNC_URL,
      token: session.access_token ?? "",
      expiresAt: session.expires_at ? new Date(session.expires_at * 1000 + 10000000) : undefined,
      userID: session.user.id,
    };
  }

  async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
    const { data } = await this.client.auth.getUser();
    if (!data.user) return;

    const transaction = await database.getNextCrudTransaction();

    if (!transaction) {
      return;
    }

    let lastOp: CrudEntry | null = null;
    try {
      // Note: If transactional consistency is important, use database functions
      // or edge functions to process the entire transaction in a single call.
      for (const op of transaction.crud) {
        lastOp = op;
        const table = this.client.from(op.table);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let result: any = null;
        switch (op.op) {
          case UpdateType.PUT:
            // supabase rules require that the user_id matches the authenticated user
            // all local data will have a user_id of LOCAL_USER_ID,
            //    so this needs to be updated before writing to supabase.
            // eslint-disable-next-line no-case-declarations
            const record = { ...op.opData, id: op.id, user_id: data.user.id };
            result = await table.upsert(record).eq("user_id", LOCAL_USER_ID);
            break;
          case UpdateType.PATCH:
            result = await table.update(op.opData).eq("id", op.id);
            break;
          case UpdateType.DELETE:
            result = await table.delete().eq("id", op.id);
            break;
        }

        if (result.error) {
          Logger.error(result.error);
          result.error.message = `Could not ${op.op} data to Supabase error: ${JSON.stringify(result)}`;
          throw result.error;
        }
      }

      await transaction.complete();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (ex: any) {
      Logger.log(ex);
      if (typeof ex.code == "string" && FATAL_RESPONSE_CODES.some(regex => regex.test(ex.code))) {
        /**
         * Instead of blocking the queue with these errors,
         * discard the (rest of the) transaction.
         *
         * Note that these errors typically indicate a bug in the application.
         * If protecting against data loss is important, save the failing records
         * elsewhere instead of discarding, and/or notify the user.
         */
        Logger.error("Data upload error - discarding:", lastOp, ex);
        await transaction.complete();
      } else {
        // Error may be retryable - e.g. network error or temporary server error.
        // Throwing an error here causes this call to be retried after a delay.
        throw ex;
      }
    }
  }
}

export const supabase = new SupabaseConnector();
