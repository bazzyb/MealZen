import { BOOK_TABLE, BookRecord } from "../schemas/book";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

const updateQuery = `
  UPDATE ${BOOK_TABLE}
  SET 
    name = ?,
    author = ?
  WHERE id = ? AND user_id = ?
  RETURNING *
`;

const updateBook = async (book: Omit<BookRecord, "user_id">, db: AbstractPowerSyncDatabase, userId?: string) => {
  const res = await db.execute(updateQuery, [book.name, book.author, book.id, userId || LOCAL_USER_ID]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not update book");
  }
  return resultRecord;
};

export function useUpdateBook() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(book: Omit<BookRecord, "user_id">) {
    setIsMutating(true);
    try {
      const result = await updateBook(book, db, user?.id);
      setIsMutating(false);
      return result;
    } catch (err) {
      setIsMutating(false);
      Logger.error(err);
    }
  }

  return {
    mutate,
    isMutating,
  };
}
