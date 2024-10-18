import { Mealplan } from "../queries/useGetMealplan";
import { AbstractPowerSyncDatabase, usePowerSync } from "@powersync/react-native";
import { useState } from "react";

import { Logger } from "@/utils/logger";

const reorderMealplan = async (meals: Array<Mealplan>, db: AbstractPowerSyncDatabase) => {
  const cases = meals
    .map(
      meal => `
      WHEN id = '${meal.id}' THEN '${meal.date}'
    `,
    )
    .join(" ");

  const ids = meals.map(meal => `'${meal.id}'`).join(", ");

  const query = `
    UPDATE mealplan
    SET date = CASE ${cases} END
    WHERE id IN (${ids});
  `;

  await db.execute(query);
};

export function useReorderMealplan() {
  const [isMutating, setIsMutating] = useState(false);

  const db = usePowerSync();

  async function mutate(meals: Array<Mealplan>) {
    setIsMutating(true);
    try {
      const result = await reorderMealplan(meals, db);
      return result;
    } catch (error) {
      Logger.error("useReorderMealplan", error);
    }
    setIsMutating(false);
  }

  return {
    mutate,
    isMutating,
  };
}
