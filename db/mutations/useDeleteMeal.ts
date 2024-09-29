import { supabase } from "..";
import { MEAL_TABLE } from "../schema";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

const deleteMeal = async (mealId: string, userId: string | null, db: AbstractPowerSyncDatabase) => {
  await db.execute(`DELETE FROM ${MEAL_TABLE} WHERE id = ? AND user_id = ?`, [mealId, userId]);

  // const resultRecord = res.rows?.item(0);
  // if (!resultRecord) {
  //   throw new Error("Could not create list");
  // }
  return mealId;
};

export function useDeleteMeal() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();

  async function mutate(mealId: string) {
    setIsMutating(true);
    const userId = await supabase.getUserId();
    const result = await deleteMeal(mealId, userId, db);
    setIsMutating(false);
    return result;
  }

  return {
    mutate,
    isMutating,
  };
}
