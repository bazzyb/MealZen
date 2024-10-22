import { AbstractPowerSyncDatabase } from "@powersync/react-native";
import { pad } from "lodash";

import { TEST_BOOKS, TEST_MEALS } from "@/utils/testing/fixtures";

export async function buildTestUser(db: AbstractPowerSyncDatabase, userId: string) {
  await db.writeTransaction(async tx => {
    await tx.execute(`DELETE FROM mealplan WHERE user_id = ?`, [userId]);
    await tx.execute(`DELETE FROM meal WHERE user_id = ?`, [userId]);
    await tx.execute(`DELETE FROM book WHERE user_id = ?`, [userId]);

    const bookIds = [];
    for (let i = 0; i < TEST_BOOKS.length; i++) {
      const bookId = "00000000-0000-0000-0000-000000000" + pad(String(i), 3, "0");
      bookIds.push(bookId);
      await tx.execute(`INSERT INTO book (id, user_id, name, author) VALUES (?, ?, ?, ?)`, [
        bookId,
        userId,
        TEST_BOOKS[i].name,
        TEST_BOOKS[i].author,
      ]);
    }

    for (let i = 0; i < TEST_MEALS.length; i++) {
      const mealId = "00000000-0000-0000-0000-000000000" + pad(String(i), 3, "0");
      const bookId = Math.random() < 0.5 ? bookIds[Math.floor(Math.random() * bookIds.length)] : null; // Randomly assign bookId to some meals
      await tx.execute(`INSERT INTO meal (id, user_id, name, book_id) VALUES (?, ?, ?, ?)`, [
        mealId,
        userId,
        TEST_MEALS[i],
        bookId,
      ]);
    }
  });
}
