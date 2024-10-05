import { MEAL_TABLE } from "../schemas/meal";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

const deleteMeal = async (mealId: string, db: AbstractPowerSyncDatabase, userId?: string) => {
  await db.execute(`DELETE FROM ${MEAL_TABLE} WHERE id = ? AND user_id = ?`, [mealId, userId || LOCAL_USER_ID]);

  // const resultRecord = res.rows?.item(0);
  // if (!resultRecord) {
  //   throw new Error("Could not create list");
  // }
  return mealId;
};

export function useDeleteMeal() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(mealId: string) {
    setIsMutating(true);
    const result = await deleteMeal(mealId, db, user?.id);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
