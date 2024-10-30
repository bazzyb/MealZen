import dayjs from "dayjs";

import { Mealplan } from "@/db/mealplan/schema";

export function reorderMealPlan(meals: Array<Mealplan>): Array<Mealplan> {
  const startDate = dayjs(meals.map(meal => meal.date).sort()[0]);

  return meals.map((meal, idx) => ({
    ...meal,
    date: startDate.add(idx, "days").toISOString(),
  }));
}
