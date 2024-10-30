import { AbstractPowerSyncDatabase } from "@powersync/react-native";

import { getMealsWithoutJoin } from "@/db/meal/queries";

export async function buildMealPlan(db: AbstractPowerSyncDatabase, dates: Array<Date>) {
  const meals = await getMealsWithoutJoin(db);
  const randomMeals = meals.sort(() => Math.random() - 0.5).slice(0, dates.length);

  return randomMeals.map((meal, idx) => ({
    mealId: meal.id,
    date: dates[idx],
  }));
}
