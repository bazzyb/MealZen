// import { supabase } from "..";
// import { BOOK_TABLE, bookTableLocalToSyncStatement } from "../schemas/book";
// import { buildSchema } from "../schemas/buildSchema";
// import { MEAL_TABLE, mealTableLocalToSyncStatement } from "../schemas/meal";
// import { MEALPLAN_TABLE, mealplanTableLocalToSyncStatement } from "../schemas/mealplan";
import { AbstractPowerSyncDatabase } from "@powersync/react-native";

import { setSyncEnabled } from "./utils";

export async function switchToSyncedSchema(db: AbstractPowerSyncDatabase) {
  // const userId = supabase.getUserId();
  // await db.updateSchema(buildSchema(true));
  await setSyncEnabled(true);

  // await db.writeTransaction(async tx => {
  //   // Copy local-only data to the sync-enabled views.
  //   // This records each operation in the upload queue.

  //   // Move data from local to sync tables.
  //   await tx.execute(bookTableLocalToSyncStatement, [userId]); // NO DEPENDENCIES
  //   await tx.execute(mealTableLocalToSyncStatement, [userId]); // DEPENDS ON BOOKS
  //   await tx.execute(mealplanTableLocalToSyncStatement, [userId]); // DEPENDS ON BOOKS AND MEALS

  //   // Delete the local-only data.
  //   await tx.execute(`DELETE FROM inactive_local_${MEALPLAN_TABLE}`); // DEPENDS ON BOOKS AND MEALS
  //   await tx.execute(`DELETE FROM inactive_local_${MEAL_TABLE}`); // DEPENDS ON BOOKS
  //   await tx.execute(`DELETE FROM inactive_local_${BOOK_TABLE}`); // NO DEPENDENCIES
  // });
  // await db.connect(supabase);
}

export async function switchToLocalSchema(db: AbstractPowerSyncDatabase) {
  // await db.disconnectAndClear();
  // await db.updateSchema(buildSchema(false));
  await setSyncEnabled(false);
}
