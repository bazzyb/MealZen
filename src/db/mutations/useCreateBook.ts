import { BOOK_TABLE } from "../schemas/book";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

const createBook = async (name: string, db: AbstractPowerSyncDatabase, userId?: string) => {
  const res = await db.execute(`INSERT INTO ${BOOK_TABLE} (id, name, user_id) VALUES (uuid(), ?, ?) RETURNING *`, [
    name,
    userId || LOCAL_USER_ID,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not create book");
  }
  return resultRecord;
};

export function useCreateBook() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(name: string) {
    setIsMutating(true);
    const result = await createBook(name, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
