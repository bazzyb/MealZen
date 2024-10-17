import { MEALPLAN_TABLE } from "../schemas/mealplan";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";
import { Logger } from "@/utils/logger";

type MealplanArray = {
  mealId: string;
  date: Date;
}[];

const createMealplan = async (meals: MealplanArray, db: AbstractPowerSyncDatabase, userId?: string) => {
  await db.execute(`DELETE FROM ${MEALPLAN_TABLE} WHERE user_id = ?`, [userId || LOCAL_USER_ID]);
  await db.executeBatch(
    `INSERT INTO ${MEALPLAN_TABLE} 
    (id, user_id, meal_id, date)
    VALUES (uuid(), ?, ?, ?)
    RETURNING *`,
    meals.map(meal => [userId || LOCAL_USER_ID, meal.mealId, meal.date.toISOString()]),
  );

  // const resultRecord = res.rows?.item(0);
  // if (!resultRecord) {
  //   throw new Error("Could not create mealplan");
  // }
  // return resultRecord;
};

export function useCreateMealplan() {
  const [isMutating, setIsMutating] = useState(false);
  const { user } = useAuth();

  const db = usePowerSync();

  async function mutate(meals: MealplanArray) {
    setIsMutating(true);
    try {
      const result = await createMealplan(meals, db, user?.id);
      return result;
    } catch (error) {
      Logger.error("useCreateMealplan", error);
    }
    setIsMutating(false);
  }

  return {
    mutate,
    isMutating,
  };
}
