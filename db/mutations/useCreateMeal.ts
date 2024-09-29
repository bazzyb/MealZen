import { supabase } from "..";
import { MEAL_TABLE } from "../schema";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

const createMeal = async (name: string, userId: string | null, db: AbstractPowerSyncDatabase) => {
  const res = await db.execute(`INSERT INTO ${MEAL_TABLE} (id, name, user_id) VALUES (uuid(), ?, ?) RETURNING *`, [
    name,
    userId,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not create list");
  }
  return resultRecord;
};

export function useCreateMeal() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();

  async function mutate(name: string) {
    setIsMutating(true);
    const userId = await supabase.getUserId();
    const result = await createMeal(name, userId, db);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
