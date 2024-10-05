import { supabase } from "..";
import { BOOK_TABLE } from "../schemas/book";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

const deleteBook = async (bookId: string, userId: string | null, db: AbstractPowerSyncDatabase) => {
  await db.execute(`DELETE FROM ${BOOK_TABLE} WHERE id = ? AND user_id = ?`, [bookId, userId]);

  // const resultRecord = res.rows?.item(0);
  // if (!resultRecord) {
  //   throw new Error("Could not create list");
  // }
  return bookId;
};

export function useDeleteBook() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();

  async function mutate(mealId: string) {
    setIsMutating(true);
    const userId = await supabase.getUserId();
    const result = await deleteBook(mealId, userId, db);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
