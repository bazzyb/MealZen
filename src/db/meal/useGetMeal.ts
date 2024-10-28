import { useQuery } from "@powersync/react-native";

import { buildGetManyMealsQuery } from "./queries";
import { Meal } from "./schema";

export function useGetMeal(mealId: string) {
  return useQuery<Meal>(buildGetManyMealsQuery({ mealId }));
}
