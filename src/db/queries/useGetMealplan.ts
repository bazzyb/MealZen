import { MEALPLAN_TABLE } from "../schemas/mealplan";
import { useQuery } from "@powersync/react-native";

export type Mealplan = {
  id: string;
  date: string;
  book?: string;
  meal: string;
  notes?: string;
};

export const MealplanQuery = `
  SELECT
    mealplan.*,
    meal.name AS meal,
    book.name AS book
  FROM ${MEALPLAN_TABLE}
  LEFT JOIN meal ON meal.id = mealplan.meal_id
  LEFT JOIN book ON book.id = meal.book_id
  ORDER BY date ASC
`;

export function useGetMealplan() {
  return useQuery<Mealplan>(MealplanQuery, []);
}
