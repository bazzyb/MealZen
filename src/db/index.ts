import { AbstractPowerSyncDatabase, Schema, Table } from "@powersync/react-native";

import { INACTIVE_TABLE_PREFIX } from "@/consts";

import { bookTableLocalToSyncStatement } from "./book/queries";
import { BOOK_TABLE, bookSchema } from "./book/schema";
import { mealTableLocalToSyncStatement } from "./meal/queries";
import { MEAL_TABLE, mealSchema } from "./meal/schema";
import { MEALPLAN_TABLE, mealplanSchema } from "./mealplan/schema";

export function buildSchema(isSynced: boolean) {
  const getSyncedTableName = (table: string): string => {
    if (isSynced) {
      return table;
    } else {
      return `inactive_synced_${table}`;
    }
  };

  const getLocalTableName = (table: string): string => {
    if (isSynced) {
      return `${INACTIVE_TABLE_PREFIX}${table}`;
    } else {
      return table;
    }
  };

  const book = new Table(bookSchema, { indexes: {}, viewName: getSyncedTableName(BOOK_TABLE) });
  const local_book = new Table(bookSchema, {
    indexes: {},
    localOnly: true,
    viewName: getLocalTableName(BOOK_TABLE),
  });

  const meal = new Table(mealSchema, { indexes: {}, viewName: getSyncedTableName(MEAL_TABLE) });
  const local_meal = new Table(mealSchema, {
    indexes: {},
    localOnly: true,
    viewName: getLocalTableName(MEAL_TABLE),
  });

  const mealplan = new Table(mealplanSchema, { indexes: {}, viewName: getSyncedTableName(MEALPLAN_TABLE) });
  const local_mealplan = new Table(mealplanSchema, {
    indexes: {},
    localOnly: true,
    viewName: getLocalTableName(MEALPLAN_TABLE),
  });

  return new Schema({
    book,
    local_book,
    meal,
    local_meal,
    mealplan,
    local_mealplan,
  });
}

export async function syncLocalChangesToSyncedTable(db: AbstractPowerSyncDatabase, userId: string) {
  await db.writeTransaction(async tx => {
    // Copy local-only data to the sync-enabled views.
    // This records each operation in the upload queue.

    // Move data from local to sync tables.
    await tx.execute(bookTableLocalToSyncStatement, [userId]); // NO DEPENDENCIES
    await tx.execute(mealTableLocalToSyncStatement, [userId]); // DEPENDS ON BOOKS

    // TODO: ask user if they want to keep this one or the synced one
    // await tx.execute(mealplanTableLocalToSyncStatement, [userId]); // DEPENDS ON BOOKS AND MEALS

    // Delete the local-only data.
    await tx.execute(`DELETE FROM ${INACTIVE_TABLE_PREFIX}${MEALPLAN_TABLE}`); // DEPENDS ON BOOKS AND MEALS
    await tx.execute(`DELETE FROM ${INACTIVE_TABLE_PREFIX}${MEAL_TABLE}`); // DEPENDS ON BOOKS
    await tx.execute(`DELETE FROM ${INACTIVE_TABLE_PREFIX}${BOOK_TABLE}`); // NO DEPENDENCIES
  });
}
