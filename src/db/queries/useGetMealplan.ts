import { MEALPLAN_TABLE, MealplanRecord } from "../schemas/mealplan";
import { useQuery } from "@powersync/react-native";

export type Mealplan = MealplanRecord & {
  book?: string;
  page?: number;
  meal: string;
  isSimple: boolean;
};

export const MealplanQuery = `
  SELECT
    mealplan.*,
    meal.name AS meal,
    meal.is_simple AS "isSimple",
    meal.page,
    book.name AS book
  FROM ${MEALPLAN_TABLE}
  LEFT JOIN meal ON meal.id = mealplan.meal_id
  LEFT JOIN book ON book.id = meal.book_id
  ORDER BY date ASC
`;

export function useGetMealplan() {
  return useQuery<Mealplan>(MealplanQuery, []);
}
