import { useQuery } from "@powersync/react-native";

import { useAuth } from "@/providers/AuthProvider";

import { buildGetManyMealsQuery } from "./queries";
import { Meal } from "./schema";

export function useGetMeal(mealId: string) {
  const { user } = useAuth();
  return useQuery<Meal>(buildGetManyMealsQuery({ mealId }), [user?.id]);
}
