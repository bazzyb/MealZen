import { BOOK_TABLE } from "../schemas/book";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

const deleteBook = async (bookId: string, db: AbstractPowerSyncDatabase, userId?: string) => {
  await db.execute(`DELETE FROM ${BOOK_TABLE} WHERE id = ? AND user_id = ?`, [bookId, userId || LOCAL_USER_ID]);

  // const resultRecord = res.rows?.item(0);
  // if (!resultRecord) {
  //   throw new Error("Could not create list");
  // }
  return bookId;
};

export function useDeleteBook() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(mealId: string) {
    setIsMutating(true);
    const result = await deleteBook(mealId, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
