import { supabase } from "..";
import { BOOK_TABLE } from "../schemas/book";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

const createBook = async (name: string, userId: string | null, db: AbstractPowerSyncDatabase) => {
  const res = await db.execute(`INSERT INTO ${BOOK_TABLE} (id, name, user_id) VALUES (uuid(), ?, ?) RETURNING *`, [
    name,
    userId,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not create book");
  }
  return resultRecord;
};

export function useCreateBook() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();

  async function mutate(name: string) {
    setIsMutating(true);
    const userId = await supabase.getUserId();
    const result = await createBook(name, userId, db);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
