import { supabase } from "..";
import { BOOK_TABLE, BookRecord } from "../schemas/book";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { Logger } from "@/utils/logger";

const updateQuery = `
  UPDATE ${BOOK_TABLE}
  SET 
    name = ?,
    author = ?
  WHERE id = ? AND user_id = ?
  RETURNING *
`;

const updateBook = async (book: Omit<BookRecord, "user_id">, userId: string | null, db: AbstractPowerSyncDatabase) => {
  const res = await db.execute(updateQuery, [book.name, book.author, book.id, userId]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not update book");
  }
  return resultRecord;
};

export function useUpdateBook() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();

  async function mutate(book: Omit<BookRecord, "user_id">) {
    setIsMutating(true);
    const userId = await supabase.getUserId();
    try {
      const result = await updateBook(book, userId, db);
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
