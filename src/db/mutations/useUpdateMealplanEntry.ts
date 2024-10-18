import { MEALPLAN_TABLE, MealplanRecord } from "../schemas/mealplan";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

const updateQuery = `
  UPDATE ${MEALPLAN_TABLE}
  SET 
    meal_id = ?,
    notes = ?
  WHERE id = ? AND user_id = ?
  RETURNING *
`;

const updateMealplanEntry = async (
  mealplanEntry: Omit<MealplanRecord, "user_id">,
  db: AbstractPowerSyncDatabase,
  userId?: string,
) => {
  const res = await db.execute(updateQuery, [
    mealplanEntry.meal_id,
    mealplanEntry.notes,
    mealplanEntry.id,
    userId || LOCAL_USER_ID,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not update mealplan entry");
  }
  return resultRecord;
};

export function useUpdateMealplanEntry() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(mealplanEntry: Omit<MealplanRecord, "user_id">) {
    setIsMutating(true);
    try {
      const result = await updateMealplanEntry(mealplanEntry, db, user?.id);
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
