import { AbstractPowerSyncDatabase, Schema, Table } from "@powersync/react-native";

import { INACTIVE_LOCAL_TABLE_PREFIX, INACTIVE_SYNCED_TABLE_PREFIX } from "@/consts";

import { bookTableLocalToSyncStatement, bookTableSyncToLocalStatement } from "./book/queries";
import { BOOK_TABLE, bookSchema } from "./book/schema";
import { mealTableLocalToSyncStatement, mealTableSyncToLocalStatement } from "./meal/queries";
import { MEAL_TABLE, mealSchema } from "./meal/schema";
import { mealplanTableSyncToLocalStatement } from "./mealplan/queries";
import { MEALPLAN_TABLE, mealplanSchema } from "./mealplan/schema";

export function buildSchema(isSynced: boolean) {
  const getSyncedTableName = (table: string): string => {
    if (isSynced) {
      return table;
    } else {
      return `${INACTIVE_SYNCED_TABLE_PREFIX}${table}`;
    }
  };

  const getLocalTableName = (table: string): string => {
    if (isSynced) {
      return `${INACTIVE_LOCAL_TABLE_PREFIX}${table}`;
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

export async function copyLocalChangesToSyncedTable(db: AbstractPowerSyncDatabase, userId: string) {
  await db.writeTransaction(async tx => {
    // Copy local-only data to the sync-enabled views.
    // This records each operation in the upload queue.

    // Move data from local to sync tables.
    await tx.execute(bookTableLocalToSyncStatement, [userId]); // NO DEPENDENCIES
    await tx.execute(mealTableLocalToSyncStatement, [userId]); // DEPENDS ON BOOKS

    // TODO: ask user if they want to keep this one or the synced one
    // await tx.execute(mealplanTableLocalToSyncStatement, [userId]); // DEPENDS ON BOOKS AND MEALS

    // Delete the local-only data.
    await tx.execute(`DELETE FROM ${INACTIVE_LOCAL_TABLE_PREFIX}${MEALPLAN_TABLE} WHERE user_id = ?`, [userId]); // DEPENDS ON BOOKS AND MEALS
    await tx.execute(`DELETE FROM ${INACTIVE_LOCAL_TABLE_PREFIX}${MEAL_TABLE} WHERE user_id = ?`, [userId]); // DEPENDS ON BOOKS
    await tx.execute(`DELETE FROM ${INACTIVE_LOCAL_TABLE_PREFIX}${BOOK_TABLE} WHERE user_id = ?`, [userId]); // NO DEPENDENCIES
  });
}

export async function copySyncedChangesToLocalTable(db: AbstractPowerSyncDatabase, userId: string) {
  await db.writeTransaction(async tx => {
    // Move data from local to sync tables.
    await tx.execute(bookTableSyncToLocalStatement, [userId]); // NO DEPENDENCIES
    await tx.execute(mealTableSyncToLocalStatement, [userId]); // DEPENDS ON BOOKS
    await tx.execute(mealplanTableSyncToLocalStatement, [userId]); // DEPENDS ON BOOKS AND MEALS

    // Delete the local-only data.
    await tx.execute(`DELETE FROM ${INACTIVE_SYNCED_TABLE_PREFIX}${MEALPLAN_TABLE} WHERE user_id = ?`, [userId]); // DEPENDS ON BOOKS AND MEALS
    await tx.execute(`DELETE FROM ${INACTIVE_SYNCED_TABLE_PREFIX}${MEAL_TABLE} WHERE user_id = ?`, [userId]); // DEPENDS ON BOOKS
    await tx.execute(`DELETE FROM ${INACTIVE_SYNCED_TABLE_PREFIX}${BOOK_TABLE} WHERE user_id = ?`, [userId]); // NO DEPENDENCIES
  });
}
