import { MEAL_TABLE, MealRecord } from "../schemas/meal";
import { useQuery } from "@powersync/react-native";

const MealQuery = `
  SELECT * FROM ${MEAL_TABLE}
`;

export function useGetMeals() {
  return useQuery<MealRecord>(MealQuery, []);
}
