import { MEAL_TABLE, MealRecord } from "../schemas/meal";
import { useQuery } from "@powersync/react-native";

const MealQuery = `
  SELECT * FROM ${MEAL_TABLE}
  WHERE id = ?
`;

export function useGetMeal(mealId: string) {
  return useQuery<MealRecord>(MealQuery, [mealId]);
}
