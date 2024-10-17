import { MEAL_TABLE, MealRecord } from "../schemas/meal";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

const updateQuery = `
  UPDATE ${MEAL_TABLE}
  SET 
    name = ?,
    recipe_url = ?,
    book_id = ?,
    page = ?,
    is_simple = ?,
    is_overnight = ?,
    is_long_cook = ?,
    is_long_prep = ?
  WHERE id = ? AND user_id = ?
  RETURNING *
`;

const updateMeal = async (meal: Omit<MealRecord, "user_id">, db: AbstractPowerSyncDatabase, userId?: string) => {
  const res = await db.execute(updateQuery, [
    meal.name,
    meal.recipe_url,
    meal.book_id,
    meal.page,
    meal.is_simple,
    meal.is_overnight,
    meal.is_long_cook,
    meal.is_long_prep,
    meal.id,
    userId || LOCAL_USER_ID,
  ]);

  const resultRecord = res.rows?.item(0);
  if (!resultRecord) {
    throw new Error("Could not update meal");
  }
  return resultRecord;
};

export function useUpdateMeal() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(meal: Omit<MealRecord, "user_id">) {
    setIsMutating(true);
    try {
      const result = await updateMeal(meal, db, user?.id);
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
