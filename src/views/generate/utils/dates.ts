import { AbstractPowerSyncDatabase } from "@powersync/react-native";
import dayjs from "dayjs";

import { getMealsWithoutJoin } from "@/db/meal/queries";
import { MealplanRecord } from "@/db/mealplan/schema";

export async function pickRandomMeals(
  db: AbstractPowerSyncDatabase,
  dates: Array<Date>,
  existingMealplanEntries: Array<MealplanRecord>,
) {
  let existingMealIds: Array<string> = [];
  let datesToUse = dates;

  if (existingMealplanEntries.length) {
    existingMealIds = existingMealplanEntries.map(meal => meal.meal_id || "").filter(Boolean);
    const existingDates = existingMealplanEntries.map(meal => dayjs(meal.date).toString());
    datesToUse = datesToUse.filter(date => {
      return !existingDates.includes(dayjs(date).toString());
    });
  }

  const meals = await getMealsWithoutJoin(db, existingMealIds);
  const randomMeals = meals.sort(() => Math.random() - 0.5).slice(0, datesToUse.length);

  return randomMeals.map((meal, idx) => ({
    mealId: meal.id,
    date: datesToUse[idx],
  }));
}
