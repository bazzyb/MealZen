// ########################################################
// ########################################################
// ########################################################

// Need to be able to switch between syned and local-only schemas.

/*
 * !!!!! Find out what happens when you attach a schema to an existing table with data. !!!!!!
 * Have localstorage key that stores whether sync is enabled. (linked to user, and whether they have membership)
 * * Should user be forced to have account to use app?
 * * If account optional, still allow them to have free account, but either without sync, or limited sync
 * * if account optional, need to update user id in local-only data when they sign up
 * Update schemas to declare whether they are local-only or synced. ({ localOnly: true })
 * When switching to synced schema, copy local-only data to synced views.
 * Example seems to suggest you need local and synced versions of each table that you switch between. Why?
 * * https://github.com/powersync-ja/powersync-js/tree/631d66a5bc5a8c447c06c5a4017e0b597b9a3156/demos/react-supabase-todolist-optional-sync
 */

// ########################################################
// ########################################################
// ########################################################

// export async function switchToSyncedSchema(db: AbstractPowerSyncDatabase, userId: string) {
//   await db.updateSchema(makeSchema(true));

//   // Copy local-only data to the sync-enabled views.

//   await db.writeTransaction(async tx => {
//     // Copy local-only data to the sync-enabled views.
//     // This records each operation in the upload queue.
//     // Overwrites the local-only owner_id value with the logged-in user's id.
//     await tx.execute(
//       "INSERT INTO lists(id, name, created_at, owner_id) SELECT id, name, created_at, ? FROM inactive_local_lists",
//       [userId],
//     );

//     // Overwrites the local-only created_by value with the logged-in user's id.
//     await tx.execute(
//       "INSERT INTO todos(id, list_id, created_at, completed_at, description, completed, created_by) SELECT id, list_id, created_at, completed_at, description, completed, ? FROM inactive_local_todos",
//       [userId],
//     );

//     // Delete the local-only data.
//     await tx.execute("DELETE FROM inactive_local_todos");
//     await tx.execute("DELETE FROM inactive_local_lists");
//   });
// }
