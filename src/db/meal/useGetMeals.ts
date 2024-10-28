import { useQuery } from "@powersync/react-native";

import { MealTableFilters, buildGetManyMealsQuery } from "./queries";
import { Meal } from "./schema";

export function useGetMeals(filters?: MealTableFilters) {
  return useQuery<Meal>(buildGetManyMealsQuery(filters || {}), [filters?.find?.toLowerCase()]);
}
