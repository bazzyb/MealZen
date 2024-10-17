import { AbstractPowerSyncDatabase } from "@powersync/react-native";
import dayjs from "dayjs";

import { getMeals } from "@/db/queries/useGetMeals";

type BuildParams = {
  generateFrom: Date;
  generateTo: Date;
};

export async function buildMealPlan(db: AbstractPowerSyncDatabase, params: BuildParams) {
  const { generateFrom, generateTo } = params;

  const numberOfDays = dayjs(generateTo).diff(generateFrom, "days") + 1;

  const meals = await getMeals(db);
  const randomMeals = meals.sort(() => Math.random() - 0.5).slice(0, numberOfDays);

  return randomMeals.map((meal, idx) => ({
    mealId: meal.id,
    date: dayjs(generateFrom).add(idx, "day").toDate(),
  }));
}

// export function reorderMealPlan(meals: Array<MealPlan>) {
//   const startDate = dayjs(meals.map((meal) => meal.date).sort()[0]);

//   return meals.map((meal, idx) => ({
//     ...meal,
//     date: startDate.add(idx, "days").toDate(),
//   }));
// }
