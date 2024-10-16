import { BOOK_TABLE, bookTableLocalToSyncStatement } from "../schemas/book";
import { buildSchema } from "../schemas/buildSchema";
import { MEAL_TABLE, mealTableLocalToSyncStatement } from "../schemas/meal";
import { MEALPLAN_TABLE, mealplanTableLocalToSyncStatement } from "../schemas/mealplan";
import { AbstractPowerSyncDatabase } from "@powersync/react-native";

export async function syncLocalChangesToSyncedTable(db: AbstractPowerSyncDatabase, userId: string) {
  await db.disconnect();
  await db.updateSchema(buildSchema(true));

  await db.writeTransaction(async tx => {
    // Copy local-only data to the sync-enabled views.
    // This records each operation in the upload queue.

    // Move data from local to sync tables.
    await tx.execute(bookTableLocalToSyncStatement, [userId]); // NO DEPENDENCIES
    await tx.execute(mealTableLocalToSyncStatement, [userId]); // DEPENDS ON BOOKS
    await tx.execute(mealplanTableLocalToSyncStatement, [userId]); // DEPENDS ON BOOKS AND MEALS

    // Delete the local-only data.
    await tx.execute(`DELETE FROM inactive_local_${MEALPLAN_TABLE}`); // DEPENDS ON BOOKS AND MEALS
    await tx.execute(`DELETE FROM inactive_local_${MEAL_TABLE}`); // DEPENDS ON BOOKS
    await tx.execute(`DELETE FROM inactive_local_${BOOK_TABLE}`); // NO DEPENDENCIES
  });
}