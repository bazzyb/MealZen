import { MEAL_TABLE } from "../schemas/meal";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

const deleteMeal = async (mealIds: Array<string>, db: AbstractPowerSyncDatabase, userId?: string) => {
  await db.executeBatch(
    `DELETE FROM ${MEAL_TABLE}
    WHERE id = ? AND user_id = ?`,
    mealIds.map(mealId => [mealId, userId || LOCAL_USER_ID]),
  );
};

export function useDeleteMeals() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(mealIds: Array<string>) {
    setIsMutating(true);
    const result = await deleteMeal(mealIds, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
