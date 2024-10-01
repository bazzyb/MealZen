import { supabase } from "..";
import { MEAL_TABLE, MealRecord } from "../schemas/meal";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { Logger } from "@/utils/logger";

const updateQuery = `
  UPDATE ${MEAL_TABLE}
  SET 
    name = ?,
    recipe_url = ?,
    book_id = ?,
    page = ?
  WHERE id = ? AND user_id = ?
  RETURNING *
`;

const updateMeal = async (meal: Omit<MealRecord, "user_id">, userId: string | null, db: AbstractPowerSyncDatabase) => {
  const res = await db.execute(updateQuery, [meal.name, meal.recipe_url, meal.book_id, meal.page, meal.id, userId]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not update meal");
  }
  return resultRecord;
};

export function useUpdateMeal() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();

  async function mutate(meal: Omit<MealRecord, "user_id">) {
    setIsMutating(true);
    const userId = await supabase.getUserId();
    try {
      const result = await updateMeal(meal, userId, db);
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
