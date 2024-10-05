import { MEAL_TABLE } from "../schemas/meal";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

const createMeal = async (name: string, db: AbstractPowerSyncDatabase, userId?: string) => {
  const res = await db.execute(`INSERT INTO ${MEAL_TABLE} (id, name, user_id) VALUES (uuid(), ?, ?) RETURNING *`, [
    name,
    userId || LOCAL_USER_ID,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not create meal");
  }
  return resultRecord;
};

export function useCreateMeal() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(name: string) {
    setIsMutating(true);
    const result = await createMeal(name, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
