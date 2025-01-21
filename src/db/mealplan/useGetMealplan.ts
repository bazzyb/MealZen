import { useQuery } from "@powersync/react-native";

import { LOCAL_USER_ID } from "@/consts";
import { useAuth } from "@/providers/AuthProvider";

import { MealplanQuery } from "./queries";
import { Mealplan } from "./schema";

export function useGetMealplan() {
  const { user } = useAuth();
  return useQuery<Mealplan>(MealplanQuery, [user?.id || LOCAL_USER_ID]);
}
