import { Mealplan } from "@/db/mealplan/schema";

export function reorderMealPlan(meals: Array<Mealplan>): Array<Mealplan> {
  const sortedMealplanDates = meals.map(meal => meal.date).sort();

  return meals.map((meal, idx) => ({
    ...meal,
    date: sortedMealplanDates[idx],
  }));
}
