import { deleteManyMeals, getMealIdsForBookId } from "../meal/queries";
import { AbstractPowerSyncDatabase } from "@powersync/react-native";

import { LOCAL_USER_ID } from "@/consts";

import { BOOK_TABLE, BookRecord } from "./schema";

// Overwrites the local-only owner_id value with the logged-in user's id.
export const bookTableLocalToSyncStatement = `
  INSERT INTO ${BOOK_TABLE} (id, user_id, name, author)
  SELECT id, ?, name, author
  FROM inactive_local_${BOOK_TABLE}
`;

export const getBookStatement = `
  SELECT * FROM ${BOOK_TABLE}
  WHERE id = ?
`;

export const getManyBooksStatement = `
  SELECT * FROM ${BOOK_TABLE}
  WHERE name LIKE '%' || ? || '%'
  ORDER BY LOWER(name) ASC
`;

export async function createBook(name: string, db: AbstractPowerSyncDatabase, userId?: string) {
  const res = await db.execute(`INSERT INTO ${BOOK_TABLE} (id, name, user_id) VALUES (uuid(), ?, ?) RETURNING *`, [
    name,
    userId || LOCAL_USER_ID,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not create book");
  }
  return resultRecord;
}

export async function updateBook(book: Omit<BookRecord, "user_id">, db: AbstractPowerSyncDatabase, userId?: string) {
  const updateQuery = `
    UPDATE ${BOOK_TABLE}
    SET 
      name = ?,
      author = ?
    WHERE id = ? AND user_id = ?
    RETURNING *
  `;

  const res = await db.execute(updateQuery, [book.name, book.author || null, book.id, userId || LOCAL_USER_ID]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not update book");
  }
  return resultRecord;
}

export async function deleteBooks(bookIds: Array<string>, db: AbstractPowerSyncDatabase, userId?: string) {
  const mealIdList: Array<string> = [];
  for (const bookId of bookIds) {
    const mealIds = await getMealIdsForBookId(bookId, db, userId);
    mealIdList.push(...mealIds);
  }

  if (mealIdList.length > 0) {
    await deleteManyMeals(mealIdList, db, userId);
  }

  await db.executeBatch(
    `DELETE FROM ${BOOK_TABLE} WHERE id = ? AND user_id = ?`,
    bookIds.map(id => [id, userId || LOCAL_USER_ID]),
  );
}
