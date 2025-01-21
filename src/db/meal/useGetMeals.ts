import { useQuery } from "@powersync/react-native";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

import { MealTableFilters, buildGetManyMealsQuery } from "./queries";
import { Meal } from "./schema";

export function useGetMeals(filters?: MealTableFilters) {
  const { user } = useAuth();
  return useQuery<Meal>(buildGetManyMealsQuery(filters || {}), [
    user?.id || LOCAL_USER_ID,
    filters?.find?.toLowerCase(),
  ]);
}
