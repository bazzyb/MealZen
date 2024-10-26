import { Meal } from "../schemas/meal";
import { useQuery } from "@powersync/react-native";

import { buildMealQuery } from "./meals";

export function useGetMeal(mealId: string) {
  return useQuery<Meal>(buildMealQuery({ mealId }));
}
